// Part 1
// ======
import {between} from './aoc-helpers.js';


function part1(input) {
    const i = input.split('\n\n');
    const ids = i.map(id=>new Id(id,false));
    const validIds = ids.filter(id=>id.isValid());
    return validIds.length;
}

class Id {
    constructor(inputText,validate){
        const solve = [...inputText.matchAll(/([a-z]+):(\S+)/g)];
        this.byr=null;
        this.iyr=null;
        this.eyr=null;
        this.hgt=null;
        this.hcl=null;
        this.ecl=null;
        this.pid=null;
        this.cid=null;
        this.validate=validate;
        solve.forEach(slv => {
            this[slv[1]]=slv[2];
        });
    }
    isValid() {
        for(const el in this){
            if(typeof this[el] == 'function') break;
            if(el=='cid') break;
            if(this[el]===null) return false;
            if(!validity[el](this[el])&&this.validate){
                return false;
            } 
        }
        return true;
    }
}

const validity={
    byr:(i)=> between(Number(i),1920,2002) && String(i).length == 4,
    iyr:(i)=> between(Number(i),2010,2020) && String(i).length == 4,
    eyr:(i)=> between(Number(i),2020,2030) && String(i).length == 4,
    hgt:(i)=> {
        const input = i.match(/(\d+)(cm|in)/);
        if(!input) return false;
        switch (input[2]) {
        case 'in':
            return between(Number(input[1]),59,76);
        case 'cm':
            return between(Number(input[1]),150,193);
        default:
            return false;
        }
    },
    hcl:(i) => Boolean(i.match(/#[a-f0-9]{6}/)),
    ecl:(i)=> Boolean(i.match(/amb|blu|brn|gry|grn|hzl|oth/)),
    pid:(i)=> Boolean(i.match(/\d{9}/))
};

// Part 2
// ======

function part2(input) {
    const i = input.split('\n\n');
    const ids = i.map(id=>new Id(id,true));
    const validIds = ids.filter(id=>id.isValid());
    return validIds.length;
}

export { part1, part2};
