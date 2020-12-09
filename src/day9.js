// Part 1
// ======

import { parseInputIntoArray, strToNumArray } from './aoc-helpers.js';
import generatorics from 'generatorics';
import {sum} from 'mathjs';

function part1(input,preamble=25) {
    input = parseInputIntoArray(input);
    for(let i = preamble; i<input.length; i++){
        let pr = input.slice(i-preamble,i);
        let permutations = generatorics.permutation(pr,2);
        let foundSum = false;
        for(let p of permutations){
            if(Number(p[0])+Number(p[1]) == input[i]) foundSum = true;
        }
        if(!foundSum) return Number(input[i]);
        // let results = permutations.map(p=> p[0]+p[1] == input[i]);
        // if(results.includes(true)) return input[i];
    }
    return null;
    
}

// Part 2
// ======

function part2(input,preamble) {
    let erroredNumber = part1(input,preamble);
    input = parseInputIntoArray(input);
    input = strToNumArray(input);
    for(let i in input){
        for(let x = i; x<input.length; x++){
            if(x-i>1){
                let subarr = input.slice(i,x);
                if(sum(subarr) == erroredNumber) {
                    subarr.sort((a,b)=>a-b);
                    console.log(`found set: ${subarr}`);
                    return subarr[0]+subarr[subarr.length-1];
                }
                //if the sum is already over the errored number, we know it won't be possible
                if(sum(subarr)>erroredNumber) break;
            }
        }
    }
    return null;
}

export { part1, part2 };
