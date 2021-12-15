import fs from 'fs';

interface PathDictionary {
    [key: string]: number
}



function printMatrix(matrix: number[][]) {
    matrix.map((row) => console.log(JSON.stringify(row)))
    console.log("\n")
}

function resolve() {
    let input: number[][] = fs.readFileSync('day-15.input', 'utf-8')
        .split("\n").map((line) => Array.from(line).map((c) => parseInt(c)))

    let matrix: number[][] = []
    for (let x = 0; x < 5; x++) {
        input.forEach((row) => {
            let newRow: number[] = []
            for (let y = 0; y < 5; y++) {
                row.forEach((v) => {
                    let nextV = (v + x + y) % 10
                    if ((v + x + y) / 10 >= 1) {
                        nextV++
                    }
                    newRow.push(nextV)
                }
                )
            }
            matrix.push(newRow)
        })
    }

    printMatrix(matrix)


    let maxX: number = matrix.length
    let maxY: number = matrix[0].length
    let openPaths: PathDictionary = {}

    openPaths["0-0"] = 0


    let prev: number = Number.MAX_VALUE
    for (let i = 0; i < maxX * maxY; i++) {
        for (let x = 0; x < maxX; x++) {
            for (let y = 0; y < maxY; y++) {
                //console.log(x, y)
                let prev = openPaths["" + x + "-" + y]
                if (openPaths["" + (x - 1) + "-" + y] != null) {
                    let risk = openPaths["" + (x - 1) + "-" + y] + matrix[x][y]
                    let current = openPaths["" + x + "-" + y]
                    if (!current || risk < current) {
                        openPaths["" + x + "-" + y] = risk
                    }
                }
                if (openPaths["" + x + "-" + (y - 1)] != null) {
                    let risk = openPaths["" + x + "-" + (y - 1)] + matrix[x][y]
                    let current = openPaths["" + x + "-" + y]
                    if (!current || risk < current) {
                        openPaths["" + x + "-" + y] = risk
                    }
                }

                if (x < maxX - 1 && openPaths["" + (x + 1) + "-" + y] != null) {
                    let risk = openPaths["" + (x + 1) + "-" + y] + matrix[x][y]
                    let current = openPaths["" + x + "-" + y]
                    if (!current || risk < current) {
                        openPaths["" + x + "-" + y] = risk
                    }
                }
                if (y < maxY - 1 && openPaths["" + x + "-" + (y + 1)] != null) {
                    let risk = openPaths["" + x + "-" + (y + 1)] + matrix[x][y]
                    let current = openPaths["" + x + "-" + y]
                    if (!current || risk < current) {
                        openPaths["" + x + "-" + y] = risk
                    }
                }

            }
        }
        console.log(i, openPaths["" + (maxX - 1) + "-" + (maxY - 1)])
        if (prev <= openPaths["" + (maxX - 1) + "-" + (maxY - 1)]) {
            console.log("break")
            break;
        }
        prev = openPaths["" + (maxX - 1) + "-" + (maxY - 1)]
    }

    console.log("final", openPaths["" + (maxX - 1) + "-" + (maxY - 1)])
    // not 2822

}

resolve()


