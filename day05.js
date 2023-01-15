#!/usr/bin/env node
// https://adventofcode.com/2022/day/5
const input =
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

// Part 1 - Rearranging stacks, one block at a time
function initializeStacks(startingStacks) {
    let stacks = Array.from(Array(stackCount), () => new Array());
    for (const line of startingStacks) {
        for (let i = 0; i < stackCount; i++) {
            // First stack starts at column 1, then skip 4 characters per stack
            // Example: [Z] [M] [P]
            const char = line[1 + i * 4];
            char != ' ' && stacks[i].unshift(char);
        }
    }
    return stacks;
}

const startingStacks = input.split("\n\n")[0].split("\n");
const stackCount = startingStacks.pop().trim().split(/\s+/).length;
let stacks = initializeStacks(startingStacks);
for (const instruction of input.split("\n\n")[1].split("\n")) {
    const match = instruction.match(/move (\d+) from (\d+) to (\d+)/);
    const [amount, src, dest] = [Number(match[1]), Number(match[2]), Number(match[3])];
    for (let i = 0; i < amount; i++) {
        stacks[dest - 1].push(stacks[src - 1].pop());
    }
}
console.log(stacks.map(x => x.pop()).reduce((x, y) => x + y));

// Part 2 - Rearranging stacks, multiple blocks at a time
stacks = initializeStacks(startingStacks);
for (const instruction of input.split("\n\n")[1].split("\n")) {
    const match = instruction.match(/move (\d+) from (\d+) to (\d+)/);
    const [amount, src, dest] = [Number(match[1]), Number(match[2]), Number(match[3])];
    stacks[dest - 1].push(...stacks[src - 1].splice(-amount));
}
console.log(stacks.map(x => x.pop()).reduce((x, y) => x + y));
