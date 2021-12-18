import fs from 'fs';

function resolve() {
    let input: string = fs.readFileSync('day-17.input', 'utf-8')
    let coords: number[][] = input.substring(15, input.length).split(", y=")
        .map((v) => v.split("..").map((v) => parseInt(v)))
    console.log(coords)

    let highestPosition = 0
    for (let y = -coords[1][0] * 2; y > 0; y--) {
        for (let x = 1; x < coords[0][1]; x++) {
            let dY = y
            let dX = x
            let position = [0, 0]
            let localHP = 0
            while (position[0] <= coords[0][1] && position[1] >= coords[1][1]) {
                position[0] += dX
                position[1] += dY
                if (position[1] > localHP) {
                    localHP = position[1]
                }
                if (position[0] <= coords[0][1] && position[1] <= coords[1][1]
                    && position[0] >= coords[0][0] && position[1] >= coords[1][0]) {
                    if (localHP > highestPosition) {
                        highestPosition = localHP
                    }
                }
                dY--
                dX = Math.max((dX - 1), 0)
            }
        }
    }

    console.log(highestPosition)

}

resolve()


