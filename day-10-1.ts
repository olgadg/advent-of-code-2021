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

function getPoints(char: string): number {
    switch (char) {
        case ')': return 3
        case ']': return 57
        case '}': return 1197
        case '>': return 25137
    }
    return 0
}

function resolve() {
    let input: string[] = fs.readFileSync('day-10.input', 'utf-8')
        .split('\n')

    let result = 0

    for (var line of input) {
        let firstError = parseLine(line)
        console.log(firstError)
        if (firstError) {
            result += getPoints(firstError)
        }
    }
    console.log(result)
}

resolve()

