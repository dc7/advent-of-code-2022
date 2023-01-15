#!/usr/bin/env node
// https://adventofcode.com/2022/day/4
const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

// Part 1 - Find fully overlapping ranges
function fullOverlap(leftStart, leftEnd, rightStart, rightEnd) {
    // Case 1 - right range inside of left
    if (leftStart <= rightStart && rightEnd <= leftEnd) {
        return true;
    }

    // Case 2 - left range inside of right
    if (rightStart <= leftStart && leftEnd <= rightEnd) {
        return true;
    }

    return false;
}
let sum = 0;
for (const line of input.split("\n")) {
    const match = line.match(/(\d+)-(\d+),(\d+)-(\d+)/);
    const [leftStart, leftEnd, rightStart, rightEnd] =
        [Number(match[1]), Number(match[2]), Number(match[3]), Number(match[4])];
    if (fullOverlap(leftStart, leftEnd, rightStart, rightEnd)) {
        sum++;
    }
}
console.log(sum); // 599

// Part 2 - Find all overlapping ranges
function partialOverlap(leftStart, leftEnd, rightStart, rightEnd) {
    // Case 1 - right range starts inside left range
    if (leftStart <= rightStart && rightStart <= leftEnd) {
        return true;
    }

    // Case 2 - right range ends inside left range
    if (leftStart <= rightEnd && rightEnd <= leftEnd) {
        return true;
    }

    // Case 3 - left range starts inside right range
    if (rightStart <= leftStart && leftStart <= rightEnd) {
        return true;
    }

    // Case 4 - left range ends inside right range
    if (rightStart <= leftEnd && leftEnd <= rightEnd) {
        return true;
    }

    return false;
}
sum = 0;
for (const line of input.split("\n")) {
    const match = line.match(/(\d+)-(\d+),(\d+)-(\d+)/);
    const [leftStart, leftEnd, rightStart, rightEnd] =
        [Number(match[1]), Number(match[2]), Number(match[3]), Number(match[4])];
    if (partialOverlap(leftStart, leftEnd, rightStart, rightEnd)) {
        sum++;
    }
}
console.log(sum);
