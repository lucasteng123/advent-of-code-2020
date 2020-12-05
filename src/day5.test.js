import * as day from './day5.js';
const testInput = 'FBFBBFFRLR\nBFFFBBFRRR\nFFFBBBFRRR\nBBFFBBFRLL';
test('1', () => {
    expect(day.part1(testInput)).toBe(820);
});
test('seat', () => {
    expect(day.parseSeat('BBFFBBFRLL').row).toBe(102);
    expect(day.parseSeat('BBFFBBFRLL').col).toBe(4);
    expect(day.parseSeat('BBFFBBFRLL').seatID).toBe(820);
});
test('2', () => {
    expect(day.part2(testInput)).toBe(null);
});


