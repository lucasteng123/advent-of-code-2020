import * as day from './day8.js';

const testInput = 
`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;
test('Part 1', () => {
    expect(day.part1(testInput)).toBe(5);
});
test('2', () => {
    expect(day.part2(testInput)).toBe(8);
});


