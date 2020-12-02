import * as day2 from './day2.js';

test('1', () => {
    expect(day2.part1('1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc')).toBe(2);
});
test('2', () => {
    expect(day2.part2('1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc')).toBe(1);
});