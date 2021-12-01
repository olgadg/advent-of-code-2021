import fs from 'fs';

let input = fs.readFileSync('day-1.input', 'utf-8').split('\n');

let increaseCount: number = 0
let prev: number = Number.MAX_VALUE
for (var entry of input) {
    let number = parseInt(entry)
    if (number > prev) {
        increaseCount = increaseCount + 1;
    }
    prev = number;
}
console.log(increaseCount);