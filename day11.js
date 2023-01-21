#!/usr/bin/env node
// https://adventofcode.com/2022/day/11
const input = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

// Part 1 - Predicting monkey actions
class Monkey {
    constructor(lines) {
        // Could also use regular expressions, obviously
        this.name = lines.shift().slice(0, -1);
        this.items = lines.shift().replace("Starting items: ", "") .split(", ").map(item => Number(item));
        // Don't use eval in production :)
        this.operation = eval("old => " + lines.shift().replace("Operation: new = ", ""));
        // Save divisor for leastCommonMultiple later
        this.divisor = Number(lines.shift().replace("Test: divisible by ", ""));
        const onTrue  = Number(lines.shift().replace("If true: throw to monkey ", ""));
        const onFalse = Number(lines.shift().replace("If false: throw to monkey ", ""));
        this.findTarget = item => 0 === item % this.divisor ? onTrue : onFalse;
        this.inspections = 0;
    }

    static limitWorrying = true;
    static leastCommonMultiple;

    throwItems(monkeys) {
        while (this.items.length) {
            let item = this.items.shift();
            item = this.operation(item);
            if (Monkey.limitWorrying) {
                item = Math.floor(item / 3);
            }
            if (Monkey.leastCommonMultiple) {
                item = item % Monkey.leastCommonMultiple;
            }
            monkeys[this.findTarget(item)].items.push(item);
            this.inspections++;
        }
    }
}
let monkeys = input.split("\n\n").map(block => new Monkey(block.split("\n").map(line => line.trim())));
for (let round = 1; round <= 20; round++) {
    monkeys.forEach(monkey => monkey.throwItems(monkeys));
}
let monkeyBusiness = () => monkeys
    .map(m => m.inspections)
    .sort((x, y) => y - x)
    .slice(0, 2)
    .reduce((x, y) => x * y);
console.log(monkeyBusiness());

// Part 2 - Predicting monkey actions with very large numbers
monkeys = input.split("\n\n").map(block => new Monkey(block.split("\n").map(line => line.trim())));
Monkey.limitWorrying = false;
const gcd = (x, y) => !y ? x : gcd(y, x % y);
const lcm = (x, y) => y / gcd(x, y) * x;
Monkey.leastCommonMultiple = monkeys.map(monkey => monkey.divisor).reduce(lcm, 1);
for (let round = 1; round <= 10000; round++) {
    monkeys.forEach(monkey => monkey.throwItems(monkeys));
}
console.log(monkeyBusiness());
