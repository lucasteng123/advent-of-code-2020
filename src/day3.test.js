import * as day from './day3.js';
const testInput = '..##.......\n#...#...#..\n.#....#..#.\n..#.#...#.#\n.#...##..#.\n..#.##.....\n.#.#.#....#\n.#........#\n#.##...#...\n#...##....#\n.#..#...#.#';
test('1', () => {
    expect(day.part1(testInput)).toBe(7);
});
test('2', () => {
    expect(day.part2(1)).toBe(null);
});