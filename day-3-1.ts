import fs from 'fs';

function mostFrequentBit(entry: string) {
    let oneCount = Array.from(entry).filter((bit) => bit == '1').length
    if (oneCount >= entry.length / 2) return '1'
    else return '0'
}

function binaryNot(entry: string) {
    return Array.from(entry).map((bit) => {
        if (bit == '1') return '0'
        else return '1'
    }).join("")
}

let input = fs.readFileSync('day-3.input', 'utf-8')
    .split('\n').map((entry: string) => Array.from(entry))

let gammaValues: Array<string> = []
let epsilonValues: Array<string> = []
for (var index in input[0]) {
    let bitArray: string = input.map((entry) => entry[index]).join("")
    gammaValues[index] = mostFrequentBit(bitArray)
    epsilonValues[index] = binaryNot(gammaValues[index])
}

let gamma = parseInt(gammaValues.join(""), 2)
let epsilon = parseInt(epsilonValues.join(""), 2)
console.log(gamma, epsilon, gamma * epsilon)