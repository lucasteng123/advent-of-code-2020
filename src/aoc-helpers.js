function strToNumArray(i) {
    return i.map(x=>Number(x));
}
function parseInputIntoArray(i,s) {
    return i.split(s);
}

function between(x,min,max){
    return x>=min && x<=max;
}

export {strToNumArray,parseInputIntoArray,between};