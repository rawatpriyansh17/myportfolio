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

export async function getContributions(): Promise<Contribution[] | null> {
  try {
    const response = await fetch("https://github-contributions-api.jogruber.de/v4/rawatpriyansh17?y=last", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`GitHub contributions returned ${response.status}`);
    return parseContributions(await response.json());
  } catch {
    // An upstream outage must never take down the portfolio or fabricate activity.
    return null;
  }
}
