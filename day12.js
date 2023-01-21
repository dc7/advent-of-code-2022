#!/usr/bin/env node
// https://adventofcode.com/2022/day/12
const input =
`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

// Part 1 - Navigating a heightmap
const grid = input.split("\n").map(row => row.split(""));
function elevation(value) {
    if ("S" === value) {
        return 0;
    }
    if ("E" === value) {
        return 25;
    }
    return "abcdefghijklmnopqrstuvwxyz".indexOf(value);
}
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    neighbors() {
        // Can't travel diagonally
        const result = new Array();
        if (0 <= this.x - 1) {
            result.push(new Point(this.x - 1, this.y));
        }
        if (this.x + 1 < grid[0].length) {
            result.push(new Point(this.x + 1, this.y));
        }
        if (0 <= this.y - 1) {
            result.push(new Point(this.x, this.y - 1));
        }
        if (this.y + 1 < grid.length) {
            result.push(new Point(this.x, this.y + 1));
        }
        return result;
    }
    canReach(other) {
        const thisElevation = elevation(grid[this.y][this.x]);
        const otherElevation = elevation(grid[other.y][other.x]);
        return otherElevation - thisElevation <= 1
    }
}
function findPath(start, end) {
    let paths = new Array(new Array(start));
    let visited = new Map();
    for (let x = 0; x < grid[0].length; x++) {
        visited[x] = new Map();
        for (let y = 0; y < grid.length; y++) {
            visited[x][y] = false;
        }
    }
    while (paths.length) {
        const path = paths.shift();
        const here = path[path.length - 1];
        for (const neighbor of here.neighbors()) {
            if (here.canReach(neighbor) && !visited[neighbor.x][neighbor.y]) {
                if (neighbor.x === end.x && neighbor.y === end.y) {
                    return path;
                }
                paths.push(path.concat(neighbor));
                visited[neighbor.x][neighbor.y] = true;
            }
        }
    }
    return Infinity;
}
const startY = grid.findIndex(row => -1 !== row.indexOf("S"));
const startX = grid[startY].indexOf("S");
const endY = grid.findIndex(row => -1 !== row.indexOf("E"));
const endX = grid[endY].indexOf("E");
console.log(findPath(new Point(startX, startY), new Point(endX, endY)).length);

// Part 2 - Navigating a heightmap from multiple start locations
let startLocations = new Array();
for (let x = 0; x < grid[0].length; x++) {
    for (let y = 0; y < grid.length; y++) {
        if ("a" === grid[y][x]) {
            startLocations.push(new Point(x, y));
        }
    }
}
const shortestPath = startLocations
    .map(start => findPath(start, new Point(endX, endY)))
    .map(path => path.length)
    .sort((x, y) => x - y)
    .at(0);
console.log(shortestPath);
