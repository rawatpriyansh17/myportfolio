export type DailyQuote = {
  text: string;
  author: string;
  source: string;
};

// Short, attributed excerpts. Keep the source with each quote so wording can be checked.
export const dailyQuotes: readonly DailyQuote[] = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    source: "https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says",
  },
  {
    text: "Diligence is the mother of good luck.",
    author: "Benjamin Franklin",
    source: "https://www.gutenberg.org/files/43855/43855-h/43855-h.htm",
  },
  {
    text: "Empirically, the way to do really big things seems to be to start with deceptively small things.",
    author: "Paul Graham",
    source: "https://paulgraham.com/ambitious.html",
  },
  {
    text: "Nothing great was ever achieved without enthusiasm.",
    author: "Ralph Waldo Emerson",
    source: "https://www.gutenberg.org/files/16643/16643-h/16643-h.htm",
  },
  {
    text: "It is hard to fail, but it is worse never to have tried to succeed.",
    author: "Theodore Roosevelt",
    source: "https://www.theodorerooseveltcenter.org/quote/it-is-hard-to-fail-but-it-is-worse-never-to-have-tried-to-succeed-in-this-life-we-get-nothing-save-by-effort/",
  },
  {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
    source: "https://www.cs.utexas.edu/~EWD/transcriptions/EWD04xx/EWD498.html",
  },
  {
    text: "If you have built castles in the air, your work need not be lost; that is where they should be. Now put the foundations under them.",
    author: "Henry David Thoreau",
    source: "https://www.gutenberg.org/files/205/205-h/205-h.htm",
  },
  {
    text: "Optimism is the faith that leads to achievement.",
    author: "Helen Keller",
    source: "https://www.gutenberg.org/cache/epub/31622/pg31622-images.html",
  },
  {
    text: "Lost time is never found again.",
    author: "Benjamin Franklin",
    source: "https://www.gutenberg.org/files/43855/43855-h/43855-h.htm",
  },
  {
    text: "Trust thyself: every heart vibrates to that iron string.",
    author: "Ralph Waldo Emerson",
    source: "https://www.gutenberg.org/files/16643/16643-h/16643-h.htm",
  },
  {
    text: "If there is no struggle there is no progress.",
    author: "Frederick Douglass",
    source: "https://www.dsausa.org/blog/if_there_is_no_struggle_there_is_no_progress/",
  },
  {
    text: "Things do not change; we change.",
    author: "Henry David Thoreau",
    source: "https://www.gutenberg.org/files/205/205-h/205-h.htm",
  },
  {
    text: "Do your work, and you shall reinforce yourself.",
    author: "Ralph Waldo Emerson",
    source: "https://www.gutenberg.org/files/16643/16643-h/16643-h.htm",
  },
];

const DAY_MS = 86_400_000;
const INDIA_OFFSET_MS = 330 * 60_000;

// Date-based selection is stable across servers, rebuilds and repeated cron invocations.
// India uses UTC+05:30 year-round. No database or external quote service is required.
export function getDailyQuote(now = new Date()) {
  const timestamp = now.getTime();
  if (!Number.isFinite(timestamp)) throw new RangeError("Invalid quote date");
  const day = Math.floor((timestamp + INDIA_OFFSET_MS) / DAY_MS);
  const index = ((day % dailyQuotes.length) + dailyQuotes.length) % dailyQuotes.length;
  return {
    ...dailyQuotes[index],
    date: new Date(day * DAY_MS).toISOString().slice(0, 10),
  };
}
