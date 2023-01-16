#!/usr/bin/env node
// https://adventofcode.com/2022/day/6
const input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

// Part 1 - Find first 4 non-repeated chars
function findMarker(input, bufferSize) {
    let buffer = input.split("").slice(0, bufferSize - 1);
    for (let i = bufferSize - 1; i < input.length; i++) {
        buffer.push(input[i]);
        if ((new Set(buffer)).size === bufferSize) {
            return i + 1; // zero-indexed
        }
        buffer.shift();
    }
}
console.log(findMarker(input, 4));

// Part 2 - Find first 14 non-repeated chars
console.log(findMarker(input, 14));
