import fs from 'fs';

interface Command {
    direction: string;
    movement: number;
}

let input: Command[] = fs.readFileSync('day-2.input', 'utf-8')
    .split('\n')
    .map((value) => {
        let splittedCommand = value.split(" ")
        return {
            direction: splittedCommand[0],
            movement: parseInt(splittedCommand[1])
        } as Command
    });


let horizontal: number = 0
let depth: number = 0
let prev: number = Number.MAX_VALUE
for (var command of input) {
    switch (command.direction) {
        case "forward": horizontal = horizontal + command.movement; break; 
        case "down": depth = depth + command.movement;break; 
        case "up": depth = depth - command.movement;break; 
    }
}
console.log("horizontal ", horizontal, "depth ", depth, " total ", horizontal * depth);