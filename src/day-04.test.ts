import { assertEquals } from '@std/assert';
import { addUpCoordinates, Coordinate, CoordinateGroup, getCharacter, hasXmasShape, hasXmasWord, isCoordinateValid, solvePart1, solvePart2 } from './day-04.ts';

Deno.test('Solve Part 1 - Coordinate Valid', () => {
  const matrix = [
    '.',
  ];

  const coordinate = [0, 0] satisfies Coordinate;
  const res = isCoordinateValid(coordinate, matrix);
  assertEquals(res, true);
});

Deno.test('Solve Part 1 - Coordinate invalid - Width negative', () => {
  const matrix = [
    '.',
  ];

  const coordinate = [-1, 0] satisfies Coordinate;
  const res = isCoordinateValid(coordinate, matrix);
  assertEquals(res, false);
});

Deno.test('Solve Part 1 - Coordinate invalid - Height negative', () => {
  const matrix = [
    '.',
  ];

  const coordinate = [0, -1] satisfies Coordinate;
  const res = isCoordinateValid(coordinate, matrix);
  assertEquals(res, false);
});

Deno.test('Solve Part 1 - Coordinate invalid - Width & height negative', () => {
  const matrix = [
    '.',
  ];

  const coordinate = [-14, -18] satisfies Coordinate;
  const res = isCoordinateValid(coordinate, matrix);
  assertEquals(res, false);
});

Deno.test('Solve Part 1 - Coordinate invalid - Height too large', () => {
  const matrix = [
    '.',
  ];

  const coordinate = [0, 1] satisfies Coordinate;
  const res = isCoordinateValid(coordinate, matrix);
  assertEquals(res, false);
});

Deno.test('Solve Part 1 - Coordinate invalid - Width too large', () => {
  const matrix = [
    '.',
  ];

  const coordinate = [1, 0] satisfies Coordinate;
  const res = isCoordinateValid(coordinate, matrix);
  assertEquals(res, false);
});

Deno.test('Solve Part 1 - Coordinate valid - multiple lines', () => {
  const matrix = [
    '..',
    '..',
  ];

  const coordinate = [1, 1] satisfies Coordinate;
  const res = isCoordinateValid(coordinate, matrix);
  assertEquals(res, true);
});

Deno.test('Solve Part 1 - addUpCoordinates', () => {
  const coordinate1 = [0, 0] satisfies Coordinate;
  const coordinate2 = [0, 0] satisfies Coordinate;
  const res = addUpCoordinates(coordinate1, coordinate2);
  assertEquals(res, [0, 0]);
});

Deno.test('Solve Part 1 - addUpCoordinates - positive', () => {
  const coordinate1 = [0, 1] satisfies Coordinate;
  const coordinate2 = [1, 0] satisfies Coordinate;
  const res = addUpCoordinates(coordinate1, coordinate2);
  assertEquals(res, [1, 1]);
});

Deno.test('Solve Part 1 - addUpCoordinates - negative', () => {
  const coordinate1 = [2, 3] satisfies Coordinate;
  const coordinate2 = [-5, -6] satisfies Coordinate;
  const res = addUpCoordinates(coordinate1, coordinate2);
  assertEquals(res, [-3, -3]);
});

Deno.test('Solve Part 1 - getCharacter - valid', () => {
  const matrix = [
    'AB',
    'CD',
  ];

  const coordinate = [1, 1] satisfies Coordinate;
  const res = getCharacter(coordinate, matrix);
  assertEquals(res, 'D');
});

Deno.test('Solve Part 1 - getCharacter - invalid', () => {
  const matrix = [
    'AB',
    'CD',
  ];

  const coordinate = [1, 2] satisfies Coordinate;
  const res = getCharacter(coordinate, matrix);
  assertEquals(res, null);
});

Deno.test('Solve Part 1 - hasXmasWord - valid', () => {
  const matrix = [
    'XMAS',
  ];

  const coordinate = [0, 0] satisfies Coordinate;
  const coordinateGroup = [[0, 0], [1, 0], [2, 0], [3, 0]] satisfies CoordinateGroup;
  const res = hasXmasWord(matrix, coordinate, coordinateGroup);
  assertEquals(res, true);
});

Deno.test('Solve Part 1 - hasXmasWord - coordinate invalid', () => {
  const matrix = [
    'XMAS',
  ];

  const coordinate = [1, 0] satisfies Coordinate;
  const coordinateGroup = [[0, 0], [1, 0], [2, 0], [3, 0]] satisfies CoordinateGroup;
  const res = hasXmasWord(matrix, coordinate, coordinateGroup);
  assertEquals(res, false);
});

Deno.test('Solve Part 1 - hasXmasWord - word invalid', () => {
  const matrix = [
    'XMAX',
  ];

  const coordinate = [0, 0] satisfies Coordinate;
  const coordinateGroup = [[0, 0], [1, 0], [2, 0], [3, 0]] satisfies CoordinateGroup;
  const res = hasXmasWord(matrix, coordinate, coordinateGroup);
  assertEquals(res, false);
});

Deno.test('Solve Part 1 - Simple', () => {
  const testValue = [
    '....XXMAS.',
    '.SAMXMS...',
    '...S..A...',
    '..A.A.MS.X',
    'XMASAMX.MM',
    'X.....XA.A',
    'S.S.S.S.SS',
    '.A.A.A.A.A',
    '..M.M.M.MM',
    '.X.X.XMASX',
  ];

  const res = solvePart1(testValue);
  assertEquals(res, 18);
});

Deno.test('Solve Part 2 - hasXmasShape - valid', () => {
  const matrix = [
    'M.S',
    '.A.',
    'M.S',
  ];

  const coordinate = [1, 1] satisfies Coordinate;
  const res = hasXmasShape(matrix, coordinate);
  assertEquals(res, true);
});

Deno.test('Solve Part 2 - hasXmasShape - invalid', () => {
  const matrix = [
    'M.S',
    '.A.',
    'S.M',
  ];

  const coordinate = [1, 1] satisfies Coordinate;
  const res = hasXmasShape(matrix, coordinate);
  assertEquals(res, false);
});

Deno.test('Solve Part 2 - hasXmasShape - test', () => {
  const matrix = [
    '.M.S......',
    '..A..MSMS.',
    '.M.S.MAA..',
    '..A.ASMSM.',
    '.M.S.M....',
    '..........',
    'S.S.S.S.S.',
    '.A.A.A.A..',
    'M.M.M.M.M.',
    '..........',
  ];

  const res = solvePart2(matrix);
  assertEquals(res, 9);
});
