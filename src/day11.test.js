import * as day from './day11.js';
import testData from './testData.js';

const testInput = testData[10];

test('Part 1', () => {
    expect(day.part1(testInput)).toBe(37);
});
test('2', () => {
    expect(day.part2(testInput)).toBe(null);
});