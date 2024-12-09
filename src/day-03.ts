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
  return lines.reduce((parentAcc, line) => {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const array = [...line.matchAll(regex)];
    const reduce2 = array.reduce((childAcc, value) => {
      const multiplication = +value[1] * +value[2];
      return multiplication + childAcc;
    }, 0);

    return reduce2 + parentAcc;
  }, 0);
}

export function solvePart2(lines: string[]) {
  let enable = true;

  return lines.reduce((acc, line) => {
    const regex = /(?:mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/g;
    const array = [...line.matchAll(regex)];
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      const value = array[i];
      const command = value[0];
      if (command === `don't()`) {
        enable = false;
        continue;
      } else if (command === 'do()') {
        enable = true;
        continue;
      }

      if (!enable) {
        continue;
      }

      total += +value[1] * +value[2];
    }

    return total + acc;
  }, 0);
}
