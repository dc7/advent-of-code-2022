#!/usr/bin/env node
// https://adventofcode.com/2022/day/8
const input = `30373
25512
65332
33549
35390`;

// Part 1 - Count visible trees
const trees = input
    .split("\n")
    .map(line => line.split(""))
    .map(line => line.map(tree => Number(tree)));
let sum = 0;
for (let y = 0; y < trees.length; y++) {
    for (let x = 0; x < trees.length; x++) {
        const tree = trees[y][x];
        const row = trees[y];
        const col = trees.flatMap(row => row[x]);
        const leftTrees = row.slice(0, x);
        const rightTrees = row.slice(x + 1);
        const topTrees = col.slice(0, y);
        const bottomTrees = col.slice(y + 1);
        const visible = [leftTrees, rightTrees, topTrees, bottomTrees]
            .map(list => list.filter(other => tree <= other))
            .map(list => list.length === 0)
            .reduce((x, y) => x || y);
        visible && sum++;
    }
}
console.log(sum);

// Part 2 - Find tree with most visible neighbors
function countVisible(trees, height) {
    if (!trees.length) {
        return 0;
    }
    let firstBlocker = trees.findIndex(blocker => height <= blocker);
    return -1 !== firstBlocker ? firstBlocker + 1 : trees.length;
}
let mostVisible = 0;
for (let y = 0; y < trees.length; y++) {
    for (let x = 0; x < trees.length; x++) {
        const tree = trees[y][x];
        const row = trees[y];
        const col = trees.flatMap(row => row[x]);
        const leftTrees = row.slice(0, x).reverse(); // closest trees first
        const rightTrees = row.slice(x + 1);
        const topTrees = col.slice(0, y).reverse();  // closest trees first
        const bottomTrees = col.slice(y + 1);
        const visible = [leftTrees, rightTrees, topTrees, bottomTrees]
            .map(list => countVisible(list, tree))
            .reduce((x, y) => x * y); // as defined, edge trees will score 0
        mostVisible = Math.max(visible, mostVisible);
    }
}
console.log(mostVisible);
