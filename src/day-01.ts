import {readLines, extractNumbers} from './utils.ts';

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
  const convertedLines = lines.map((line) => extractNumbers(line))
  const leftParts = convertedLines.map((numbers) => numbers[0].value).sort();
  const rightParts = convertedLines.map((numbers) => numbers[1].value).sort();

  const diff = leftParts.map((left, index) => {
    const right = rightParts[index];
    return Math.abs(left - right)
  });

  return diff.reduce((sum, value) => sum + value, 0);
}

export function solvePart2(lines: string[]) {
  const convertedLines = lines.map((line) => extractNumbers(line));

  function countOccurrences() {
    const map = new Map<number, number>();
    convertedLines.map((line) => {
      const rightPart = line[1].value;
      const count = map.get(rightPart);
      if (count) {
        map.set(rightPart, count + 1)
      } else {
        map.set(rightPart, 1)
      }
    })

    return map;
  }

  const occurrences = countOccurrences();
  const similarityList = convertedLines.map((line) => {
    const leftPart = line[0].value;
    const count = occurrences.get(leftPart);
    if (!count) {
      return 0;
    }

    return leftPart * count;
  });

  return similarityList.reduce((value, acc) => value + acc, 0);
}