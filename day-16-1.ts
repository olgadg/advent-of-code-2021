import fs from 'fs';

interface Packet {
    version: number,
    type: number,
    literal?: number,
    packets: Packet[]
}

interface Result {
    i: number,
    packet: Packet
}

function printPacket(padding: string = "", packet: Packet) {
    console.log(padding, "v", packet.version, "t", packet.type, "l", packet.literal)
    for (var p of packet.packets) {
        printPacket(padding + " ", p)
    }
}

function parseLiteral(j: number, binary: string) {
    let continuing: boolean = true
    let literalArray: string[] = []
    while (continuing) {
        literalArray.push(binary.substr(j + 1, 4))
        continuing = binary.substr(j, 1) == "1"
        j += 5
    }
    let literal = parseInt(literalArray.join(''), 2)
    return { j, literal }
}

function parsePacket(i: number, binary: string): Result {
    let version = parseInt(binary.substr(i, 3), 2)
    i += 3
    let type = parseInt(binary.substr(i, 3), 2)
    i += 3
    let pLiteral = null
    let packets = []
    if (type == 4) {
        let { j, literal } = parseLiteral(i, binary)
        i = j
        pLiteral = literal
    } else {
        if (binary.substr(i, 1) == "0") {
            let bitCount = parseInt(binary.substr(i + 1, 15), 2)
            i += 16
            let end = i + bitCount
            while (i < end) {
                let result = parsePacket(i, binary)
                i = result.i
                packets.push(result.packet)
            }
        } else {
            let numberOfPackets = parseInt(binary.substr(i + 1, 11), 2)
            i += 12
            for (let n = 0; n < numberOfPackets && binary.length > 0; n++) {
                let result = parsePacket(i, binary)
                i = result.i
                packets.push(result.packet)
            }
        }
    }
    let packet = { version: version, type: type, literal: pLiteral, packets: packets } as Packet
    return { i, packet } as Result
}


function sumVersions(p: Packet) {
    if (p.packets.length == 0) {
        return p.version
    } else {
        let version = p.version
        for (var p1 of p.packets) {
            version += sumVersions(p1)
        }
        return version
    }
}
function resolve() {
    let input: string = fs.readFileSync('day-16.input', 'utf-8')
    let binaryArray: string[] = []

    Array.from(input).forEach((c) => {
        let binary = parseInt(c, 16).toString(2)
        binaryArray.push("0000".substr(binary.length) + binary)
    })
    let binary: string = binaryArray.join('')
    console.log(binary)

    let result = parsePacket(0, binary)
    let packet = result.packet
    let i = result.i
    i = Math.ceil(i / 8) * 8

    printPacket("", packet)
    console.log(i, binary.length)
    let version = sumVersions(packet)
    console.log(version)

}

resolve()


