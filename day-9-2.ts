import fs from 'fs';
import { clearLine } from 'readline';


interface Cell {
    x: number,
    y: number,
    value: number
}
function getAdjacents(x: number, y: number, input: number[][]): Cell[] {
    let output: Cell[] = []
    if (x > 0) {
        output.push({ x: x - 1, y: y, value: input[x - 1][y] } as Cell)
    }
    if (y > 0) {
        output.push({ x: x, y: y - 1, value: input[x][y - 1] } as Cell)
    }
    if (x < input.length - 1) {
        output.push({ x: x + 1, y: y, value: input[x + 1][y] } as Cell)
    }
    if (y < input[x].length - 1) {
        output.push({ x: x, y: y + 1, value: input[x][y + 1] } as Cell)
    }
    return output
}

function isLowest(value: number, adjacents: Cell[]): boolean {
    return adjacents.filter((adj) => adj.value <= value).length == 0
}

function getBasin(lowest: Cell, input: number[][]) {
    let visited: Cell[] = []
    let toVisit: Cell[] = []
    toVisit.push(lowest)

    while (toVisit.length > 0) {
        let visiting = toVisit.pop()!
        visited.push(visiting)
        let adjs = getAdjacents(visiting.x, visiting.y, input)
        for (var adj of adjs) {
            let isVisited = visited.filter((v) => v.x == adj.x && v.y == adj.y).length > 0
            let isToVisit = toVisit.filter((v) => v.x == adj.x && v.y == adj.y).length > 0
            let shouldVisit = adj.value != 9 && adj.value > visiting.value && !isVisited && !isToVisit
            if (shouldVisit) {
                toVisit.push(adj)
            }
        }
    }

    return visited.length
}

function printMatrix(matrix: number[][]) {
    matrix.map((row) => console.log(JSON.stringify(row)))
    console.log("\n")
}

function resolve() {
    let input: number[][] = fs.readFileSync('day-9.input', 'utf-8')
        .split('\n').map((row) => Array.from(row).map((value) => parseInt(value)))

    printMatrix(input)

    let basins: number[] = []

    let lowestPoints: Cell[] = []
    for (let x = 0; x < input.length; x++) {
        for (let y = 0; y < input[x].length; y++) {
            if (isLowest(input[x][y], getAdjacents(x, y, input))) {
                let lowest = { x: x, y: y, value: input[x][y] } as Cell
                basins.push(getBasin(lowest, input))
            }
        }
    }

    let threeLargest = basins.sort((a, b) => b - a).splice(0, 3)
    console.log(threeLargest)
    console.log(threeLargest.reduce((accumulator, value) => accumulator * value, 1))
    //not 438219
}

resolve()

