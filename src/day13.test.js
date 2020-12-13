import * as day from './day13.js';

const testInput = 
`939
7,13,x,x,59,x,31,19`;
test('Part 1', () => {
    expect(day.part1(testInput,5)).toBe(295);
});
test('2', () => {
    expect(day.part2(testInput,5)).toBe(1068781);
});


