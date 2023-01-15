#!/usr/bin/env node
// https://adventofcode.com/2022/day/3
const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

// Part 1 - Find common items in first and second half of lines
// a = 1, b = 2, ... A = 27, B = 28, ...
const priority = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
let sum = 0;
for (const line of input.split("\n")) {
    const left = new Set(line.slice(0, line.length / 2));
    const right = new Set(line.slice(line.length / 2));
    for (const char of left) {
        if (right.has(char)) {
            sum += priority.indexOf(char);
            break;
        }
    }
}
console.log(sum);

// Part 2 - Find common items in sets of 3 lines
sum = 0;
let lines = input.split("\n");
while (lines.length) {
    const first = new Set(lines.shift());
    const second = new Set(lines.shift());
    const third = new Set(lines.shift());
    firstCommonItem:
    for (const char of first) {
        if (second.has(char) && third.has(char)) {
            sum += priority.indexOf(char);
            break firstCommonItem;
        }
    }
}
console.log(sum);
