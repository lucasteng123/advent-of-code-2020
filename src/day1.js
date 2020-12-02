// Part 1
// ======

function part1(input) {
    const inputs = input.split('\n').map(x=>+x);
    for(let _in of inputs){
        for(let _in2 of inputs){
            if(_in == _in2) break;
            if(_in+_in2 == 2020) return _in*_in2;
        }
    }
    
}

// Part 2
// ======

function part2(input) {
    const inputs = input.split('\n').map(x=>+x);
    for(let _in of inputs){
        for(let _in2 of inputs){
            for(let _in3 of inputs){
                if(_in+_in2+_in3 == 2020) return _in*_in2*_in3;
            }
        }
    }
}

export { part1, part2 };
