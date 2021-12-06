import fs from 'fs';
import { clearLine } from 'readline';


function nextDay(input: number[]): number[] {

    let result: number[] = []
    let newFishes: number[] = []
    for (var fish of input) {
        if (fish == 0) {
            result.push(6)
            newFishes.push(8)
        } else {
            result.push(fish -1)
        }

    }
    return result.concat(newFishes)
}

function resolve() {
    let input: number[] = fs.readFileSync('day-6.input', 'utf-8')
        .split('\n').map((line) => line.split(",").map((value) => parseInt(value)))[0]

    let result : number[] = input
    for(let i=0;i<18;i++) {
        result = nextDay(result)
    }
    //console.log(result)
    console.log(result.length)
}

resolve()

