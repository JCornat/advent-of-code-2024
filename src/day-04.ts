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

export type Coordinate = [number, number]; // [x, y]
export type CoordinateGroup = Coordinate[]; // [[x1, y1], [x2, y2], ...]

function getPossibleCoordinateGroupList(): CoordinateGroup[] {
  return [
    [[0, 0], [1, 0], [2, 0], [3, 0]], // Horizontally to the right
    [[0, 0], [-1, 0], [-2, 0], [-3, 0]], // Horizontally to the left
    [[0, 0], [0, 1], [0, 2], [0, 3]], // Vertically to the bottom
    [[0, 0], [0, -1], [0, -2], [0, -3]], // Vertically to the top
    [[0, 0], [1, -1], [2, -2], [3, -3]], // Diagonally to the right top
    [[0, 0], [-1, -1], [-2, -2], [-3, -3]], // Diagonally to the left top
    [[0, 0], [1, 1], [2, 2], [3, 3]], // Diagonally to the right bottom
    [[0, 0], [-1, 1], [-2, 2], [-3, 3]], // Diagonally to the left bottom
  ];
}

export function hasXmasWord(matrix: string[], currentCoordinate: Coordinate, givenCoordinateGroup: CoordinateGroup): boolean {
  const expectedWord = 'XMAS';
  for (let i = 0; i < expectedWord.length; i++) {
    const expectedLetter = expectedWord[i];
    const lookUpCoordinate = givenCoordinateGroup[i];
    const coordinate = addUpCoordinates(currentCoordinate, lookUpCoordinate);
    const letter = getCharacter(coordinate, matrix);
    if (letter === null) {
      return false;
    }

    if (letter !== expectedLetter) {
      return false;
    }
  }

  return true;
}

export function getCharacter(coordinate: Coordinate, matrix: string[]): string | null {
  if (!isCoordinateValid(coordinate, matrix)) {
    return null;
  }

  return matrix[coordinate[1]][coordinate[0]];
}

export function addUpCoordinates(coordinate1: Coordinate, coordinate2: Coordinate): Coordinate {
  const newX = coordinate1[0] + coordinate2[0];
  const newY = coordinate1[1] + coordinate2[1];
  return [newX, newY];
}

export function isCoordinateValid(coordinate: Coordinate, matrix: string[]): boolean {
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

export function solvePart1(matrix: string[]) {
  const coordinateGroupList = getPossibleCoordinateGroupList();

  return matrix.map((line, y) => {
    return [...line].map((_char, x) => {
      const currentCoordinate = [x, y] satisfies Coordinate;
      return coordinateGroupList.map((coordinateGroup) => hasXmasWord(matrix, currentCoordinate, coordinateGroup))
        .reduce((acc, value) => value ? acc + 1 : acc, 0);
    }).reduce((acc, value) => acc + value, 0);
  }).reduce((acc, value) => acc + value, 0);
}

export function hasXmasShape(matrix: string[], currentCoordinate: Coordinate): boolean {
  const letter = getCharacter(currentCoordinate, matrix);
  const expectedFirstLetter = 'A';
  if (letter !== expectedFirstLetter) {
    return false;
  }

  const xShapeCoordinateGroup = [[1, -1], [1, 1], [-1, -1], [-1, 1]] satisfies CoordinateGroup;
  const detectedLetters = [];
  for (const lookUpCoordinate of xShapeCoordinateGroup) {
    const coordinate = addUpCoordinates(currentCoordinate, lookUpCoordinate);
    const letter = getCharacter(coordinate, matrix);
    if (letter === null) {
      return false;
    }

    if (letter !== 'M' && letter !== 'S') {
      return false;
    }

    detectedLetters.push(letter);
  }

  const allowedCombinations = ['MMSS', 'SSMM', 'MSMS', 'SMSM'];
  const tmp = detectedLetters.join('');
  return allowedCombinations.includes(tmp);
}

export function solvePart2(matrix: string[]) {
  return matrix.map((line, y) => {
    return [...line].map((_char, x) => {
      const currentCoordinate = [x, y] satisfies Coordinate;
      return hasXmasShape(matrix, currentCoordinate);
    }).reduce((acc, value) => value ? acc + 1 : acc, 0);
  }).reduce((acc, value) => acc + value, 0);
}
