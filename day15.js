#!/usr/bin/env node
// https://adventofcode.com/2022/day/15
const input = `Sensor at x=2302110, y=2237242: closest beacon is at x=2348729, y=1239977
Sensor at x=47903, y=2473047: closest beacon is at x=-432198, y=2000000
Sensor at x=2363579, y=1547888: closest beacon is at x=2348729, y=1239977
Sensor at x=3619841, y=520506: closest beacon is at x=2348729, y=1239977
Sensor at x=3941908, y=3526118: closest beacon is at x=3772294, y=3485243
Sensor at x=3206, y=1564595: closest beacon is at x=-432198, y=2000000
Sensor at x=3123411, y=3392077: closest beacon is at x=2977835, y=3592946
Sensor at x=3279053, y=3984688: closest beacon is at x=2977835, y=3592946
Sensor at x=2968162, y=3938490: closest beacon is at x=2977835, y=3592946
Sensor at x=1772120, y=2862246: closest beacon is at x=2017966, y=3158243
Sensor at x=3283241, y=2619168: closest beacon is at x=3172577, y=2521434
Sensor at x=2471642, y=3890150: closest beacon is at x=2977835, y=3592946
Sensor at x=3163348, y=3743489: closest beacon is at x=2977835, y=3592946
Sensor at x=2933313, y=2919047: closest beacon is at x=3172577, y=2521434
Sensor at x=2780640, y=3629927: closest beacon is at x=2977835, y=3592946
Sensor at x=3986978, y=2079918: closest beacon is at x=3998497, y=2812428
Sensor at x=315464, y=370694: closest beacon is at x=-550536, y=260566
Sensor at x=3957316, y=3968366: closest beacon is at x=3772294, y=3485243
Sensor at x=2118533, y=1074658: closest beacon is at x=2348729, y=1239977
Sensor at x=3494855, y=3378533: closest beacon is at x=3772294, y=3485243
Sensor at x=2575727, y=210553: closest beacon is at x=2348729, y=1239977
Sensor at x=3999990, y=2813525: closest beacon is at x=3998497, y=2812428
Sensor at x=3658837, y=3026912: closest beacon is at x=3998497, y=2812428
Sensor at x=1551619, y=1701155: closest beacon is at x=2348729, y=1239977
Sensor at x=2625855, y=3330422: closest beacon is at x=2977835, y=3592946
Sensor at x=3476946, y=2445098: closest beacon is at x=3172577, y=2521434
Sensor at x=2915568, y=1714113: closest beacon is at x=2348729, y=1239977
Sensor at x=729668, y=3723377: closest beacon is at x=-997494, y=3617758
Sensor at x=3631681, y=3801747: closest beacon is at x=3772294, y=3485243
Sensor at x=2270816, y=3197807: closest beacon is at x=2017966, y=3158243
Sensor at x=3999999, y=2810929: closest beacon is at x=3998497, y=2812428
Sensor at x=3978805, y=3296024: closest beacon is at x=3772294, y=3485243
Sensor at x=1054910, y=811769: closest beacon is at x=2348729, y=1239977`;

// Part 1 - Find blocked locations in a row
class Sensor {
    constructor(sensorX, sensorY, beaconX, beaconY) {
        this.x = sensorX;
        this.y = sensorY;
        this.radius = manhattanDistance(sensorX, sensorY, beaconX, beaconY);
    }
    has(otherX, otherY) {
        return manhattanDistance(this.x, this.y, otherX, otherY) <= this.radius;
    }
}

class Beacon {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const manhattanDistance = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

let sensors = new Array();
let beacons = new Array();
for (const line of input.split("\n")) {
    const match = line.match(
        /Sensor at x=([-0-9]+), y=([-0-9]+): closest beacon is at x=([-0-9]+), y=([-0-9]+)/);
    const [sensorX, sensorY, beaconX, beaconY] =
        [Number(match[1]), Number(match[2]), Number(match[3]), Number(match[4])];
    sensors.push(new Sensor(sensorX, sensorY, beaconX, beaconY));
    beacons.push(new Beacon(beaconX, beaconY));
}

const y = 2000000;
let blocked = new Set();
for (const sensor of sensors) {
    const distance = Math.abs(y - sensor.y);
    const remainder = sensor.radius - distance;
    for (let x = sensor.x - remainder; x <= sensor.x + remainder; x++) {
        if (!beacons.find(b => x === b.x && y === b.y)) {
            blocked.add(x);
        }
    }
}
console.log(blocked.size);

// Part 2 - Find only possible beacon location
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

Sensor.prototype.perimeter = function*() {
    yield new Point(this.x - this.radius - 1, this.y);
    for (let x = this.x - this.radius; x <= this.x + this.radius; x++) {
        const deltaX = Math.abs(x - this.x);
        const remainder = this.radius - deltaX;
        yield new Point(x, this.y - remainder - 1);
        yield new Point(x, this.y + remainder + 1);
    }
    yield new Point(this.x + this.radius + 1, this.y);
}

function findBeacon() {
    for (const sensor of sensors) {
        for (const point of sensor.perimeter()) {
            if (0 <= point.x && point.x <= 4000000 && 0 <= point.y && point.y <= 4000000) {
                if (!sensors.find(s => s.has(point.x, point.y))) {
                    return point;
                }
            }
        }
    }
}
const frequency = (point) => point.x * 4000000 + point.y;
console.log(frequency(findBeacon()));
