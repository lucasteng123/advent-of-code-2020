import * as day from './day9.js';

const testInput = 
`35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;
test('Part 1', () => {
    expect(day.part1(testInput,5)).toBe(127);
});
test('2', () => {
    expect(day.part2(testInput,5)).toBe(62);
});


