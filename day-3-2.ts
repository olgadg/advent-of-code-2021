import fs from 'fs';

function mostFrequentBit(entry: string): string {
    let oneCount = Array.from(entry).filter((bit) => bit == '1').length
    if (oneCount >= entry.length / 2) return '1'
    else return '0'
}

function leastFrequentBit(entry: string): string {
    let oneCount = Array.from(entry).filter((bit) => bit == '1').length
    if (oneCount >= entry.length / 2) return '0'
    else return '1'
}

function binaryNot(entry: string) {
    return Array.from(entry).map((bit) => {
        if (bit == '1') return '0'
        else return '1'
    }).join("")
}

let input = fs.readFileSync('day-3.input', 'utf-8')
    .split('\n').map((entry: string) => Array.from(entry))

let oxygen = input
let co2 = input
for (var index in input[0]) {
    let bitArray: string = oxygen.map((entry) => entry[index]).join("")
    let mostBit = mostFrequentBit(bitArray)
    if (oxygen.length > 1) {
        oxygen = oxygen.filter((entry) => entry[index] == mostBit)
    }
    let bitArray2: string = co2.map((entry) => entry[index]).join("")
    let leastBit: string = leastFrequentBit(bitArray2)
    if (co2.length > 1) {
        co2 = co2.filter((entry) => entry[index] == leastBit)
    }
}
let oxygenValue = parseInt(oxygen[0].join(""), 2)
let co2Value = parseInt(co2[0].join(""), 2)
console.log(oxygenValue * co2Value)