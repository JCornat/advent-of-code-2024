import { extractNumbers, readLines } from './utils.ts';

if (import.meta.main) {
  init()
    .catch(console.error);
}

async function init() {
  const lines = await readLines(import.meta.filename!);
  const part1 = solvePart1(lines);
  const part2 = solvePart2(lines);

  console.log(`Part 1 : ${part1}`);
  console.log(`Part 2 : ${part2}`);
}

export function solvePart1(lines: string[]) {
  const splitIndex = lines.indexOf('');
  const rules = lines.slice(0, splitIndex).map((line) => line.split('|').map((x) => +x));
  const z = buildMaps(rules);

  const updates = lines.slice(splitIndex).filter((value) => value !== '').map((line) => line.split(',').map((x) => +x));
  let total = 0;
  for (const update of updates) {
    const isValid = isInRightOrder(update, z.shallBeBefore, z.shallBeAfter);
    if (!isValid) {
      continue;
    }

    total += getMiddle(update);
  }

  return total;
}

export function buildMaps(rules: number[][]): { shallBeBefore: Map<number, number[]>; shallBeAfter: Map<number, number[]> } {
  const shallBeBefore = new Map<number, number[]>();
  const shallBeAfter = new Map<number, number[]>();
  for (const rule of rules) {
    const leftPart = rule[0];
    const rightPart = rule[1];

    const shallBeBeforeValue = shallBeBefore.get(leftPart) ?? [];
    shallBeBefore.set(leftPart, [...shallBeBeforeValue, rightPart]);

    const shallBeAfterValue = shallBeAfter.get(rightPart) ?? [];
    shallBeAfter.set(rightPart, [...shallBeAfterValue, leftPart]);
  }

  return {
    shallBeBefore,
    shallBeAfter,
  };
}

export function isInRightOrder(updates: number[], shallBeBefore: Map<number, number[]>, shallBeAfter: Map<number, number[]>): boolean {
  for (let i = 0; i < updates.length; i++) {
    const currentNumber = updates[i];
    const expectedBefore = shallBeBefore.get(currentNumber);
    if (expectedBefore) {
      for (const x of expectedBefore) {
        const index = updates.indexOf(x);
        if (index === -1) {
          continue;
        }

        if (updates.indexOf(x) < i) {
          return false;
        }
      }
    }

    const expectedAfter = shallBeAfter.get(currentNumber);
    if (expectedAfter) {
      for (const x of expectedAfter) {
        const index = updates.indexOf(x);
        if (index === -1) {
          continue;
        }

        if (updates.indexOf(x) > i) {
          return false;
        }
      }
    }
  }

  return true;
}

export function getMiddle(updates: number[]) {
  const middleIndex = Math.floor(updates.length / 2);
  return updates[middleIndex];
}

export function solvePart2(lines: string[]) {
  return 0;
}
