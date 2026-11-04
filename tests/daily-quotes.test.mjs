import { test } from "node:test";
import assert from "node:assert/strict";
import { dailyQuotes, getDailyQuote } from "../data/daily-quotes.ts";

test("a quote stays the same for the whole Indian calendar day", () => {
  assert.deepEqual(
    getDailyQuote(new Date("2026-11-03T18:30:00Z")),
    getDailyQuote(new Date("2026-11-04T18:29:59.999Z")),
  );
});

test("the quote changes at midnight in India, including year and leap-day boundaries", () => {
  for (const boundary of ["2026-11-04T18:30:00Z", "2026-12-31T18:30:00Z", "2028-02-28T18:30:00Z", "2028-02-29T18:30:00Z"]) {
    const now = new Date(boundary);
    const before = getDailyQuote(new Date(now.getTime() - 1));
    const after = getDailyQuote(now);
    assert.notEqual(before.text, after.text);
    assert.notEqual(before.date, after.date);
  }
  assert.equal(getDailyQuote(new Date("2028-02-28T18:30:00Z")).date, "2028-02-29");
});

test("rotation does not repeat until the collection is exhausted", () => {
  const start = Date.parse("2026-11-04T00:00:00Z");
  const quotes = Array.from({ length: dailyQuotes.length }, (_, index) => getDailyQuote(new Date(start + index * 86_400_000)).text);
  assert.equal(new Set(quotes).size, dailyQuotes.length);
  assert.equal(getDailyQuote(new Date(start + dailyQuotes.length * 86_400_000)).text, quotes[0]);
});

test("every quote has an author and HTTPS source; invalid dates are rejected", () => {
  for (const quote of dailyQuotes) {
    assert.ok(quote.author && quote.text);
    assert.equal(new URL(quote.source).protocol, "https:");
  }
  assert.throws(() => getDailyQuote(new Date("invalid")), RangeError);
});
