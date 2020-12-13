// Part 1
// ======

import { parseInputIntoArray } from './aoc-helpers.js';

function part1(input) {
    input = parseInputIntoArray(input,'\n');
    let departGoal = Number(input[0]);

    let busIDs = input[1].split(',');
    busIDs = busIDs.filter(x=>x!='x').map(x=>+x);

    console.log(busIDs);

    let nextDepartureDelta = 1000;
    let fastestBusID = null;

    for(const bus of busIDs){
        let nextDepartTime = (Math.ceil(departGoal/bus)*bus);
        if(nextDepartTime-departGoal < nextDepartureDelta){
            fastestBusID = bus;
            nextDepartureDelta = nextDepartTime-departGoal;
        }
    }

    return nextDepartureDelta*fastestBusID;
    
}

// Part 2
// ======

function part2(input) {
    return null;
}

export { part1, part2 };
