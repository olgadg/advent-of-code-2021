import fs from 'fs';
import { clearLine } from 'readline';


function calculateFuel(input: number[], position: number): number {

    let result: number[] = []
    for (var i of input) {
        let diff = Math.abs(i-position)
        let fuel = Array.from({length: diff}, (_, i) => i + 1)
        .reduce((accumulator, value) => accumulator + value, 0)
        result.push(fuel)
    } 
    return result.reduce((accumulator, value) => accumulator + value, 0)
}

function resolve() {
    let input: number[] = fs.readFileSync('day-7.input', 'utf-8')
        .split('\n').map((line) => line.split(",").map((value) => parseInt(value)))[0]
    let max = Math.max.apply(Math, input)
    let min = Math.min.apply(Math, input)
    console.log(min, max)
    
    let result : number[] = []
    for(let i=min;i<max;i++) {
        result.push(calculateFuel(input, i))
    }

    console.log(result)
    let minFuel = Math.min.apply(Math, result)
    console.log(minFuel)
}

resolve()

