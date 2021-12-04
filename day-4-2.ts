import fs from 'fs';
import { clearLine } from 'readline';

interface Cell {
    n: number;
    marked: boolean;
}
interface Result {
    losingBoard: Cell[][];
    calledNumber: number;
}

function findBoard(numbers: number[], boards: Cell[][][]) {
    let winningBoards: Cell[][][] = []
    for (var value of numbers) {
        for (var board of boards) {
            for (var row of board) {
                for (var cell of row) {
                    if (cell.n == value) {
                        cell.marked = true
                    }
                }
                if (row.filter((cell) => !cell.marked).length == 0) {
                    if (!winningBoards.includes(board)) {
                        winningBoards.push(board)
                        if (winningBoards.length == boards.length) {
                            return { losingBoard: board, calledNumber: value } as Result
                        }
                    }
                }
            }
            for (var index in board) {
                let column: Cell[] = board.map((row) => row[index])
                if (column.filter((cell) => !cell.marked).length == 0) {
                    if (!winningBoards.includes(board)) {
                        winningBoards.push(board)
                        if (winningBoards.length == boards.length) {
                            return { losingBoard: board, calledNumber: value } as Result
                        }
                    }
                }
            }
        }
    }
    console.log("no winning board")
}

function toCellRow(row: String): Cell[] {
    return row.match(/.{1,3}/g)!.map((value) => {
        return { n: parseInt(value.replace(" ", "")), marked: false } as Cell
    })
}

function parseBoards(input: string[]): Cell[][][] {
    return input.map((value) => value.split("\n")
        .map((row) => toCellRow(row))
    )
}
function resolve() {
    let input: string[] = fs.readFileSync('day-4.input', 'utf-8')
        .split('\n\n')
    let numbers: number[] = input[0].split(",").map((value) => parseInt(value))
    let boards: Cell[][][] = parseBoards(input.slice(1, input.length))

    let result: Result = findBoard(numbers, boards)!
    let sum: number = result.losingBoard.map((row) =>
        row.filter((cell) => !cell.marked)
            .map((cell) => cell.n)
            .reduce((accumulator, value) => accumulator + value, 0)
    ).reduce((accumulator, value) => accumulator + value, 0)

    console.log(sum * result.calledNumber)
}

resolve()

