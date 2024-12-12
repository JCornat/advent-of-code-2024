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

export function solvePart1(matrix: string[]) {
  let x = [...matrix]
  let coordinate = getGuardCoordinate(matrix);
  let direction: Direction = 'up';
  let iteration = 0;
  const set = new Set();
  set.add(`${coordinate[0]}-${coordinate[1]}`);

  while (iteration < 100000) {
    iteration++;

    const nextCoordinate = getNextCoordinate(coordinate, direction);
    const isInside = isCoordinateValid(nextCoordinate, matrix);
    if (!isInside) {
      break;
    }

    const isObstacle = isCellObstacle(nextCoordinate, matrix);
    if (isObstacle) {
      direction = turnRight(direction);
      coordinate = getNextCoordinate(coordinate, direction);
    } else {
      coordinate = nextCoordinate;
    }

    x[coordinate[1]] = replaceChar(x[coordinate[1]], 'X', coordinate[0]);
    set.add(`${coordinate[0]}-${coordinate[1]}`);
  }

  return [...set.keys()].length;
}

function replaceChar(input: string, newChar: string, index: number) {
  const leftPart = input.substring(0, index);
  const rightPart = input.substring(index + 1);
  return `${leftPart}${newChar}${rightPart}`
}

export type Coordinate = [number, number]; // [x, y]
export type Matrix = string[];
export type Direction = 'up' | 'right' | 'down' | 'left';

export function getGuardCoordinate(matrix: Matrix): Coordinate {
  for (let y = 0; y < matrix.length; y++) {
    const line = matrix[y];
    for (let x = 0; x < line.length; x++) {
      const row = line[x];
      if (row === '^') {
        return [x, y];
      }
    }
  }

  throw new Error(`Guard not found in matrix`);
}

export function addUpCoordinates(coordinate1: Coordinate, coordinate2: Coordinate): Coordinate {
  const newX = coordinate1[0] + coordinate2[0];
  const newY = coordinate1[1] + coordinate2[1];
  return [newX, newY];
}

export function getCellValueAt(coordinate: Coordinate, matrix: Matrix): string | null {
  if (!isCoordinateValid(coordinate, matrix)) {
    return null;
  }

  const x = coordinate[0];
  const y = coordinate[1];
  return matrix[y][x];
}

export function getNextCoordinate(coordinate: Coordinate, direction: Direction): Coordinate {
  let tmp: Coordinate;
  switch (direction) {
    case 'up':
      tmp = [0, -1];
      break;
    case 'right':
      tmp = [1, 0];
      break;
    case 'down':
      tmp = [0, 1];
      break;
    case 'left':
      tmp = [-1, 0];
      break;
    default:
      throw new Error(`Direction unsupported (${direction})`);
  }

  return addUpCoordinates(coordinate, tmp);
}

export function turnRight(direction: Direction): Direction {
  switch (direction) {
    case 'up':
      return 'right';
    case 'right':
      return 'down';
    case 'down':
      return 'left';
    case 'left':
      return 'up';
    default:
      throw new Error(`Direction unsupported (${direction})`);
  }
}

export function isCellObstacle(coordinate: Coordinate, matrix: Matrix): boolean {
  const value = getCellValueAt(coordinate, matrix);
  return (value === '#');
}

export function isCoordinateValid(coordinate: Coordinate, matrix: Matrix): boolean {
  const x = coordinate[0];
  const y = coordinate[1];
  if (x < 0 || y < 0) {
    return false;
  }

  if (y > matrix.length - 1) {
    return false;
  }

  if (x > matrix[0].length - 1) {
    return false;
  }

  return true;
}

export function solvePart2(lines: string[]) {
  return 0;
}
