import { basename } from '@std/path';
import { isNumber } from '@nodeteam/is-number';

export async function readLines(originalPath: string): Promise<string[]> {
  const fileBasename = basename(originalPath, '.ts');
  const fileContent = await Deno.readTextFile(`${import.meta.dirname}/../data/${fileBasename}.txt`);
  return convertStringMultilineToStringArray(fileContent);
}

export function convertStringMultilineToStringArray(content: string): string[] {
  const lines = content.split('\n');
  if (lines[lines.length - 1] === '') {
    lines.splice(-1, 1); // Remove last line if empty
  }

  return lines;
}

export function isNaN(value: unknown): boolean {
  return !isNumber(value);
}

interface ExtractedNumber {
  value: number;
  index: number;
}

export function extractNumbers(line: string): ExtractedNumber[] {
  const res: ExtractedNumber[] = [];
  let initialIndex = NaN;
  let currentNumber = '';

  function addElement(value: number, index: number): void {
    const element = {
      value,
      index,
    };

    res.push(element);
  }

  for (let i = 0; i < line.length; i++) {
    const character = line[i];
    if (isNumber(character)) {
      if (isNaN(initialIndex)) {
        initialIndex = i;
      }

      currentNumber += character;

      if (i === line.length - 1) { // If last character is a number
        addElement(+currentNumber, initialIndex);
      }

      continue;
    }

    if (currentNumber) {
      addElement(+currentNumber, initialIndex);
      initialIndex = NaN;
      currentNumber = '';
    }
  }

  return res;
}
