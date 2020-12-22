// Part 1
// ======

import { parseInputIntoArray } from "./aoc-helpers.js";

function part1(input) {
    input = parseInputIntoArray(input,'\n\n').map(hand=>hand.split('\n'));
    let hands = input.map(hand => hand.slice(1))
    

    while (hands[0].length != 0 && hands[1].length != 0){
        let pull1 = Number(hands[0].shift());
        let pull2 = Number(hands[1].shift());

        if(pull1 > pull2) hands[0].push(pull1,pull2);
        else hands[1].push(pull2,pull1);
    }
    return calcWinnings(hands[0].length!=0 ? hands[0] : hands[1]);
    
}

function calcWinnings(hand) {
    let winnings = 0;
    for(let card in hand) {
        const mult = hand.length - card;
        winnings += hand[card]*mult;
    }
    return winnings
}

// Part 2
// ======

function part2(input) {
    return null;
}

export { part1, part2 };
