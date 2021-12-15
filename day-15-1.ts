import fs from 'fs';

interface Path {
    p: number[],
    risk: number
}
interface PathDictionary {
    [key: string]: Path
}

function resolve1() {
    let input: string[] = fs.readFileSync('day-15.input', 'utf-8')
        .split("\n")
    let matrix: number[][] = fs.readFileSync('day-15.input', 'utf-8')
        .split("\n").map((line) => Array.from(line).map((c) => parseInt(c)))

    let maxX: number = input.length
    let maxY: number = input[0].length
    let openPaths: PathDictionary = {}

    openPaths["0-0"] = { p: [1], risk: 0 }

    for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
            console.log(x, y)
            if (x > 0 && openPaths["" + (x - 1) + "-" + y] != null) {

                let risk = openPaths["" + (x - 1) + "-" + y].risk + matrix[x][y]
                let current = openPaths["" + x + "-" + y]
                if (!current || risk < (current.risk || Number.MAX_VALUE)) {
                    let path = []
                    openPaths["" + (x - 1) + "-" + y].p.forEach((v) => path.push(v))
                    path.push(matrix[x][y])

                    openPaths["" + x + "-" + y] = { p: path, risk: risk }
                }
            }
            if (y > 0 && openPaths["" + x + "-" + (y - 1)] != null) {
                let risk = openPaths["" + x + "-" + (y - 1)].risk + matrix[x][y]
                let current = openPaths["" + x + "-" + y]
                if (!current || risk < (current.risk|| Number.MAX_VALUE)) {
                    let path = []
                    openPaths["" + x + "-" + (y - 1)].p.forEach((v) => path.push(v))
                    path.push(matrix[x][y])

                    openPaths["" + x + "-" + y] = { p: path, risk: risk }
                }
            }

        }
    }

    console.log(openPaths["" + (maxX - 1) + "-" + (maxY - 1)])

}

resolve1()


