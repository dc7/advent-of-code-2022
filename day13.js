#!/usr/bin/env node
// https://adventofcode.com/2022/day/13
const input =
`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

// Part 1 - Checking packet order
function compare(left, right) {
    if (!Array.isArray(left) && !Array.isArray(right)) {
        return left - right;
    }
    else if (!Array.isArray(left) && Array.isArray(right)) {
        return compare([left], right);
    }
    else if (Array.isArray(left) && !Array.isArray(right)) {
        return compare(left, [right]);
    }
    else {
        if (!left.length && !right.length) {
            return 0;
        }
        if (!left.length) {
            return -1;
        }
        if (!right.length) {
            return 1;
        }
        const compareHead = compare(left[0], right[0]);
        return 0 !== compareHead ? compareHead : compare(left.slice(1), right.slice(1));
    }
}
let index = 1, sum = 0;
for (const pair of input.split("\n\n").map(pair => pair.split("\n"))) {
    const [left, right] = [JSON.parse(pair[0]), JSON.parse(pair[1])];
    if (compare(left, right) <= 0) {
        sum += index;
    }
    index++;
}
console.log(sum);

// Part 2 - Sorting packets
function isDivider(packet, number) {
    return Array.isArray(packet)    && 1 === packet.length
        && Array.isArray(packet[0]) && 1 === packet[0].length && number === packet[0][0];
}
const sortedPackets = input
    .replaceAll("\n\n", "\n")
    .split("\n")
    .map(line => JSON.parse(line))
    .concat([[[2]], [[6]]])
    .sort(compare);
const firstIndex  = sortedPackets.findIndex(array => isDivider(array, 2));
const secondIndex = sortedPackets.findIndex(array => isDivider(array, 6));
console.log((firstIndex + 1) * (secondIndex + 1));
