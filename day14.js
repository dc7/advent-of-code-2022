#!/usr/bin/env node
// https://adventofcode.com/2022/day/14
const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

class Point {
    constructor(x, y) { 
        this.x = Number(x);
        this.y = Number(y);
    }
}

const sandSpawn = new Point(500, 0);
const paths = input
    .split("\n")
    .map(line => line
        .split(" -> ")
        .map(pair => pair.split(","))
        .map(([x, y]) => new Point(x, y)));
let maxY = paths
    .flatMap(path => path
        .map(point => point.y))
    .reduce((left, right) => Math.max(left, right));
let grid = undefined;

function drawLine(from, to) {
    if (from.y === to.y) { // horizontal
        for (let x = Math.min(from.x, to.x); x <= Math.max(from.x, to.x); x++) {
            grid[from.y][x] = '#';
        }
    }
    else { // vertical
        for (let y = Math.min(from.y, to.y); y <= Math.max(from.y, to.y); y++) {
            grid[y][from.x] = '#';
        }
    }
}

// Returns true if the sand grain moved, otherwise false
function move(sand) {
    if ("." === grid[sand.y + 1][sand.x]) { // straight down
        sand.y++;
        return true;
    }
    if ("." === grid[sand.y + 1][sand.x - 1]) { // down and left
        sand.x--;
        sand.y++
        return true;
    }
    if ("." === grid[sand.y + 1][sand.x + 1]) { // down and right
        sand.x++;
        sand.y++;
        return true;
    }
    return false;
}

function dropSand() {
    for (let sandGrains = 0; true; sandGrains++) {
        let sand = new Point(sandSpawn.x, sandSpawn.y);
        while (0 <= sand.x && sand.x < grid[0].length && sand.y <= maxY && move(sand)) {}
        grid[sand.y][sand.x] = "o";
        if (sand.x === sandSpawn.x && sand.y === sandSpawn.y) {
            return sandGrains + 1; // plus the final grain that blocked the spawn
        }
        if (sand.x < 0 || grid[0].length <= sand.x || maxY < sand.y) {
            return sandGrains; // final grain fell off grid, so don't count it
        }
    }
}

// Part 1 - Falling sand
grid = Array.from(Array(maxY + 3), () => Array(sandSpawn.x * 2).fill("."));
for (const path of paths) { // draw walls
    for (let i = 0; i + 1 < path.length; i++) {
        drawLine(path[i], path[i + 1]);
    }
}
console.log(dropSand());

// Part 2 - Falling sand with a floor
grid = grid.map(row => row.map(col => "o" === col ? "." : col)); // erase sand
maxY += 2;
drawLine(new Point(0, maxY), new Point(grid[0].length - 1, maxY)); // draw floor
console.log(dropSand());
