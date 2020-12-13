// Part 1
import {parseInputIntoArray} from './aoc-helpers.js';

function part1(input) {
    input = parseInputIntoArray(input,'\n');
    input = input.map(row=>row.split(''));
    const seats = new GameOfSeats(input);

    let oldRun = [];

    //without making it a string compare, this while never ends. 
    while(JSON.stringify(oldRun) != JSON.stringify(seats.grid)){
        oldRun = JSON.parse(JSON.stringify(seats.grid));
        seats.iterate();
    }
    if(oldRun == seats.grid){
        console.log('same');
    }
    return seats.findAllOccupiedSeats();
    
}

class GameOfSeats{
    constructor(input){
        this.grid=[];
        for(let row of input){
            this.grid.push(row.map(pos=>pos));
        }
    }
    getAdjacent(row,col){
        return [
            this.getValue(row-1,col),
            this.getValue(row-1,col-1),
            this.getValue(row-1,col+1),

            this.getValue(row,col-1),
            this.getValue(row,col+1),

            this.getValue(row+1,col),
            this.getValue(row+1,col-1),
            this.getValue(row+1,col+1),
        ].filter(v=>v!=null);
    }
    getValue(row,col){
        try {
            return new GridSpace(this.grid[row][col]);
        } catch (e) {
            return null;
        }
    }
    processCell(row,col){
        let cell = this.getValue(row,col);
        if(!cell) return cell;
        if(cell.isFloor) return cell.toString();

        let adj = this.getAdjacent(row,col);
        let occupiedadj = adj.filter(c=>c.isOccupied).length;
        if(!cell.isOccupied && occupiedadj == 0){
            cell.isOccupied = true;
            return cell.toString();
        }
        if(cell.isOccupied && occupiedadj >= 4){
            cell.isOccupied = false;
            return cell.toString();
        }
        return cell.toString();
    }
    iterate(){
        //ew.
        let newGrid = JSON.parse(JSON.stringify(this.grid));
        for(let row in this.grid){
            for(let col in this.grid[row]){
                newGrid[row][col] = this.processCell(Number(row),Number(col));
            }
        }
        this.grid = newGrid;
    }
    prettyPrint(){
        let out = '';
        for(let row of this.grid){
            try{
                out += row.join('') + '\n';
            } catch (e) {
                console.log(e);
            }
        }
        console.log(out);
    }
    findAllOccupiedSeats(){
        let occupied = 0;
        for(let row of this.grid){
            occupied+= row.filter(c=>c=='#').length;
        }
        return occupied;
    }
}
function GridSpace(i){
    this.isFloor = i=='.';
    this.isOccupied = i=='#';
    this.toString=()=>{
        if(this.isFloor) return '.';
        if(this.isOccupied) return '#';
        return 'L';
    };
}

// Part 2
// ======

function part2(input) {
    return null;
}

export { part1, part2 };
