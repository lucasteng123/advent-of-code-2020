function strToNumArray(i) {
    return i.map(x=>Number(x));
}
function parseInputIntoArray(i) {
    return i.split('\n');
}

export {strToNumArray,parseInputIntoArray};