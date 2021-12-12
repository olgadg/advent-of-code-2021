import fs from 'fs';

function printMatrix(matrix: string[][]) {
    matrix.map((row) => console.log(JSON.stringify(row)))
    console.log("\n")
}

function getStartPath(input: string[][]): string[][] {
    let paths: string[][] = []
    for (var entry of input) {
        if (entry[0] == "start") {
            paths.push([entry[0], entry[1]])
        } else if (entry[1] == "start") {
            paths.push([entry[1], entry[0]])
        }
    }
    return paths
}

function contains(paths: string[][], path: string[]): boolean {
    return paths.filter((v) => isEqual(path, v)).length > 0
}

function isEqual(pathA: string[], pathB: string[]) {
    if (pathA.length != pathB.length) {
        return false
    }
    for (var i in pathA) {
        if (pathA[i] != pathB[i]) {
            return false
        }
    }
    return true
}

function canVisit(a: string, path: string[]) {
    if (a == "start") {
        return false
    }
    if (a.toLowerCase() != a) {
        return true
    }
    return path.filter((v) => v == a).length == 0
}

function resolve() {
    let input: string[][] = fs.readFileSync('day-12.input', 'utf-8')
        .split('\n').map((line) => line.split('-'))

    printMatrix(input)

    let toVisitPaths: string[][] = getStartPath(input)
    printMatrix(toVisitPaths)

    let finishedPaths: string[][] = []

    while (toVisitPaths.length > 0) {
        let path = toVisitPaths.pop()!
        for (var entry of input) {
            //console.log(entry)
            let newPaths: string[][] = []
            let newSegment
            if (entry[0] == path[path.length - 1]) {
                newSegment = entry[1]
            } else if (entry[1] == path[path.length - 1]) {
                newSegment = entry[0]
            }

            if (newSegment && canVisit(newSegment, path)) {
                //console.log(newSegment)
                let newPath: string[] = []
                path.forEach((v) => newPath.push(v))
                newPath.push(newSegment)
                if (newSegment == "end" && !contains(finishedPaths, newPath)) {
                    finishedPaths.push(newPath)
                    //console.log("finished")
                    //printMatrix(finishedPaths)

                } else if (!contains(toVisitPaths, newPath)) {
                    toVisitPaths.push(newPath)
                }
            }
            //console.log("new")
            //printMatrix(newPaths)
        }
        //console.log("toVisit")
        //printMatrix(toVisitPaths)
    }

    //let finishedPaths = paths.filter((path) => isFinished(path))
    printMatrix(finishedPaths)
    console.log(finishedPaths.length)
}

resolve()

