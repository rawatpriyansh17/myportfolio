"use client";

import { useState } from "react";
import Image from "next/image";
import { Timer, WholeWord, Quote, Infinity as InfinityIcon, Leaf, CalendarDays, Crosshair, FileText, Code2, Palette, Play, Square, Terminal, Check, type LucideIcon } from "lucide-react";

type Preview = { id: string; label: string; description: string; icon: LucideIcon };
const modes: Preview[] = [
  { id: "mode-time", label: "Time", icon: Timer, description: "Choose 15, 30, 60, or 120 seconds. The timer starts with your first keystroke." },
  { id: "mode-words", label: "Words", icon: WholeWord, description: "Finish a fixed word count at your own pace, without a countdown." },
  { id: "mode-quote", label: "Quote", icon: Quote, description: "Practice a complete passage, including capitals and punctuation." },
  { id: "mode-endless", label: "Endless", icon: InfinityIcon, description: "Keep typing through an unlimited stream of words with live metrics. Ctrl+D saves the run." },
  { id: "mode-zen", label: "Zen", icon: Leaf, description: "Guided words in a quiet focus view, with no timer or word limit. Ctrl+D finishes the session." },
  { id: "mode-daily", label: "Daily", icon: CalendarDays, description: "A 60-second challenge seeded by the UTC date. Everyone on the same app version gets the same starting text, even offline." },
  { id: "mode-weak", label: "Weak keys", icon: Crosshair, description: "Focus on words containing your five most error-prone characters, based on your local practice history." },
  { id: "mode-custom", label: "Custom", icon: FileText, description: "Bring your own text or source file through the built-in file browser. Your text stays on your machine." },
  { id: "mode-code", label: "Code", icon: Code2, description: "Practice bundled Rust, Python, and JavaScript snippets, with newline and indentation support." },
];
const themes: Preview[] = [
  { id: "fern", label: "Fern", icon: Leaf, description: "A dark terminal palette with soft green accents." },
  { id: "paper", label: "Paper", icon: FileText, description: "A light palette with warm paper tones and clear contrast." },
  { id: "moon", label: "Moon", icon: Palette, description: "Deep purple surfaces with soft lavender accents." },
  { id: "tide", label: "Tide", icon: Palette, description: "A cool blue palette for a quieter workspace." },
  { id: "ember", label: "Ember", icon: Palette, description: "Warm amber accents against a dark background." },
  { id: "rose", label: "Rose", icon: Palette, description: "Muted rose and lavender accents on a dark base." },
];
const buttonClass = "inline-flex min-h-10 items-center justify-center gap-2 rounded-md border px-3 py-2 text-xs font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-500";

function PreviewGallery({ items, label }: { items: Preview[]; label: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = items[selectedIndex] ?? items[0];
  return (
    <div>
      <div role="group" aria-label={label} className="mb-4 flex flex-wrap gap-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          const active = selected.id === item.id;
          return <button key={item.id} type="button" aria-pressed={active} onClick={() => setSelectedIndex(index)} className={`${buttonClass} ${active ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900" : "border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"}`}>
            {label === "Theme previews" && active ? <Check aria-hidden="true" className="size-3.5" /> : <Icon aria-hidden="true" className="size-3.5" />}{item.label}
          </button>;
        })}
      </div>
      <figure>
        <a href={`/projects/typedef/${selected.id}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size ${selected.label} preview`} className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-500">
          <Image key={selected.id} src={`/projects/typedef/${selected.id}.webp`} alt={`typedef ${selected.label} ${label === "Theme previews" ? "theme" : "practice mode"}`} width={1200} height={720} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800" />
        </a>
        <figcaption aria-live="polite" className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          <span className="font-medium text-zinc-800 dark:text-zinc-200">{selected.label}. </span>{selected.description}
        </figcaption>
      </figure>
    </div>
  );
}

export function TypedefShowcase() {
  const [playing, setPlaying] = useState(false);
  return <div className="space-y-10 mt-8">
    <section aria-labelledby="typedef-demo-heading">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 id="typedef-demo-heading" className="flex items-center gap-2 text-lg font-semibold"><Terminal aria-hidden="true" className="size-4 text-zinc-500" />In the terminal</h2>
        <button type="button" onClick={() => setPlaying(!playing)} aria-controls="typedef-demo" className={`${buttonClass} shrink-0 border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900`}>
          {playing ? <Square aria-hidden="true" className="size-3.5" /> : <Play aria-hidden="true" className="size-3.5" />}{playing ? "Stop demo" : "Play demo"}
        </button>
      </div>
      <figure>
        <Image id="typedef-demo" src={playing ? "/projects/typedef/demo.gif" : "/projects/typedef/demo-poster.webp"} alt="typedef timed typing session with live speed, accuracy, and keyboard feedback" width={1200} height={720} unoptimized className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800" />
        <figcaption className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">A timed practice session in typedef: live WPM and accuracy above the text, with keyboard feedback below. Play the demo to see it in action.</figcaption>
      </figure>
    </section>
    <section aria-labelledby="typedef-modes-heading">
      <h2 id="typedef-modes-heading" className="mb-2 flex items-center gap-2 text-lg font-semibold"><Crosshair aria-hidden="true" className="size-4 text-zinc-500" />Nine ways to practice</h2>
      <p className="mb-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">Quick tests, focused drills, or a longer session. Explore each mode below.</p>
      <PreviewGallery items={modes} label="Practice mode previews" />
    </section>
    <section aria-labelledby="typedef-themes-heading">
      <h2 id="typedef-themes-heading" className="mb-2 flex items-center gap-2 text-lg font-semibold"><Palette aria-hidden="true" className="size-4 text-zinc-500" />Make it your terminal</h2>
      <p className="mb-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">Six previews from the app’s 28 themes. Select a palette to see the dashboard, or open an image for a closer look.</p>
      <PreviewGallery items={themes} label="Theme previews" />
    </section>
  </div>;
}
