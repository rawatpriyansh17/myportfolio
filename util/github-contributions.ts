import { parseContributions, type Contribution } from "../lib/github-calendar.ts";
export { parseContributions, GITHUB_PROFILE } from "../lib/github-calendar.ts";
export type { Contribution } from "../lib/github-calendar.ts";

export function parseGitHubCalendar(html: string): Contribution[] {
  const attribute = (tag: string, name: string) =>
    new RegExp(`\\b${name}=["']([^"']*)["']`).exec(tag)?.[1];
  const counts = new Map<string, number>();
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
    const id = attribute(match[1], "for");
    const count = /^(No|[\d,]+) contributions? on\b/.exec(match[2].trim());
    if (id && count) counts.set(id, count[1] === "No" ? 0 : Number(count[1].replaceAll(",", "")));
  }
  const contributions = [];
  for (const match of html.matchAll(/<td\b[^>]*>/g)) {
    const date = attribute(match[0], "data-date");
    if (!date) continue;
    const id = attribute(match[0], "id");
    const level = attribute(match[0], "data-level");
    if (!id || level === undefined || !counts.has(id)) throw new Error("Incomplete GitHub calendar");
    contributions.push({ date, count: counts.get(id), level: Number(level) });
  }
  return parseContributions({ contributions });
}

export async function getContributions(): Promise<Contribution[] | null> {
  const sources = [
    { url: "https://github.com/users/rawatpriyansh17/contributions", parse: async (response: Response) => parseGitHubCalendar(await response.text()) },
    { url: "https://github-contributions-api.jogruber.de/v4/rawatpriyansh17?y=last", parse: async (response: Response) => parseContributions(await response.json()) },
  ];
  if (process.env.GITHUB_TOKEN) {
    try {
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({ query: `query { user(login: "rawatpriyansh17") { contributionsCollection { contributionCalendar { weeks { contributionDays { date contributionCount contributionLevel } } } } } }` }),
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(8000),
      });
      if (response.ok) return parseGraphQLCalendar(await response.json());
    } catch {
      // Public sources below remain available without an API credential.
    }
  }
  for (const source of sources) {
    try {
      const response = await fetch(source.url, {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(8000),
        headers: { "Accept-Language": "en-US" },
      });
      if (!response.ok) throw new Error(`GitHub contributions returned ${response.status}`);
      return await source.parse(response);
    } catch {
      // Try the independent fallback without fabricating activity.
    }
  }
  return null;
}

export function parseGraphQLCalendar(data: unknown): Contribution[] {
  const response = data as { errors?: unknown; data?: { user?: { contributionsCollection?: { contributionCalendar?: { weeks?: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[] } } } } };
  const weeks = response?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (response?.errors || !Array.isArray(weeks)) throw new Error("Invalid GitHub GraphQL calendar");
  const levels = ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"];
  return parseContributions({ contributions: weeks.flatMap(week => week.contributionDays.map(day => ({
    date: day.date, count: day.contributionCount, level: levels.indexOf(day.contributionLevel),
  }))) });
}
