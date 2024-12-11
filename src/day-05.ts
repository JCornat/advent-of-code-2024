import { readLines } from './utils.ts';

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
  const maps = buildMaps(rules);

  const updates = lines.slice(splitIndex).filter((value) => value !== '').map((line) => line.split(',').map((x) => +x));
  let total = 0;
  for (const update of updates) {
    const isValid = isInRightOrder(update, maps.shallBeBefore, maps.shallBeAfter);
    if (!isValid) {
      continue;
    }

    total += getMiddle(update);
  }

  return total;
}

export function solvePart2(lines: string[]) {
  const splitIndex = lines.indexOf('');
  const rules = lines.slice(0, splitIndex).map((line) => line.split('|').map((x) => +x));
  const maps = buildMaps(rules);

  const updates = lines.slice(splitIndex).filter((value) => value !== '').map((line) => line.split(',').map((x) => +x));
  let total = 0;
  for (const update of updates) {
    const isValid = isInRightOrder(update, maps.shallBeBefore, maps.shallBeAfter);
    if (isValid) {
      continue;
    }

    const correctedUpdate = correctUpdate(update, maps.shallBeBefore, maps.shallBeAfter);
    total += getMiddle(correctedUpdate);
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

        if (index < i) {
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

        if (index > i) {
          return false;
        }
      }
    }
  }

  return true;
}

export function correctUpdate(originalUpdates: number[], shallBeBefore: Map<number, number[]>, shallBeAfter: Map<number, number[]>): number[] {
  let iteration = 0;
  const updates = [...originalUpdates];

  while (iteration < 1000) {
    iteration++;
    let restart = false;

    for (let i = 0; i < updates.length; i++) {
      const currentNumber = updates[i];
      const expectedBefore = shallBeBefore.get(currentNumber);
      if (expectedBefore) {
        for (const numberBefore of expectedBefore) {
          const index = updates.indexOf(numberBefore);
          if (index === -1) {
            continue;
          }

          if (index < i) {
            swapElements(updates, index, i);
            restart = true;
          }
        }
      }

      if (restart) {
        break;
      }

      const expectedAfter = shallBeAfter.get(currentNumber);
      if (expectedAfter) {
        for (const numberAfter of expectedAfter) {
          const index = updates.indexOf(numberAfter);
          if (index === -1) {
            continue;
          }

          if (index > i) {
            swapElements(updates, index, i);
            restart = true;
          }
        }
      }

      if (restart) {
        break;
      }
    }

    if (!restart) {
      break;
    }
  }

  return updates;
}

const swapElements = (array: number[], index1: number, index2: number): void => {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};

export function getMiddle(updates: number[]) {
  const middleIndex = Math.floor(updates.length / 2);
  return updates[middleIndex];
}
