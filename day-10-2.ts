import fs from 'fs';


function isOpenBracket(char: string) {
    return char == '(' || char == '[' || char == '{' || char == '<';
}

function matches(openBracket: string, char: string): boolean {
    switch (char) {
        case ')': return openBracket == '('
        case ']': return openBracket == '['
        case '}': return openBracket == '{'
        case '>': return openBracket == '<'
    }
    return false
}

function getClosingBracket(openBracket: string) {
    switch (openBracket) {
        case '(': return ')'
        case '[': return ']'
        case '{': return '}'
        case '<': return '>'
    }
}

function parseLine(line: string) {
    let openBracket: string[] = []

    for (var char of line) {
        if (isOpenBracket(char)) {
            openBracket.push(char)
        } else if (matches(openBracket[openBracket.length - 1], char)) {
            openBracket.pop()
        } else {
            return char
        }
    }
}

function completeLine(line: string): string[] {
    let openBracket: string[] = []

    for (var char of line) {
        if (isOpenBracket(char)) {
            openBracket.push(char)
        } else if (matches(openBracket[openBracket.length - 1], char)) {
            openBracket.pop()
        }
    }
    let closingBrackets = []
    console.log(JSON.stringify(line))
    for (let i = openBracket.length - 1; i >= 0; i--) {
        closingBrackets.push(getClosingBracket(openBracket[i])!)
    }
    console.log(JSON.stringify(closingBrackets))
    return closingBrackets
}

function getPoints(char: string): number {
    switch (char) {
        case ')': return 1
        case ']': return 2
        case '}': return 3
        case '>': return 4
    }
    return 0
}

function getTotalPoints(line: string[]): number {
    let total = 0
    for (var char of line) {
        total = total * 5 + getPoints(char)
    }
    return total
}

function resolve() {
    let input: string[] = fs.readFileSync('day-10.input', 'utf-8')
        .split('\n')

    let results: number[] = []

    for (var line of input) {
        let firstError = parseLine(line)
        if (!firstError) {
            let closingBrackets = completeLine(line)!
            let points = getTotalPoints(closingBrackets)
            console.log(points)
            results.push(points)
        }
    }
    console.log(results.sort((a,b) => a-b)[Math.floor((results.length-1)/2)])
}

resolve()

