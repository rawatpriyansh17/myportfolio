import { getDailyQuote } from "@/data/daily-quotes";

export function DailyQuote() {
  const quote = getDailyQuote();

  return (
    <section aria-labelledby="daily-quote-heading" className="mt-2 flex flex-col items-center justify-center relative py-6" data-quote-date={quote.date}>
      <div className="max-w-[480px] w-full flex flex-col items-center">
        <h2 id="daily-quote-heading" className="mb-4 text-[10px] font-medium tracking-[0.2em] text-zinc-400 dark:text-zinc-600 uppercase">
          Quote of the day
        </h2>
        <blockquote cite={quote.source} className="text-[16px] font-medium text-center leading-relaxed text-zinc-500 dark:text-zinc-400 mb-4 italic text-balance">
          &quot;{quote.text}&quot;
        </blockquote>
        <div className="flex items-center gap-3 text-[10px] font-medium tracking-[0.2em] text-zinc-400 dark:text-zinc-600 uppercase">
          <div aria-hidden="true" className="w-4 h-px bg-zinc-200 dark:bg-zinc-800" />
          <a href={quote.source} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors focus-visible:outline focus-visible:outline-offset-4">{quote.author}</a>
          <div aria-hidden="true" className="w-4 h-px bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </section>
  );
}
