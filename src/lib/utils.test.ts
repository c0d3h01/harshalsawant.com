import assert from "node:assert/strict";
import test from "node:test";
import { formatDate, toIsoDate } from "./utils.ts";

test("normalizes valid dates to ISO", () => {
	assert.equal(toIsoDate("2026-11-09"), "2026-11-09");
	assert.equal(toIsoDate(new Date("2026-11-09T12:34:56Z")), "2026-11-09");
});

test("rejects invalid dates", () => {
	assert.throws(() => toIsoDate("not a date"), /Invalid date/);
	assert.throws(() => toIsoDate(undefined), /Invalid date/);
});

test("formats dates in UTC", () => {
	assert.equal(formatDate("2026-11-09"), "Nov 9, 2026");
	assert.throws(() => formatDate("not a date"), /Invalid date/);
});
