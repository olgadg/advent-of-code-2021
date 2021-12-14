import fs from 'fs';

interface IDictionay {
    [key: string]: string[]
}

interface Result {
    [pair: string]: number
}

function step0(start: string, insertions: IDictionay) {
    let result: string[] = []
    result.push(start[0])
    for (let i = 0; i < start.length; i++) {
        let pair = start.slice(i, i + 2)
        let match = insertions[pair]
        if (match) {
            //result.push(match.slice(1, 3))
        } else {
            result.push(pair.slice(1, 2))
        }
    }
    return result.join('')
}


function step(start: Result, insertions: IDictionay) {

    let result: Result = {}
    for (let key in start) {
        let newPairs = insertions[key];
        if (newPairs) {
            for (var newPair of newPairs) {
                result[newPair] = (result[newPair] || 0) + start[key]
            }
        } else {
            result[key] = (result[key] || 0) + start[key]
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

    let result: Result = {}
    let start: string = input[0]
    for (let i = 0; i < start.length - 1; i++) {
        let pair = start.slice(i, i + 2)
        result[pair] = (result[pair] || 0) + 1
    }
    console.log(start)
    console.log(result)
    let insertions: IDictionay = {}
    input[1].split('\n').forEach((line) => {
        let splitted = line.split(' -> ')
        let pairs = [...splitted[0]]
        insertions[splitted[0]] = [[pairs[0], splitted[1]].join(''), [splitted[1], pairs[1]].join('')]
    })
    for (let i = 0; i < 40; i++) {
        console.log(i)
        result = step(result, insertions)
    }

    let counts: Result = {}
    for (let key in result) {
        [...key].forEach((k) => counts[k] = (counts[k] || 0) + result[key] / 2)
    }
    let max = 0
    let min = Number.MAX_SAFE_INTEGER
    for (let key in counts) {
        if (max < counts[key]) {
            max = counts[key]
        }
        if (min > counts[key]) {
            min = counts[key]
        }
    }
    console.log(max, min)
    console.log(Math.round(max - min))
    //not 4332887448172
}

resolve()
