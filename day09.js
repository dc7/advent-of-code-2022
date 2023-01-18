#!/usr/bin/env node
// https://adventofcode.com/2022/day/9
const input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

// Part 1 - Points visited by dragging a short rope
let head = {'x': 0, 'y': 0};
let tail = {'x': 0, 'y': 0};
let visited = {0: {0: true}};
// We'll use Cartesian coordinates, so left & down will be negative x & y
function move(direction, head) {
    switch (direction) {
        case "U":
            head.y++;
            break;
        case "D":
            head.y--;
            break;
        case "L":
            head.x--;
            break;
        case "R":
            head.x++;
            break;
    }
}
function stretch(head, tail) {
    if (Math.max(Math.abs(head.x - tail.x), Math.abs(head.y - tail.y)) <= 1) {
        return; // not far enough to stretch
    }
    if (tail.y < head.y) { // stretch up, up + right, or up + left
        tail.y++;
        if (tail.x < head.x) {
            tail.x++;
        }
        else if (head.x < tail.x) {
            tail.x--;
        }
    }
    else if (head.y < tail.y) { // stretch down, down + right, or down + left
        tail.y--;
        if (tail.x < head.x) {
            tail.x++;
        }
        else if (head.x < tail.x) {
            tail.x--;
        }
    }
    else if (head.x < tail.x) { // stretch left
        tail.x--;
    }
    else if (tail.x < head.x) { // stretch right
        tail.x++;
    }
}
for (const line of input.split("\n")) {
    const [direction, amount] = line.split(" ");
    for (let i = 0; i < amount; i++) {
        move(direction, head);
        stretch(head, tail);
        (!visited[tail.x]) && (visited[tail.x] = {});
        visited[tail.x][tail.y] = true;
    }
}
let sum = 0;
for (const x in visited) {
    for (const y in visited[x]) {
        sum++;
    }
}
console.log(sum);

// Part 2 - Points visited by dragging a long rope
let rope = Array.from(Array(10), () => ({'x': 0, 'y': 0}));
visited = {0: {0: true}};
for (const line of input.split("\n")) {
    const [direction, amount] = line.split(" ");
    for (let i = 0; i < amount; i++) {
        move(direction, rope[0]);
        for (let knot = 0; knot + 1 < rope.length; knot++) {
            stretch(rope[knot], rope[knot + 1]);
        }
        const lastKnot = rope[rope.length - 1];
        (!visited[lastKnot.x]) && (visited[lastKnot.x] = {});
        visited[lastKnot.x][lastKnot.y] = true;
    }
}
sum = 0;
for (const x in visited) {
    for (const y in visited[x]) {
        sum++;
    }
}
console.log(sum);
