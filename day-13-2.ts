import fs from 'fs';

interface Folding {
    along: string,
    line: number
}
function printMatrix(matrix: string[][]) {
    matrix.map((row) => console.log(row.reduce((accumulator, value) => accumulator + value, "")))
    console.log("\n")
}

function parseMatrix(coords: number[][]) {
    let maxY: number = Math.max.apply(Math, coords.map((v) => v[0]))
    let maxX: number = Math.max.apply(Math, coords.map((v) => v[1]))
    let matrix: string[][] = []
    for (let x = 0; x <= maxX; x++) {
        matrix[x] = []
        for (let y = 0; y <= maxY; y++) {
            matrix[x].push('.')
        }
    }
    for (let i = 0; i < coords.length; i++) {
        matrix[coords[i][1]][coords[i][0]] = '#'
    }
    return matrix
}

function parseFolding(folding: string[]) {
    return folding.map((r) => {
        {
            let half = r.split('=')

            return {
                along: half[0][half[0].length - 1],
                line: parseInt(half[1])
            } as Folding
        }
    })
}

function fold(folding: Folding, matrix: string[][]) {
    console.log(folding)
    let sizeX = matrix[0].length
    let sizeY = matrix.length
    let diff = 1

    if (folding.along == "x") {
        diff = sizeX - folding.line * 2
        sizeX = Math.max(Math.abs(sizeX - folding.line), folding.line)
        console.log(matrix[0].length - folding.line, sizeX)
    } else if (folding.along == "y") {
        diff = Math.abs(sizeY - folding.line * 2)
        sizeY = Math.max(Math.abs(sizeY - folding.line), folding.line)
        console.log(sizeY)
    }
    let newMatrix: string[][] = []
    for (let y = 0; y < sizeY; y++) {
        newMatrix[y] = []
        for (let x = 0; x < sizeX; x++) {
            let value = matrix[y][x] == '#'
                || (folding.along == "x" && matrix[y][matrix[y].length - diff - x] == '#')
                || (folding.along == "y" && matrix[matrix.length - diff - y][x] == '#')
                ? '#' : '.'
            newMatrix[y].push(value)
        }
    }
    return newMatrix
}

function resolve() {
    let input: string[] = fs.readFileSync('day-13.input', 'utf-8')
        .split("\n\n")

    let coords: number[][] = input[0].split('\n').map((line) => line.split(',').map((n) => parseInt(n)))
    let matrix = parseMatrix(coords)
    let foldings: Folding[] = parseFolding(input[1].split('\n'))
    console.log(matrix.length, matrix[0].length)
    let result = matrix
    for (var folding of foldings) {
        result = fold(folding, result)
        printMatrix(result)
    }

    console.log(result.reduce((acc, v) => acc + v.filter((d) => d == '#').length, 0))
}

resolve()

