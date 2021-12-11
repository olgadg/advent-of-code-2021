import fs from 'fs';


interface Cell {
    x: number,
    y: number
}

interface Result {
    output: number[][]
    flashCount: number
}

declare global {
    interface Array<T> {
        cell(x: number, y: number): Cell
        adjacents(x: number, y: number): Cell[]
    }
}

Array.prototype.cell = function (x: number, y: number) {
    return { x: x, y: y } as Cell
}

Array.prototype.adjacents = function (x: number, y: number): Cell[] {
    let output: Cell[] = []
    if (x > 0) {
        output.push(this.cell(x - 1, y))
        if (y > 0) output.push(this.cell(x - 1, y - 1))
        if (y < this[x].length - 1) output.push(this.cell(x - 1, y + 1))

    }
    if (x < this.length - 1) {
        output.push(this.cell(x + 1, y))
        if (y > 0) output.push(this.cell(x + 1, y - 1))
        if (y < this[x].length - 1) output.push(this.cell(x + 1, y + 1))
    }
    if (y > 0) output.push(this.cell(x, y - 1))
    if (y < this[x].length - 1) output.push(this.cell(x, y + 1))

    return output
}

function contains(list: Cell[], cell: Cell) {
    return list.filter((v) => v.x == cell.x && v.y == cell.y).length > 0
}

function printMatrix(matrix: number[][]) {
    matrix.map((row) => console.log(JSON.stringify(row)))
    console.log("\n")
}

function step(result: Result) {
    for (let x = 0; x < result.output.length; x++) {
        for (let y = 0; y < result.output[x].length; y++) {
            result.output[x][y]++
        }
    }
    let flashed: Cell[] = []
    for (let x = 0; x < result.output.length; x++) {
        for (let y = 0; y < result.output[x].length; y++) {
            if (result.output[x][y] > 9) {
                result.flashCount += flash(x, y, result.output, flashed)
            }
        }
    }
    for (let x = 0; x < result.output.length; x++) {
        for (let y = 0; y < result.output[x].length; y++) {
            if (result.output[x][y] > 9) {
                result.output[x][y] = 0
            }
        }
    }

    printMatrix(result.output)

    return result
}

function flash(x: number, y: number, output: number[][], flashed: Cell[]): number {
    if (contains(flashed, output.cell(x, y))) {
        return 0
    }
    flashed.push(output.cell(x, y))
    let adjacents = output.adjacents(x, y)
    let flashCount = 1
    for (var cell of adjacents) {
        output[cell.x][cell.y]++
        if (output[cell.x][cell.y] > 9 && !contains(flashed, cell)) {
            flashCount += flash(cell.x, cell.y, output, flashed)
        }
    }
    return flashCount
}

function resolve() {
    let input: number[][] = fs.readFileSync('day-11.input', 'utf-8')
        .split('\n').map((row) => Array.from(row).map((value) => parseInt(value)))

    printMatrix(input)

    let result: Result = { output: input, flashCount: 0 }
    
    for (let i = 0; i < 100; i++) {
        console.log("step", i + 1)
        step(result)
        console.log(result.flashCount)
    }
    printMatrix(result.output)
    console.log(result.flashCount)
}

resolve()

