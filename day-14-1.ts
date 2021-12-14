import fs from 'fs';

interface Insertion {
    pair: string,
    insert: string
}

function parseInsertion(line: string): Insertion {
    let splitted = line.split(' -> ')
    return {
        pair: splitted[0],
        insert: splitted[1]
    } as Insertion
}

function allMatches(start: string, insertions: Insertion[]) {
    let toInsert: Insertion[] = []
    for (var insertion of insertions) {
        for (let i = 0; i < start.length; i++) {
            if (start.slice(i, i + 2) == insertion.pair) {
                toInsert[i] = insertion
            }
        }
    }
    return toInsert
}

function step(start: string, insertions: Insertion[]) {
    let toInsert = allMatches(start, insertions)
    let result = start
    let keys: number[] = toInsert.map((v, i) => i).sort((a, b) => b - a)
    for (var key of keys) {
        if (toInsert[key]) {
            let i = key + 1
            result = [result.slice(0, i), toInsert[key].insert, result.slice(i)].join('')
        }
    }
    return result
}

interface Pair {
    letter: string,
    count: number
}

function resolve() {
    let input: string[] = fs.readFileSync('day-14.input', 'utf-8')
        .split("\n\n")
    let start: string = input[0]
    let insertions: Insertion[] = input[1].split('\n').map((line) => parseInsertion(line))

    let result = start
    for (let i = 0; i < 10; i++) {
        result = step(result, insertions)
        console.log(result)
    }
    console.log(result.length)

    let pairs: Pair[] = []
    Array.from(result).forEach((v) => {
        let found = pairs.find((p) => p.letter == v)
        if (found) {
            found.count++
        } else {
            pairs.push({ letter: v, count: 1 } as Pair)
        }
    }
    )
    let counts = pairs.map((p) => p.count)
    let max = Math.max.apply(Math, counts)
    let min = Math.min.apply(Math, counts)
    console.log(max - min)
}

resolve()
