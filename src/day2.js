// Part 1
// ======

function part1(input) {
    const passwords = input.split('\n');
    let validPasswords = [];
    for(let pass of passwords) {
        const sections = pass.split(' ');
        const validRange = sections[0].split('-').map(x=>+x);
        const letter = sections[1].slice(0,sections[1].length-1);
        const p = sections[2];
        let r = new RegExp(letter,'gi');
        let results = [];
        while(r.exec(p)){
            results.push(r.lastIndex);
        }
        if(results.length >= validRange[0] && results.length <= validRange[1]) validPasswords.push(p);
    }
    return validPasswords.length;
}

// Part 2
// ======

function part2(input) {
    const passwords = input.split('\n');
    let validPasswords = [];
    for(let pass of passwords) {
        const sections = pass.split(' ');
        const validRange = sections[0].split('-').map(x=>+x);
        const letter = sections[1].slice(0,sections[1].length-1);
        const p = sections[2];
        let r = new RegExp(letter,'gi');
        let results = [];
        while(r.exec(p)){
            results.push(r.lastIndex);
        }
        //sorry
        if(results.includes(validRange[0]) != results.includes(validRange[1])) validPasswords.push(p);
    }
    return validPasswords.length;
}

export { part1, part2 };
