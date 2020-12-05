// Part 1
// ======

import { parseInputIntoArray } from './aoc-helpers.js';

function part1(input) {
    const i = parseInputIntoArray(input);
    let largestSeat = 0;
    for(const seat of i){
        let sid = parseSeat(seat).seatID;
        if(sid>largestSeat) largestSeat = sid;
    }
    return largestSeat;
    
}
function parseSeat(seat){ 
    const bits = seat.split('').map((bit) => /F|L/.test(bit) ? 0 : 1).join('');
    const row = parseInt(bits.slice(0, 7), 2);
    const col = parseInt(bits.slice(7), 2);
    let seatID = (row*8)+col;
    return {row,col,seatID};
}

// Part 2
// ======W

function part2(input) {
    const i = parseInputIntoArray(input);
    let seatIDs = [];
    for(const seat of i){
        seatIDs.push(parseSeat(seat).seatID);
    }
    seatIDs.sort((a,b)=>a-b);
    console.log(seatIDs);
    for (let idx in seatIDs){
        console.log(`${seatIDs[idx]}:${seatIDs[Number(idx)+1]}:${seatIDs[idx]-seatIDs[Number(idx)+1]}`);
        if(seatIDs[Number(idx)+1]-seatIDs[Number(idx)] == 2) return seatIDs[idx]+1;
    }
}

export { part1, part2, parseSeat };
