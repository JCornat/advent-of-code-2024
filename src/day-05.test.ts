import { assertEquals } from '@std/assert';
import { buildMaps, correctUpdate, getMiddle, isInRightOrder, solvePart1, solvePart2 } from './day-05.ts';

Deno.test('Solve Part 1 - buildMaps', () => {
  const shallBeBefore = new Map<number, number[]>();
  shallBeBefore.set(47, [53, 13]);
  shallBeBefore.set(97, [13]);

  const shallBeAfter = new Map<number, number[]>();
  shallBeAfter.set(53, [47]);
  shallBeAfter.set(13, [47, 97]);

  const res = buildMaps([[47, 53], [47, 13], [97, 13]]);
  assertEquals(res, { shallBeBefore, shallBeAfter });
});

Deno.test('Solve Part 1 - isInRightOrder - valid', () => {
  const shallBeBefore = new Map<number, number[]>();
  shallBeBefore.set(47, [53, 13]);
  shallBeBefore.set(97, [13]);

  const shallBeAfter = new Map<number, number[]>();
  shallBeAfter.set(53, [47]);
  shallBeAfter.set(13, [47, 97]);

  const res = isInRightOrder([47, 53, 97, 13], shallBeBefore, shallBeAfter);
  assertEquals(res, true);
});

Deno.test('Solve Part 1 - isInRightOrder - invalid', () => {
  const shallBeBefore = new Map<number, number[]>();
  shallBeBefore.set(47, [53, 13]);
  shallBeBefore.set(97, [13]);

  const shallBeAfter = new Map<number, number[]>();
  shallBeAfter.set(53, [47]);
  shallBeAfter.set(13, [47, 97]);

  const res = isInRightOrder([47, 53, 13, 97], shallBeBefore, shallBeAfter);
  assertEquals(res, false);
});

Deno.test('Solve Part 1 - getMiddle - 1 item', () => {
  const res = getMiddle([47]);
  assertEquals(res, 47);
});

Deno.test('Solve Part 1 - getMiddle - 3 items', () => {
  const res = getMiddle([75, 29, 13]);
  assertEquals(res, 29);
});

Deno.test('Solve Part 1 - getMiddle - 9 items', () => {
  const res = getMiddle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assertEquals(res, 5);
});

Deno.test('Solve Part 1', () => {
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

Deno.test('Solve Part 2 - correctUpdate', () => {
  const shallBeBefore = new Map<number, number[]>();
  shallBeBefore.set(61, [13, 29]);
  shallBeBefore.set(29, [13]);

  const shallBeAfter = new Map<number, number[]>();
  shallBeAfter.set(13, [61, 29]);
  shallBeAfter.set(29, [61]);

  const res = correctUpdate([61, 13, 29], shallBeBefore, shallBeAfter);
  assertEquals(res, [61, 29, 13]);
});

Deno.test('Solve Part 2 - correctUpdate', () => {
  const shallBeBefore = new Map<number, number[]>();
  shallBeBefore.set(97, [13, 61, 47, 29, 53, 75]);
  shallBeBefore.set(75, [29, 53, 47, 61, 13]);
  shallBeBefore.set(29, [13]);
  shallBeBefore.set(47, [53, 13, 61, 29]);

  const shallBeAfter = new Map<number, number[]>();
  shallBeAfter.set(13, [97, 61, 29, 47, 75, 53]);
  shallBeAfter.set(75, [97]);
  shallBeAfter.set(29, [97, 53, 61, 47]);
  shallBeAfter.set(47, [97, 75]);

  const res = correctUpdate([97, 13, 75, 29, 47], shallBeBefore, shallBeAfter);
  assertEquals(res, [97, 75, 47, 29, 13]);
});
