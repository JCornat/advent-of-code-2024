import { assertEquals, assertThrows } from '@std/assert';
import { getCellValueAt, getGuardCoordinate, getNextCoordinate, isCellObstacle, Matrix, solvePart1, solvePart2, turnRight } from './day-06.ts';
import { addUpCoordinates, Coordinate, isCoordinateValid } from './day-04.ts';

Deno.test('Solve Part 1 - getGuardCoordinate - valid', () => {
  const testValue = [
    '....#.....',
    '.........#',
    '..........',
    '..#.......',
    '.......#..',
    '..........',
    '.#..^.....',
    '........#.',
    '#.........',
    '......#...',
  ] satisfies Matrix;

  const res = getGuardCoordinate(testValue);
  assertEquals(res, [4, 6]);
});

Deno.test('Solve Part 1 - getGuardCoordinate - invalid', () => {
  const testValue = [
    '....#.....',
    '.........#',
    '..........',
  ] satisfies Matrix;

  const fn = () => getGuardCoordinate(testValue);
  assertThrows(fn, 'Guard not found in matrix');
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

Deno.test('Solve Part 1 - getCellValueAt', () => {
  const matrix = [
    '....#.....',
    '..........',
    '..........',
  ] satisfies Matrix;

  const coordinate1 = [4, 0] satisfies Coordinate;
  const res = getCellValueAt(coordinate1, matrix);
  assertEquals(res, '#');
});

Deno.test('Solve Part 1 - getCellValueAt - invalid', () => {
  const matrix = [
    '..........',
    '..........',
    '..........',
  ] satisfies Matrix;

  const coordinate1 = [-1, -1] satisfies Coordinate;
  const res = getCellValueAt(coordinate1, matrix);
  assertEquals(res, null);
});

Deno.test('Solve Part 1 - getNextCoordinate - up', () => {
  const coordinate1 = [0, 1] satisfies Coordinate;
  const res = getNextCoordinate(coordinate1, 'up');
  assertEquals(res, [0, 0]);
});

Deno.test('Solve Part 1 - getNextCoordinate - right', () => {
  const coordinate1 = [-1, 0] satisfies Coordinate;
  const res = getNextCoordinate(coordinate1, 'right');
  assertEquals(res, [0, 0]);
});

Deno.test('Solve Part 1 - getNextCoordinate - down', () => {
  const coordinate1 = [0, -1] satisfies Coordinate;
  const res = getNextCoordinate(coordinate1, 'down');
  assertEquals(res, [0, 0]);
});

Deno.test('Solve Part 1 - getNextCoordinate - left', () => {
  const coordinate1 = [1, 0] satisfies Coordinate;
  const res = getNextCoordinate(coordinate1, 'left');
  assertEquals(res, [0, 0]);
});

Deno.test('Solve Part 1 - getNextCoordinate - invalid', () => {
  const coordinate1 = [1, 0] satisfies Coordinate;
  const fn = () => getNextCoordinate(coordinate1, 'zzz' as any);
  assertThrows(fn, 'Direction unsupported (zzz)');
});

Deno.test('Solve Part 1 - turnRight - up', () => {
  const res = turnRight('up');
  assertEquals(res, 'right');
});

Deno.test('Solve Part 1 - turnRight - right', () => {
  const res = turnRight('right');
  assertEquals(res, 'down');
});

Deno.test('Solve Part 1 - turnRight - down', () => {
  const res = turnRight('down');
  assertEquals(res, 'left');
});

Deno.test('Solve Part 1 - turnRight - left', () => {
  const res = turnRight('left');
  assertEquals(res, 'up');
});

Deno.test('Solve Part 1 - turnRight - invalid', () => {
  const fn = () => turnRight('zzz' as any);
  assertThrows(fn, 'Direction unsupported (zzz)');
});

Deno.test('Solve Part 1 - isCellObstacle - obstacle', () => {
  const matrix = [
    '#.........',
    '..........',
    '..........',
  ] satisfies Matrix;

  const coordinate1 = [0, 0] satisfies Coordinate;
  const res = isCellObstacle(coordinate1, matrix);
  assertEquals(res, true);
});

Deno.test('Solve Part 1 - isCellObstacle - not obstacle', () => {
  const matrix = [
    '#.........',
    '..........',
    '..........',
  ] satisfies Matrix;

  const coordinate1 = [1, 0] satisfies Coordinate;
  const res = isCellObstacle(coordinate1, matrix);
  assertEquals(res, false);
});

Deno.test('Solve Part 1 - isCellObstacle - invalid', () => {
  const matrix = [
    '#.........',
    '..........',
    '..........',
  ] satisfies Matrix;

  const coordinate1 = [-1, -1] satisfies Coordinate;
  const res = isCellObstacle(coordinate1, matrix);
  assertEquals(res, false);
});

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
  ] satisfies Matrix;

  const coordinate = [-1, 0] satisfies Coordinate;
  const res = isCoordinateValid(coordinate, matrix);
  assertEquals(res, false);
});

Deno.test('Solve Part 1 - Coordinate invalid - Height negative', () => {
  const matrix = [
    '.',
  ] satisfies Matrix;

  const coordinate = [0, -1] satisfies Coordinate;
  const res = isCoordinateValid(coordinate, matrix);
  assertEquals(res, false);
});

Deno.test('Solve Part 1 - Coordinate invalid - Width & height negative', () => {
  const matrix = [
    '.',
  ] satisfies Matrix;

  const coordinate = [-14, -18] satisfies Coordinate;
  const res = isCoordinateValid(coordinate, matrix);
  assertEquals(res, false);
});

Deno.test('Solve Part 1 - Coordinate invalid - Height too large', () => {
  const matrix = [
    '.',
  ] satisfies Matrix;

  const coordinate = [0, 1] satisfies Coordinate;
  const res = isCoordinateValid(coordinate, matrix);
  assertEquals(res, false);
});

Deno.test('Solve Part 1 - Coordinate invalid - Width too large', () => {
  const matrix = [
    '.',
  ] satisfies Matrix;

  const coordinate = [1, 0] satisfies Coordinate;
  const res = isCoordinateValid(coordinate, matrix);
  assertEquals(res, false);
});

Deno.test('Solve Part 1 - Coordinate valid - multiple lines', () => {
  const matrix = [
    '..',
    '..',
  ] satisfies Matrix;

  const coordinate = [1, 1] satisfies Coordinate;
  const res = isCoordinateValid(coordinate, matrix);
  assertEquals(res, true);
});

Deno.test('Solve Part 1 - Basic', () => {
  const testValue = [
    '....#.....',
    '.........#',
    '..........',
    '..#.......',
    '.......#..',
    '..........',
    '.#..^.....',
    '........#.',
    '#.........',
    '......#...',
  ];

  const res = solvePart1(testValue);
  assertEquals(res, 41);
});
