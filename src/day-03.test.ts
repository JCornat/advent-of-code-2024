import { assertEquals } from '@std/assert';
import { solvePart1, solvePart2 } from './day-03.ts';

Deno.test('Solve Part 1 - Simple', () => {
  const testValue = [
    'mul(2,4)',
  ];

  const res = solvePart1(testValue);
  assertEquals(res, 8);
});

Deno.test('Solve Part 1 - Simple', () => {
  const testValue = [
    'mul(2,4)xmul(2,4)',
  ];

  const res = solvePart1(testValue);
  assertEquals(res, 16);
});

Deno.test('Solve Part 1 - Simple', () => {
  const testValue = [
    'mul(2,4)xmul(2,4)',
    'mul(2,4)xmul(2,4)',
  ];

  const res = solvePart1(testValue);
  assertEquals(res, 32);
});

Deno.test('Solve Part 1', () => {
  const testValue = [
    'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))',
  ];

  const res = solvePart1(testValue);
  assertEquals(res, 161);
});

Deno.test('Solve Part 2', () => {
  const testValue = [
    "don't()mul(5,5)",
  ];

  const res = solvePart2(testValue);
  assertEquals(res, 0);
});

Deno.test('Solve Part 2', () => {
  const testValue = [
    'do()mul(5,5)',
  ];

  const res = solvePart2(testValue);
  assertEquals(res, 25);
});

Deno.test('Solve Part 2', () => {
  const testValue = [
    "don't()mul(5,5)mul(5,5)do()mul(5,5)",
  ];

  const res = solvePart2(testValue);
  assertEquals(res, 25);
});

Deno.test('Solve Part 2', () => {
  const testValue = [
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
  ];

  const res = solvePart2(testValue);
  assertEquals(res, 48);
});

Deno.test('Solve Part 2', () => {
  const testValue = [
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
    "don't()mul(5,5)mul(5,5)do()mul(5,5)",
  ];

  const res = solvePart2(testValue);
  assertEquals(res, 48 + 25);
});

Deno.test('Solve Part 2', () => {
  const testValue = [
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
    "don't()mul(5,5)mul(5,5)do()mul(5,5)don't()",
    'mul(5,5)',
  ];

  const res = solvePart2(testValue);
  assertEquals(res, 48 + 25);
});
