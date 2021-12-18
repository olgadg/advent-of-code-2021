import fs from 'fs';

function resolve() {
    let input: string = fs.readFileSync('day-17.input', 'utf-8')
    let coords: number[][] = input.substring(15, input.length).split(", y=")
        .map((v) => v.split("..").map((v) => parseInt(v)))
    console.log(coords)
    let allInitial: number[][] = []
    let maxY = 0
    for (let y = coords[1][0]; y <= -coords[1][0]; y++) {
        for (let x = 1; x <= coords[0][1]; x++) {
            let dY = y
            let dX = x
            let position = [0, 0]
            while (position[0] <= coords[0][1] && position[1] >= coords[1][0]) {
                position[0] += dX
                position[1] += dY

                if (position[0] <= coords[0][1] && position[1] <= coords[1][1]
                    && position[0] >= coords[0][0] && position[1] >= coords[1][0]) {
                    if (allInitial.filter((v) => v[0] == x && v[1] == y).length == 0) {
                        allInitial.push([x, y])
                    }
                    maxY = y
                }
                dY--
                dX = Math.max((dX - 1), 0)
            }
        }
    }

    console.log(allInitial.length)
}

resolve()


