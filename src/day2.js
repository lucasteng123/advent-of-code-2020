// Part 1
// ======

function part1(input) {
    const passwords = parseInput(input);
    let validPasswords = [];
    for(let pass of passwords) {
        let results = parsePassword(pass.password,pass.letter);
        if(results.length >= pass.range[0] && results.length <= pass.range[1]) validPasswords.push(pass.password);
    }
    return validPasswords.length;
}

function parseInput(input){
    const passwords = input.split('\n');
    return passwords.map(pass => {
        const sec = pass.split(' ');
        return {
            password: sec[2],
            range: sec[0].split('-').map(x=>+x),
            letter: sec[1].slice(0,sec[1].length-1)
        }
    });
}

function parsePassword(pass,letter){
    let r = new RegExp(letter,'gi');
    let results = [];
    while(r.exec(pass)){
        results.push(r.lastIndex);
    }
    return results;
}

// Part 2
// ======

function part2(input) {
    const passwords = parseInput(input);
    let validPasswords = [];
    for(let pass of passwords) {
        const results = parsePassword(pass.password,pass.letter);
        //sorry
        if(results.includes(pass.range[0]) != results.includes(pass.range[1])) validPasswords.push(pass.password);
    }
    return validPasswords.length;
}

export { part1, part2 };
