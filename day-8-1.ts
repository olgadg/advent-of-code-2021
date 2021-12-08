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

function resolve() {
    let input: string[] = fs.readFileSync('day-8.input', 'utf-8')
        .split('\n')
    let entries: Entry[] = input.map((line) => parseEntry(line))

    let count = 0

    for (var entry of entries) {
        for (var digit of entry.output) {
            if (digit.length == 2 || digit.length == 3 || digit.length == 4 || digit.length == 7) {
                count++
            }
        }
    }

    console.log(Array.from(entries[0].input[0]))
    console.log(count)
}

resolve()

