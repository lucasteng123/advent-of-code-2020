// Part 1
// ======
import {CommandParser} from './CommandParser.js';

function part1(input) {
    const parser = new CommandParser();
    // eslint-disable-next-line no-useless-escape
    input = [...input.matchAll(/([a-z]+) ((?:\+|\-)\d+)/g)];
    parser.replaceInstructions(input.map(instr => {return {op:instr[1], 'arg':instr[2]};}));
    while(!parser.runInstructions.includes(parser.instructionIndex)){
        parser.step();
    }
    return parser.accumulator;
}

// Part 2
// ======

function part2(input) {
    const parser = new CommandParser();
    input = [...input.matchAll(/([a-z]+) ((?:\+|\-)\d+)/g)];
    parser.replaceInstructions(input.map(instr => {return {op:instr[1], 'arg':instr[2]};}));
    parser.stopOnReRun = true;
    const jmpidxs = getAllIndexes(parser.instructionQueue,i=>i.op == 'jmp');
    const nopidxs = getAllIndexes(parser.instructionQueue,i=>i.op == 'nop');
    // parser.on('terminated',ret => console.log(`Terminated: ${JSON.stringify(ret)}`));
    for(let repid of jmpidxs){
        parser.replaceInstructions(input.map(instr => {return {op:instr[1], 'arg':instr[2]};}));
        parser.reset();
        parser.instructionQueue[repid].op = 'nop';
        if(parser.run()) return parser.accumulator;
    }
    for(let repid of nopidxs){
        parser.replaceInstructions(input.map(instr => {return {op:instr[1], 'arg':instr[2]};}));
        parser.reset();
        parser.instructionQueue[repid].op = 'jmp';
        if(parser.run()) return parser.accumulator;
    }
    return null;
}



function getAllIndexes(arr, func) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (func(arr[i]))
            indexes.push(i);
    return indexes;
}
export { part1, part2 };
