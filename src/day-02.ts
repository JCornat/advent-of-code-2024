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
  return lines.map((line) => extractNumbers(line))
    .map((extractedNumbers) => extractedNumbers.map((number) => number.value))
    .map((numbers) => isSafe(numbers))
    .reduce((acc, safe) => {
      const value = safe ? 1 : 0;
      return acc + value;
    }, 0);
}

export function solvePart2(lines: string[]) {
  return lines.map((line) => extractNumbers(line))
    .map((extractedNumbers) => extractedNumbers.map((number) => number.value))
    .map((numbers) => {
      if (isSafe(numbers)) {
        return true;
      }

      for (let i = 0; i < numbers.length; i++) {
        const filteredNumbers = numbers.toSpliced(i, 1);
        if (isSafe(filteredNumbers)) {
          return true;
        }
      }

      return false;
    })
    .reduce((acc, safe) => {
      const value = safe ? 1 : 0;
      return acc + value;
    }, 0);
}

function isSafe(numbers: number[]): boolean {
  const originalGrow = isGrowing(numbers[0], numbers[1]);
  for (let i = 0; i < numbers.length; i++) {
    if (i === 0) {
      continue;
    }

    const previousNumber = numbers[i - 1];
    const currentNumber = numbers[i];
    if (previousNumber === currentNumber) {
      return false;
    }

    if (Math.abs(previousNumber - currentNumber) > 3) {
      return false;
    }

    const currentGrow = isGrowing(previousNumber, currentNumber);
    if (currentGrow !== originalGrow) {
      return false;
    }
  }

  return true;
}

function isGrowing(number1: number, number2: number): boolean {
  const diff = number1 - number2;
  return diff < 0;
}
