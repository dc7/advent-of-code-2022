#!/usr/bin/env node
// https://adventofcode.com/2022/day/7
const input =
`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

// Part 1 - Find sum of directories below threshold
class Directory {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.children = new Array();
    }

    get size() {
        return this.children.map(x => x.size).reduce((x, y) => x + y, 0);
    }

    flatten() {
        return [this, ...this.children.flatMap(x => x.flatten())];
    }
}

class File {
    constructor(name, size) {
        this.name = name;
        this.size = Number(size);
    }

    flatten() {
        return [this];
    }
}

let tree = new Directory("/");
let pointer = tree;
let lines = input.split("\n");
while (lines.length) {
    const [prompt, command, argument] = lines.shift().split(" ");
    if ("cd" === command) {
        if ("/" === argument) {
            pointer = tree;
        }
        else if (".." === argument) {
            pointer = pointer.parent;
        }
        else {
            if (!pointer.children.find(x => argument === x.name)) {
                pointer.children.push(new Directory(argument, pointer));
            }
            pointer = pointer.children.find(x => argument === x.name);
        }
    }
    else if ("ls" === command) {
        while (lines.length && "$" !== lines[0][0]) {
            const [size, name] = lines.shift().split(" ");
            if ("dir" === size) {
                if (!pointer.children.find(x => name === x.name)) {
                    pointer.children.push(new Directory(name, pointer));
                }
            }
            else {
                if (!pointer.children.find(x => name === x.name)) {
                    pointer.children.push(new File(name, size));
                }
            }
        }
    }
}

const smallDirectorySum = tree
    .flatten()
    .filter(x => "Directory" === x.constructor.name)
    .map(x => x.size)
    .filter(x => x <= 100000)
    .reduce((x, y) => x + y);
console.log(smallDirectorySum);

// Part 2 - Find smallest directory above threshold
const [totalSpace, updateSize] = [70000000, 30000000]
const sizeNeeded = updateSize - (totalSpace - tree.size);
const deletionCandidates = tree
    .flatten()
    .filter(x => "Directory" === x.constructor.name)
    .filter(x => sizeNeeded <= x.size)
    .sort((x, y) => x.size - y.size);
console.log(deletionCandidates[0].size);
