import aocLoader from 'aoc-loader';
import dotenv from 'dotenv';
dotenv.config();

const TEST_DAY = process.argv[2];

if (!TEST_DAY) {
    throw new Error(
        'Please supply a day to test using the format `npm start {day}`'
    );
}

import('./src/day' + TEST_DAY + '.js')
    .then(day => {
        aocLoader(2020, TEST_DAY, process.env.AOC_SESSION).then((data) => {
            console.log(`Part 1: ${day.part1(data)}\n`);
            console.log(`Part 2: ${day.part2(data)}\n`);
        });
    });


