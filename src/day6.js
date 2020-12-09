// Part 1
// ======

import { parseInputIntoArray } from './aoc-helpers.js';

function part1(input) {
    let sm = 0;
    parseInputIntoArray(input,'\n\n').forEach(element => {
        let el = element.replaceAll('\n','');
        let lt = {};
        for(let letrs of el){
            lt[letrs]=true;
        }
        sm+=Object.keys(lt).length;
    });
    return sm;
    
}

// Part 2
// ======

function part2(input) {
    input = parseInputIntoArray(input, '\n\n');

    let counts = 0;
    for ( let group of input ) {
        let members = group.split('\n');
        let qs = {};
        let ev = [];
        for ( let member of members ) {
            member.split('').forEach(letter => qs[letter] = true);
        }
        for ( let letter in qs ) { let cont = false;
            for ( let member of members ) if ( ! member.includes(letter) ) {
                cont = true; break;
            }
            if ( ! cont ) ev.push(letter);
        }
        // counts += Object.keys(qs).length;
        counts += ev.length;
    }

    return counts;
}

export { part1, part2 };
