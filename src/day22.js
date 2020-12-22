// Part 1
// ======

import { parseInputIntoArray } from './aoc-helpers.js';

function part1(input) {
    input = parseInputIntoArray(input,'\n\n').map(hand=>hand.split('\n'));
    let hands = input.map(hand => hand.slice(1));
    

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
    return winnings;
}

// Part 2
// ======

const P1 = 'player1';
const P2 = 'player2';

let totalGamesPlayed = 0;

function playGameRecursively(hand1=[], hand2=[], depth=0){
    totalGamesPlayed++;

    let played = {};
    while(hand1.length && hand2.length){

        let combinedHands = hand1.join('')+hand2.join('');

        if(played[combinedHands]){
            if(depth == 0){
                return calcWinnings(hand1);
            } else {
                return P1;
            }
        }

        played[combinedHands] = true;

        const pull1 = hand1.shift();
        const pull2 = hand2.shift();

        if(pull1 <= hand1.length && pull2 <= hand2.length){
        //It's time to get recursive my guy 🔄
            let subGameResult = playGameRecursively(hand1.slice(0,pull1),hand2.slice(0,pull2),depth+1);
            if(subGameResult === P1) {
                hand1.push(pull1,pull2);
            } else if(subGameResult === P2) {
                hand2.push(pull2,pull1);
            }
        } else if(pull1 > pull2) {
            hand1.push(pull1, pull2);
        } else if(pull1 < pull2) {
            hand2.push(pull2,pull1);
        }
    }
    
    if(depth === 0){
        console.log(`Played ${totalGamesPlayed} games and finally,`);
        return calcWinnings(hand1.length!=0 ? hand1 : hand2);
    } else {
        return hand1.length ? P1 : P2;
    }
}


function part2(input) {
    input = parseInputIntoArray(input,'\n\n').map(hand=>hand.split('\n'));
    let hands = input.map(hand => hand.slice(1));
    //make it into numbers
    hands[0]=hands[0].map(x=>Number(x));
    hands[1]=hands[1].map(x=>Number(x));
    
    return playGameRecursively(...hands);
}

export { part1, part2 };
