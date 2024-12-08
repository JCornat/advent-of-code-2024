import { assertEquals } from "@std/assert";
import { solvePart1, solvePart2 } from "./day-01.ts";

Deno.test("Solve Part 1 - Basic", () => {
  const testValue = [
    "1   1",
  ];

  const res = solvePart1(testValue);
  assertEquals(res, 0);
});

Deno.test("Solve Part 1", () => {
  const testValue = [
    "3   4",
    "4   3",
    "2   5",
    "1   3",
    "3   9",
    "3   3",
  ];

  const res = solvePart1(testValue);
  assertEquals(res, 11);
});

Deno.test("Solve Part 2 - Found once", () => {
  const testValue = [
    "1   1",
  ];

  const res = solvePart2(testValue);
  assertEquals(res, 1);
});

Deno.test("Solve Part 2 - Not found", () => {
  const testValue = [
    "0   1",
  ];

  const res = solvePart2(testValue);
  assertEquals(res, 0);
});

Deno.test("Solve Part 2", () => {
  const testValue = [
    "3   4",
    "4   3",
    "2   5",
    "1   3",
    "3   9",
    "3   3",
  ];

  const res = solvePart2(testValue);
  assertEquals(res, 31);
});
