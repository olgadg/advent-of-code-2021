import fs from 'fs';
import { clearLine } from 'readline';

interface Line {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

function parseLine(line: string): Line {
    let values: number[][] = line.split(" -> ")
        .map((half) => half.split(",").map((v) => parseInt(v)))
    return {
        x1: values[0][0],
        y1: values[0][1],
        x2: values[1][0],
        y2: values[1][1]
    } as Line

}

function getMax(line: Line): number {
    return Math.max(line.x1, line.x2, line.y1, line.y2)
}

function printMatrix(matrix: number[][]) {
    matrix.map((row) => console.log(JSON.stringify(row)))
    console.log("\n")
}

function createDiagram(lines: Line[]) : number[][]{
    let max = Math.max.apply(Math, lines.map((line) => getMax(line)))
    let diagram: number[][] = new Array(max)   
    for (let i = 0; i <= max; i++) {
        diagram[i] = new Array(max)
        for (let j = 0; j<= max; j++) {
            diagram[i][j] = 0
        }
    }
    return diagram
}

function resolve() {
    let input: string[] = fs.readFileSync('day-5.input', 'utf-8')
        .split('\n')
    let lines: Line[] = input.map((line) => parseLine(line))
    let verticalLines = lines.filter((line) => line.x1 == line.x2)
    let horizontalLines = lines.filter((line) => line.y1 == line.y2)
    let diagram: number[][] = createDiagram(lines)
    
    for (var line of verticalLines) {
        let minY = Math.min(line.y1, line.y2)
        let maxY = Math.max(line.y1, line.y2)
        for (let i = minY; i <= maxY; i++) {
            diagram[i][line.x1] += 1
        }
    }
    //printMatrix(diagram)

    for (var line of horizontalLines) {
        let minX = Math.min(line.x1, line.x2)
        let maxX = Math.max(line.x1, line.x2)
        for (let i = minX; i <= maxX; i++) {
            diagram[line.y1][i] += 1
        }
    }
    //printMatrix(diagram)

    let result = diagram
    .map((row) => row.filter((value) => value >= 2).length)
    .reduce((accumulator, value) => accumulator + value, 0)

    console.log(result)
    //not 4568
}

resolve()

