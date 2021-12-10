import fs from 'fs';
import { clearLine } from 'readline';


function getAdjacents(x: number, y: number, input: number[][]): number[] {
    let output: number[] = []
    if (x > 0) {
        output.push(input[x - 1][y])
    }
    if (y > 0) {
        output.push(input[x][y - 1])
    }
    if (x < input.length - 1) {
        output.push(input[x + 1][y])
    }
    if (y < input[x].length - 1) {
        output.push(input[x][y + 1])
    }
    return output
}

function isLowest(value: number, adjacents: number[]): boolean {
    return adjacents.filter((adj) => adj <= value).length == 0
}

function printMatrix(matrix: number[][]) {
    matrix.map((row) => console.log(JSON.stringify(row)))
    console.log("\n")
}

function resolve() {
    let input: number[][] = fs.readFileSync('day-9.input', 'utf-8')
        .split('\n').map((row) => Array.from(row).map((value) => parseInt(value)))

    printMatrix(input)

    let sum = 0

    for (let x = 0; x < input.length; x++) {
        for (let y = 0; y < input[x].length; y++) {
            if (isLowest(input[x][y], getAdjacents(x, y, input))) {
                sum += input[x][y] + 1
            }
        }
    }

    console.log(sum)
}

resolve()

