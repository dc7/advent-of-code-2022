#!/usr/bin/env node
// https://adventofcode.com/2022/day/1
const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

// Part 1 - Find sum of largest group
const max = input
    .split("\n\n")
    .map(block => block
        .split("\n")
        .map(x => Number(x))
        .reduce((x, y) => x + y))
    .reduce((x, y) => Math.max(x, y));
console.log(max);

// Part 2 - Find sum of top 3 groups
const topThree = input
    .split("\n\n")
    .map(block => block
        .split("\n")
        .map(x => Number(x))
        .reduce((x, y) => x + y))
    .sort()
    .slice(-3)
    .reduce((x, y) => x + y);
console.log(topThree);
