// Part 1
// ======
import {parseInputIntoArray} from './aoc-helpers.js';

function part1(input,slope=[3,1]) {
    const i = parseInputIntoArray(input);
    const iex = i.map(ln => ln.split(''));
    const tob = new Toboggan(iex[0].length,slope);
    let trees = 0;
    while(tob.y<iex.length-1){
        tob.move();
        if(iex[tob.y][tob.x] == '#') {
            trees++;
        }
    }

    return trees;
}

function Toboggan(hillWidth,slope){
    this.x = 0;
    this.y = 0;
    this.width = hillWidth;
    this.move = ()=>{
        this.x+=slope[0];
        this.y+=slope[1];
        if(this.x > this.width-1) this.x-=this.width;
    };
}

// Part 2
// ======

function part2(input) {
    const slopes = [[1,1],[3,1],[5,1],[7,1],[1,2]];
    let trees = 1;
    for(const sl of slopes){
        trees *= part1(input,sl);
    }

    return trees;
}


export { part1, part2, Toboggan };
