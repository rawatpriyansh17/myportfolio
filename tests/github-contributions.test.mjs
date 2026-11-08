import { test } from "node:test";
import assert from "node:assert/strict";
import { parseContributions, parseGitHubCalendar, parseGraphQLCalendar, getContributions } from "../util/github-contributions.ts";

test("official GraphQL counts retain GitHub's color levels and reject API errors", () => {
  const response = { data: { user: { contributionsCollection: { contributionCalendar: { weeks: [{ contributionDays: [
    { date: "2026-11-07", contributionCount: 12, contributionLevel: "FOURTH_QUARTILE" },
  ] }] } } } } };
  assert.deepEqual(parseGraphQLCalendar(response), [{ date: "2026-11-07", count: 12, level: 4 }]);
  assert.throws(() => parseGraphQLCalendar({ errors: [{ message: "Bad credentials" }] }));
  assert.throws(() => parseGraphQLCalendar({ data: { user: null } }));
});

const calendar = `<td data-level="2" id="day-1" data-date="2026-11-07"></td>
<tool-tip for="day-1">12 contributions on November 7th.</tool-tip>
<td id="day-0" data-date="2026-11-06" data-level="0"></td>
<tool-tip for="day-0">No contributions on November 6th.</tool-tip>`;

test("GitHub HTML preserves actual counts, levels, and dates regardless of attribute order", () => {
  assert.deepEqual(parseGitHubCalendar(calendar), [
    { date: "2026-11-06", count: 0, level: 0 },
    { date: "2026-11-07", count: 12, level: 2 },
  ]);
  assert.throws(() => parseGitHubCalendar(calendar.replace('for="day-1"', 'for="missing"')));
  assert.throws(() => parseGitHubCalendar("<html>Service unavailable</html>"));
});

test("fetch uses GitHub directly and falls back when the primary fails", async (t) => {
  const fetch = t.mock.method(globalThis, "fetch", async () => new Response(calendar));
  assert.equal((await getContributions()).length, 2);
  assert.match(fetch.mock.calls[0].arguments[0], /^https:\/\/github.com\//);
  fetch.mock.mockImplementation(async (url) => url.startsWith("https://github.com/")
    ? new Response("Unavailable", { status: 503 })
    : Response.json({ contributions: [{ date: "2026-11-07", count: 12, level: 2 }] }));
  assert.equal((await getContributions())[0].count, 12);
  fetch.mock.mockImplementation(async () => { throw new Error("Network unavailable"); });
  assert.equal(await getContributions(), null);
});

test("calendar days are sorted without changing contribution counts", () => {
  const later = { date: "2026-11-04", count: 2, level: 1 };
  const earlier = { date: "2026-11-03", count: 0, level: 0 };
  assert.deepEqual(parseContributions({ contributions: [later, earlier] }), [earlier, later]);
});

test("malformed upstream data is rejected instead of rendering invented activity", () => {
  for (const data of [null, {}, { contributions: [] }, { contributions: [{ date: "bad", count: 2, level: 1 }] }, { contributions: [{ date: "2026-11-04", count: -1, level: 1 }] }, { contributions: [{ date: "2026-11-04", count: 2, level: 5 }] }]) {
    assert.throws(() => parseContributions(data));
  }
  const day = { date: "2026-11-04", count: 2, level: 1 };
  assert.throws(() => parseContributions({ contributions: [day, day] }));
});
