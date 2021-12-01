import fs from 'fs';

let input = fs.readFileSync('day-1.input', 'utf-8')
    .split('\n')
    .map(function (value) { return parseInt(value) });

let increaseCount: number = 0
let prev: number = input[0] +  input[1] + input[2]
for (let index = 3; index < input.length; index++) {
    let measurement = input[index] + input[index-1] + input[index-2]
    if (measurement > prev) {
        increaseCount = increaseCount + 1;
    }
    prev = measurement;
}
console.log(increaseCount);