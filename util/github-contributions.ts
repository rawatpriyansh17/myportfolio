export type Contribution = { date: string; count: number; level: number };

export const GITHUB_PROFILE = "https://github.com/rawatpriyansh17";

export function parseContributions(data: unknown): Contribution[] {
  if (!data || typeof data !== "object" || !("contributions" in data) || !Array.isArray(data.contributions)) {
    throw new Error("Invalid GitHub contribution response");
  }
  const days: Contribution[] = data.contributions.map((day: unknown) => {
    if (!day || typeof day !== "object" || !("date" in day) || !("count" in day) || !("level" in day)
      || typeof day.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(day.date)
      || !Number.isFinite(Date.parse(day.date))
      || new Date(day.date).toISOString().slice(0, 10) !== day.date
      || typeof day.count !== "number" || !Number.isInteger(day.count) || day.count < 0
      || typeof day.level !== "number" || !Number.isInteger(day.level) || day.level < 0 || day.level > 4) {
      throw new Error("Invalid GitHub contribution day");
    }
    return { date: day.date, count: day.count, level: day.level };
  });
  days.sort((a, b) => a.date.localeCompare(b.date));
  if (!days.length || days.length > 371 || new Set(days.map(day => day.date)).size !== days.length) {
    throw new Error("Invalid GitHub contribution calendar");
  }
  return days;
}

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
