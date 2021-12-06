import fs from 'fs';
import { clearLine } from 'readline';

function nextDay(fishes: number[]) : number[]{

    let result = []
    for (let fish=1;fish<fishes.length;fish++) {
        result.push(fishes[fish])
    }
    result.push(fishes[0])
    result[6] += fishes[0]
    return result
}

function resolve() {
    let input: number[] = fs.readFileSync('day-6.input', 'utf-8')
        .split('\n').map((line) => line.split(",").map((value) => parseInt(value)))[0]

    let fishes: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (var value of input) {
        fishes[value]++
    }
    console.log(fishes)
    for (let i = 0; i < 256; i++) {
        fishes = nextDay(fishes)
        console.log(i)
        console.log(JSON.stringify(fishes))
    }
    let result = fishes.reduce((accumulator, value) => accumulator + value, 0)
       
    console.log(result)
}

resolve()

