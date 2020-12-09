import EventEmitter from 'events';
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
export {CommandParser,EXIT_CODES};