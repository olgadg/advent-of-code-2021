import fs from 'fs';


function sum(s1: string, s2: string): string {
    console.log("sum", s1, s2)
    return "[" + s1 + "," + s2 + "]"
}

function c1(s: string): number[] | undefined {

    let openCount = 0
    for (let i = 0; i < s.length; i++) {
        if (openCount > 4 && s[i].match(/(\d+)/)) {
            let match = getMatch(s.substr(i, s.length).match(/(\d+)/))!
            match[0] += i
            return match
        } else if (s[i] == '[') {
            openCount++
        } else if (s[i] == ']') {
            openCount--
        }
    }
    return undefined
}

function c2(s: string): number[] | undefined {
    let match = s.match(/(\d\d+)/)
    return getMatch(match)
}

function getRightMostNumber(s: string): number[] | undefined {
    let matches = Array.from(s.matchAll(/(\d+)/g))
    return getMatch(matches[matches.length - 1])
}

function getLeftMostNumber(s: string): number[] | undefined {
    let match = s.match(/(\d+)/)
    return getMatch(match)
}

function getMatch(match: RegExpMatchArray | null): number[] | undefined {
    if (match) {
        let index = match['index']
        return [index!, parseInt(match[0])]
    }
    return undefined
}

function reduce(s: string) {
    let c1Match = c1(s)
    let c2Match = c2(s)
    if (c1Match) {
        return explode(s, c1Match)
    } else if (c2Match) {
        return split(s, c2Match)
    }
    return null
}

function explode(s: string, match: number[]) {

    let nextIndex1 = (match[1] >= 10) ? match[0] + 2 : match[0] + 1
    let match2 = getLeftMostNumber(s.substr(nextIndex1 + 1, s.length))!
    let nextIndex2 = nextIndex1 + 1 + match2[0] + ((match2[1] >= 10) ? 2 : 1)

    let left = getRightMostNumber(s.substr(0, match[0] - 1))
    let right = getLeftMostNumber(s.substr(nextIndex2, s.length))

    let result = ""
    if (left) {
        let nextIndexL = left[0] + ((left[1] >= 10) ? 2 : 1)
        result += s.substring(0, left[0]) + (left[1] + match[1]) + s.substring(nextIndexL, match[0] - 1)
    } else {
        result += s.substring(0, match[0] - 1)
    }
    result += "0"
    if (right) {
        right[0] += nextIndex2
        let nextIndexR = right[0] + ((right[1] >= 10) ? 2 : 1)
        result += s.substring(nextIndex2 + 1, right[0]) + (right[1] + match2[1]) + s.substring(nextIndexR, s.length)
    } else {
        result += s.substring(nextIndex2 + 1, s.length)
    }

    return result
}

function split(s: string, match: number[]) {
    let nextIndex1 = (match[1] >= 10) ? match[0] + 2 : match[0] + 1

    let left = Math.floor(match[1] / 2)
    let right = Math.ceil(match[1] / 2)
    let result = s.substring(0, match[0]) + "[" + left + "," + right + "]" + s.substring(nextIndex1, s.length)

    return result
}

function magnitud(s: string): number {
    if (isNaN(parseInt(s))) {
        let pair = magnitudSplit(s)
        return 3 * magnitud(pair[0]) + 2 * magnitud(pair[1])
    } else {
        return parseInt(s)
    }
}

function magnitudSplit(s: string): string[] {
    let openCount = 0
    let index = -1
    for (let i = 0; i < s.length; i++) {
        if (openCount == 1 && s[i] == ',') {
            //console.log(i)
            index = i
            break
        } else if (s[i] == '[') {
            openCount++
        } else if (s[i] == ']') {
            openCount--
        }
    }
    let left = s.substring(1, index)
    let right = s.substring(index + 1, s.length - 1)
    return [left, right]
}

function resolve() {
    let input: string[] = fs.readFileSync('day-18.input', 'utf-8').split('\n')

    let result: string = input[0]
    for (let i = 1; i < input.length; i++) {
        result = sum(result, input[i])
        //console.log(i, result)
        let reduced: string | null = result
        while (reduced != null) {
            result = reduced
            reduced = reduce(result)
        }
    }
    console.log(magnitud(result))
}

resolve()