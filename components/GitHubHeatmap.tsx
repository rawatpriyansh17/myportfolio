"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { parseContributions, GITHUB_PROFILE, type Contribution } from "@/lib/github-calendar";

const DAY_MS = 86_400_000;
const CELL = 11;
const STEP = 14;
const LABEL_WIDTH = 28;
const TOP = 20;
const levels = [
  "fill-zinc-100 dark:fill-zinc-900",
  "fill-[#9be9a8] dark:fill-[#0e4429]",
  "fill-[#40c463] dark:fill-[#006d32]",
  "fill-[#30a14e] dark:fill-[#26a641]",
  "fill-[#216e39] dark:fill-[#39d353]",
];
const monthName = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });
const fullDate = new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" });
const lineStyle = {
  maskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
  WebkitMaskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
};

export function GitHubHeatmap() {
  const [days, setDays] = useState<Contribution[] | null>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const cacheKey = "github-calendar:rawatpriyansh17:v1";
    const load = async () => {
      try {
        const saved = localStorage.getItem(cacheKey);
        if (saved) {
          const cached = JSON.parse(saved);
          if (typeof cached.savedAt === "number" && Date.now() - cached.savedAt < 7 * 86400000) {
            setDays(parseContributions(cached));
          }
        }
      } catch { /* Browser storage is optional. */ }
      try {
        const response = await fetch("/api/github", { signal: controller.signal });
        if (!response.ok) return;
        const contributions = parseContributions(await response.json());
        if (controller.signal.aborted) return;
        setDays(contributions);
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ contributions, savedAt: Date.now() }));
        } catch { /* A disabled/full cache must not hide the calendar. */ }
      } catch { /* Keep cached data or the independently loaded chart visible. */ }
    };
    void load();
    return () => controller.abort();
  }, [attempt]);
  const start = days ? Date.parse(days[0].date) - new Date(days[0].date).getUTCDay() * DAY_MS : 0;
  const columns = days ? Math.floor((Date.parse(days.at(-1)!.date) - start) / DAY_MS / 7) + 1 : 0;
  const width = LABEL_WIDTH + columns * STEP;
  const months: { label: string; column: number }[] = [];
  let previousMonth = "";
  for (let column = 0; column < columns; column++) {
    const date = new Date(start + column * 7 * DAY_MS);
    const month = monthName.format(date);
    if (month !== previousMonth && column < columns - 2) {
      months.push({ label: month, column });
      previousMonth = month;
    }
  }

  return (
    <section id="github" aria-labelledby="github-heading" className="mt-6 relative scroll-mt-24">
      <div aria-hidden="true" className="absolute top-0 left-[-100vw] right-[-100vw] border-t border-black/30 dark:border-white/[0.15] pointer-events-none" style={lineStyle} />
      <div className="py-2 relative mt-1 flex items-center justify-between gap-4">
        <h2 id="github-heading" className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">GitHub</h2>
        <a href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer" className="text-[11px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">@rawatpriyansh17</a>
        <div aria-hidden="true" className="absolute bottom-0 left-[-100vw] right-[-100vw] border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={lineStyle} />
      </div>
      <div className="pt-5 pb-2">
        {days ? (
          <>
            <div dir="rtl" tabIndex={0} role="region" aria-label="GitHub contribution calendar; scroll horizontally to see the full year" className="overflow-x-auto pb-2 rounded-sm focus-visible:outline focus-visible:outline-offset-4">
              <svg style={{ direction: "ltr" }} role="img" aria-labelledby="github-calendar-title" viewBox={`0 0 ${width} ${TOP + 7 * STEP}`} className="block w-full min-w-[520px] text-zinc-500 dark:text-zinc-400">
                <title id="github-calendar-title">GitHub contributions by rawatpriyansh17 over the last year</title>
                {months.map(month => <text key={month.column} x={LABEL_WIDTH + month.column * STEP} y={10} fill="currentColor" fontSize={10}>{month.label}</text>)}
                {[{ day: 1, label: "Mon" }, { day: 3, label: "Wed" }, { day: 5, label: "Fri" }].map(({ day, label }) => (
                  <text key={day} x={0} y={TOP + day * STEP + 9} fill="currentColor" fontSize={9}>{label}</text>
                ))}
                {days.map(day => {
                  const offset = Math.round((Date.parse(day.date) - start) / DAY_MS);
                  return (
                    <rect key={day.date} x={LABEL_WIDTH + Math.floor(offset / 7) * STEP} y={TOP + (offset % 7) * STEP} width={CELL} height={CELL} rx={2} className={`${levels[day.level]} stroke-black/5 dark:stroke-white/5`}>
                      <title>{`${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${fullDate.format(new Date(day.date))}`}</title>
                    </rect>
                  );
                })}
              </svg>
            </div>
            <div aria-hidden="true" className="mt-1 flex items-center justify-end gap-1 text-[10px] text-zinc-500">
              <span className="mr-1">Less</span>
              <svg width={68} height={10} viewBox="0 0 68 10">{levels.map((level, index) => <rect key={level} x={index * 14} width={10} height={10} rx={2} className={level} />)}</svg>
              <span className="ml-1">More</span>
            </div>
          </>
        ) : !imageFailed ? (
          <div dir="rtl" tabIndex={0} role="region" aria-label="GitHub contribution calendar; scroll horizontally to see the full year" className="overflow-x-auto pb-2 rounded-sm focus-visible:outline focus-visible:outline-offset-4">
            <a href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer" className="block min-w-[520px]">
              <Image key={attempt} unoptimized
                src={`https://ghchart.rshah.org/rawatpriyansh17${attempt ? `?retry=${attempt}` : ""}`}
                alt="GitHub contribution calendar for rawatpriyansh17 over the last year"
                width={663} height={104} loading="eager"
                className="block w-full" onError={() => setImageFailed(true)} />
            </a>
          </div>
        ) : (
          <p className="text-[13px] text-zinc-500">Calendar couldn’t load. <button type="button" className="underline underline-offset-4" onClick={() => { setImageFailed(false); setAttempt(value => value + 1); }}>Retry</button> or <a href={GITHUB_PROFILE} className="underline underline-offset-4">view on GitHub</a>.</p>
        )}
      </div>
    </section>
  );
}
