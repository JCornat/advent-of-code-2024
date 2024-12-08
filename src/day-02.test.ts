import { assertEquals } from '@std/assert';
import { solvePart1, solvePart2 } from './day-02.ts';

Deno.test('Solve Part 1 - Increasing safe', () => {
  const testValue = [
    '1 2 3 4 7',
  ];

  const res = solvePart1(testValue);
  assertEquals(res, 1);
});

Deno.test('Solve Part 1 - Unsafe - Greater than 3', () => {
  const testValue = [
    '1 2 3 4 8',
  ];

  const res = solvePart1(testValue);
  assertEquals(res, 0);
});

Deno.test('Solve Part 1 - Unsafe - No increase', () => {
  const testValue = [
    '1 2 3 4 4',
  ];

  const res = solvePart1(testValue);
  assertEquals(res, 0);
});

Deno.test('Solve Part 1 - Unsafe - Decrease', () => {
  const testValue = [
    '1 2 3 4 3',
  ];

  const res = solvePart1(testValue);
  assertEquals(res, 0);
});

Deno.test('Solve Part 1', () => {
  const testValue = [
    '7 6 4 2 1',
    '1 2 7 8 9',
    '9 7 6 2 1',
    '1 3 2 4 5',
    '8 6 4 4 1',
    '1 3 6 7 9',
  ];

  const res = solvePart1(testValue);
  assertEquals(res, 2);
});

Deno.test('Solve Part 2 - Single error OK', () => {
  const testValue = [
    '1 2 6 4 5',
  ];

  const res = solvePart2(testValue);
  assertEquals(res, 1);
});

Deno.test('Solve Part 2 - Two errors NOK', () => {
  const testValue = [
    '1 2 6 4 4',
  ];

  const res = solvePart2(testValue);
  assertEquals(res, 0);
});

Deno.test('Solve Part 2', () => {
  const testValue = [
    '7 6 4 2 1',
    '1 2 7 8 9',
    '9 7 6 2 1',
    '1 3 2 4 5',
    '8 6 4 4 1',
    '1 3 6 7 9',
  ];

  const res = solvePart2(testValue);
  assertEquals(res, 4);
});
