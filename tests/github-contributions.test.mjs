import { test } from "node:test";
import assert from "node:assert/strict";
import { parseContributions } from "../util/github-contributions.ts";

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
