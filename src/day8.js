// Part 1
// ======
import EventEmitter from 'events';

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

class CommandParser extends EventEmitter {
    constructor(){
        super();
        this.instructionQueue = [];
        this.accumulator = 0;
        this.instructionIndex = 0;
        this.runInstructions = [];
        this.kill = false;
        this.stopOnReRun = false;
    }
    run(){
        while(this.instructionIndex < this.instructionQueue.length && !this.kill){
            if(this.stopOnReRun && this.runInstructions.includes(this.instructionIndex)){
                this.emit('terminated',{code:EXIT_CODES.infiniteLoop});
                return false;
            }
            this.step();
        }
        this.emit('terminated',{code:EXIT_CODES.ok,accumulator:this.accumulator});
        return true;
    }
    reset(){
        this.accumulator = 0;
        this.runInstructions = [];
        this.instructionIndex = 0;
    }
    stop(){
        console.log(`stopping: acc ${this.accumulator}`);
        this.emit('terminated',{code:EXIT_CODES.stopped,accumulator:this.accumulator});
        this.kill = true;
    }
    step(){
        this.runInstructions.push(this.instructionIndex);
        let result = this.instructionQueue[this.instructionIndex].execute(this.accumulator,this.instructionIndex);
        this.instructionIndex = result.instructionIndex;
        this.accumulator = result.accumulator;
    }
    pushInstruction(op,arg,...oth){
        this.instructionQueue.push(new Operation(op,arg,...oth));
    }
    replaceInstructions(instructions){
        this.instructionQueue = instructions.map(instr => new Operation(instr.op,instr.arg));
    }
}
const EXIT_CODES = {
    ok:'ok',
    stopped:'stop',
    error:'error',
    infiniteLoop:'inf'
};
function Operation(op,arg){
    this.op = op;
    this.arg = arg;
    this.execute = (acc,instrIdx) => {
        switch(this.op){
        case 'acc':
            return {
                accumulator:acc+Number(arg),
                instructionIndex:instrIdx+1
            };
        case 'jmp':
            return {
                accumulator:acc,
                instructionIndex:instrIdx+Number(arg)
            };
        case 'nop':
            return {
                accumulator:acc,
                instructionIndex:instrIdx+1
            };
        }
    };
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
    parser.on('terminated',ret => console.log(`Terminated: ${JSON.stringify(ret)}`));
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
