import { assertEquals } from '@std/assert';
import { buildMaps, getMiddle, isInRightOrder, solvePart1, solvePart2 } from './day-05.ts';

Deno.test('Solve Part 1 - Basic', () => {
  const shallBeBefore = new Map<number, number[]>();
  shallBeBefore.set(47, [53, 13]);
  shallBeBefore.set(97, [13]);

  const shallBeAfter = new Map<number, number[]>();
  shallBeAfter.set(53, [47]);
  shallBeAfter.set(13, [47, 97]);

  const res = buildMaps([[47, 53], [47, 13], [97, 13]]);
  assertEquals(res, { shallBeBefore, shallBeAfter });
});

Deno.test('Solve Part 1 - Basic', () => {
  const shallBeBefore = new Map<number, number[]>();
  shallBeBefore.set(47, [53, 13]);
  shallBeBefore.set(97, [13]);

  const shallBeAfter = new Map<number, number[]>();
  shallBeAfter.set(53, [47]);
  shallBeAfter.set(13, [47, 97]);

  const res = isInRightOrder([47, 53, 97, 13], shallBeBefore, shallBeAfter);
  assertEquals(res, true);
});

Deno.test('Solve Part 1 - Basic', () => {
  const shallBeBefore = new Map<number, number[]>();
  shallBeBefore.set(47, [53, 13]);
  shallBeBefore.set(97, [13]);

  const shallBeAfter = new Map<number, number[]>();
  shallBeAfter.set(53, [47]);
  shallBeAfter.set(13, [47, 97]);

  const res = isInRightOrder([47, 53, 13, 97], shallBeBefore, shallBeAfter);
  assertEquals(res, false);
});

Deno.test('Solve Part 1 - Basic', () => {
  const res = getMiddle([47]);
  assertEquals(res, 47);
});

Deno.test('Solve Part 1 - Basic', () => {
  const res = getMiddle([75, 29, 13]);
  assertEquals(res, 29);
});

Deno.test('Solve Part 1 - Basic', () => {
  const res = getMiddle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assertEquals(res, 5);
});

Deno.test('Solve Part 1 - Basic', () => {
  const testValue = [
    '47|53',
    '97|13',
    '97|61',
    '97|47',
    '75|29',
    '61|13',
    '75|53',
    '29|13',
    '97|29',
    '53|29',
    '61|53',
    '97|53',
    '61|29',
    '47|13',
    '75|47',
    '97|75',
    '47|61',
    '75|61',
    '47|29',
    '75|13',
    '53|13',
    '',
    '75,47,61,53,29',
    '97,61,53,29,13',
    '75,29,13',
    '75,97,47,61,53',
    '61,13,29',
    '97,13,75,29,47',
  ];

  const res = solvePart1(testValue);
  assertEquals(res, 143);
});
