#!/usr/bin/env node
// https://adventofcode.com/2022/day/10
const input = "noop\nnoop\naddx 5\naddx 1\naddx 10\naddx -4\nnoop\naddx -1\nnoop\naddx 5\naddx -5\naddx 9\naddx 2\naddx -15\naddx 18\naddx 8\naddx -2\nnoop\naddx -18\naddx 21\naddx 1\naddx -37\naddx 27\naddx -24\naddx 2\naddx 5\naddx -7\naddx 26\naddx -16\naddx 2\naddx 5\naddx -15\nnoop\naddx 20\naddx 2\naddx 4\naddx -3\naddx 2\nnoop\naddx 3\naddx 2\naddx 5\naddx -40\naddx 2\naddx 33\naddx -30\naddx 5\naddx 5\naddx 17\naddx -19\naddx 2\naddx 5\naddx 20\naddx -16\naddx 3\naddx -2\naddx 7\nnoop\naddx -2\naddx 5\naddx 2\naddx 3\naddx -2\naddx -38\naddx 5\naddx 2\naddx 1\naddx 15\naddx -8\nnoop\naddx -2\naddx 4\naddx 2\naddx 4\naddx -2\nnoop\naddx 6\naddx 2\naddx -1\naddx 4\nnoop\naddx 1\naddx 4\nnoop\nnoop\nnoop\naddx -37\naddx 5\naddx 2\naddx 22\naddx -17\naddx -2\nnoop\naddx 3\naddx 2\nnoop\naddx 3\naddx 2\nnoop\nnoop\nnoop\naddx 5\naddx 5\naddx 2\naddx 3\nnoop\naddx 2\naddx -23\naddx 2\naddx -14\nnoop\naddx 29\naddx -26\nnoop\naddx 8\nnoop\nnoop\nnoop\naddx -9\naddx 11\naddx 5\naddx 2\nnoop\naddx 1\nnoop\nnoop\naddx 5\nnoop\nnoop\naddx 2\nnoop\naddx 3\naddx 2\naddx -2\nnoop\nnoop\nnoop";

// Part 1 - Delayed addition
let x = 1, sum = 0, cycle = 1, instructions = input.split("\n");
const observations = new Set([20, 60, 100, 140, 180, 220]);
while (instructions.length) {
    const [instruction, value] = instructions.shift().split(" ");
    if (observations.has(cycle)) {
        sum += cycle * x;
    }
    if ("addx" === instruction) {
        instructions.unshift("finishAddx " + value);
    }
    else if ("finishAddx" === instruction) {
        x += Number(value);
    }
    cycle++;
}
console.log(sum);

// Part 2 - Drawing pixels
x = 1, cycle = 1, instructions = input.split("\n");
let pixels = new Array();
while (instructions.length) {
    const [instruction, value] = instructions.shift().split(" ");
    const pixelPosition = (cycle % 40) - 1;
    if (new Set([x - 1, x, x + 1]).has(pixelPosition)) {
        pixels.push("#");
    }
    else {
        pixels.push(".");
    }
    if ("addx" === instruction) {
        instructions.unshift("finishAddx " + value);
    }
    else if ("finishAddx" === instruction) {
        x += Number(value);
    }
    cycle++;
}
for (let i = 0; i < 6; i++) {
    console.log(pixels.slice(i * 40, (i + 1) * 40).join(""));
}
