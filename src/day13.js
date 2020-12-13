// Part 1
// ======

import { parseInputIntoArray } from './aoc-helpers.js';

function part1(input) {
    input = parseInputIntoArray(input,'\n');
    let departGoal = Number(input[0]);

    let busIDs = input[1].split(',');
    busIDs = busIDs.filter(x=>x!='x').map(x=>+x);

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
    input = parseInputIntoArray(input);
    input = input[1].split(',');
    let timestamp = 0;
    let i = 0;
    let acc = 1;
    while (i < input.length) {
        let _inp = input[i];
        if (_inp == 'x') i++;
        else {
            if ((timestamp + i) % _inp == 0) {
                acc *= _inp;
                i++;
            } else {
                timestamp += acc;
            }
        }
    }
    return timestamp;
}

export { part1, part2 };
