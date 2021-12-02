import fs from 'fs';

interface Command {
    direction: string;
    value: number;
}

let input: Command[] = fs.readFileSync('day-2.input', 'utf-8')
    .split('\n')
    .map((entry) => {
        let splittedCommand = entry.split(" ")
        return {
            direction: splittedCommand[0],
            value: parseInt(splittedCommand[1])
        } as Command
    });


let horizontal: number = 0
let depth: number = 0
let aim: number = 0
let prev: number = Number.MAX_VALUE
for (var command of input) {
    switch (command.direction) {
        case "forward": {
            horizontal += command.value;
            depth = depth + aim * command.value;
            break;
        }
        case "down": {
            aim += command.value;
            break;
        }
        case "up": {
            aim -= command.value;
            break;
        }
    }
}
console.log("horizontal ", horizontal, "depth ", depth, " total ", horizontal * depth);