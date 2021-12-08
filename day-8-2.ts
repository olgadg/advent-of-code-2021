import fs from 'fs';
import { clearLine } from 'readline';

interface Entry {
    input: string[]
    output: string[]
}

function parseEntry(line: string): Entry {
    let values: string[][] = line.split(" | ")
        .map((half) => half.split(" "))
    return {
        input: values[0],
        output: values[1]
    } as Entry

}

function getDigits(entry: Entry): string[] {
    let digits = ["", "", "", "", "", "", "", "", "", ""]
    let sixes: string[] = [] // 0, 6, 9
    let fives: string[] = [] // 2, 3 5
    for (var digit of entry.input) {
        switch (digit.length) {
            case 2: digits[1] = digit; break;
            case 3: digits[7] = digit; break;
            case 5: fives.push(digit); break;
            case 4: digits[4] = digit; break;
            case 6: sixes.push(digit); break;
            case 7: digits[8] = digit; break;
        }
    }

    digits[6] = sixes.find((digit) => !containsAll(digit, digits[1]))!
    digits[9] = sixes.find((digit) => containsAll(digit, digits[4]))!
    digits[0] = sixes.find((digit) => digit != digits[6] && digit != digits[9])!

    digits[3] = fives.find((digit) => containsAll(digit, digits[1]))!
    digits[5] = fives.find((digit) => digit != digits[3] && containsAll(digits[6], digit))!
    digits[2] = fives.find((digit) => digit != digits[3] && digit != digits[5])!
    //printDigits(digits)
    return digits
}

function printDigits(matrix: string[]) {
    matrix.map((row, index) => console.log(index, JSON.stringify(row)))
    console.log("\n")
}

function containsAll(a: string, b: string): boolean {
    return Array.from(a).filter((v) => Array.from(b).includes(v)).length == b.length
}

function resolve() {
    let input: string[] = fs.readFileSync('day-8.input', 'utf-8')
        .split('\n')
    let entries: Entry[] = input.map((line) => parseEntry(line))

    let output: number[] = []
    for (var entry of entries) {
        let digits = getDigits(entry)
        let out = ""
        for (var outDigit of entry.output) {
            let index = digits.findIndex((digit) => digit.length == outDigit.length && containsAll(digit, outDigit))
            out += index
        }
        console.log(out)
        output.push(parseInt(out))
    }

    let total = output.reduce((accumulator, value) => accumulator + value, 0)
    console.log(total)
}

resolve()

