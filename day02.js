#!/usr/bin/env node
// https://adventofcode.com/2022/day/2
const input = `A Y
B X
C Z`;

// Part 1 - Score tournament, given your plays
const score = {
    // rock = 1 point,  paper = 2 points, scissors = 3 points
    // win  = 6 points, draw  = 3 points, loss     = 0 points
    'A': { // they play rock
        'X': 1 + 3, // rock, draw
        'Y': 2 + 6, // paper, win
        'Z': 3 + 0  // scissors, loss
    },
    'B': { // they play paper
        'X': 1 + 0, // rock, loss
        'Y': 2 + 3, // paper, draw
        'Z': 3 + 6  // scissors, win
    },
    'C': { // they play scissors
        'X': 1 + 6, // rock, win
        'Y': 2 + 0, // paper, loss
        'Z': 3 + 3, // scissors, draw
    }
};

let sum = 0;
for (const line of input.split("\n")) {
    [them, us] = line.split(" ");
    sum += score[them][us];
}
console.log(sum);

// Part 2 - Score tournament, given desired results
const resultScore = {
    // rock = 1 point,  paper = 2 points, scissors = 3 points
    // win  = 6 points, draw  = 3 points, loss     = 0 points
    'A': { // they play rock
        'X': 3 + 0, // scissors, loss
        'Y': 1 + 3, // rock, draw
        'Z': 2 + 6  // paper, win
    },
    'B': { // they play paper
        'X': 1 + 0, // rock, loss
        'Y': 2 + 3, // paper, draw
        'Z': 3 + 6  // scissors, win
    },
    'C': { // they play scissors
        'X': 2 + 0, // paper, loss
        'Y': 3 + 3, // scissors, draw
        'Z': 1 + 6  // rock, win
    }
};

let resultSum = 0;
for (const line of input.split("\n")) {
    [them, result] = line.split(" ");
    resultSum += resultScore[them][result];
}
console.log(resultSum);
