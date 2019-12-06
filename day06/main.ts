// https://github.com/agardes/AoC-2019/blob/master/day06.js
var fs = require('fs');
const filename = "c:\\temp\\input06.txt";

const data = fs.readFileSync(filename, 'utf-8').split('\n').map((el: string) => el.split(')'));
data.pop();

var count = 0;
var total = 0;
var steps = 0;

class Planet {
    name: string;
    parent: string;
    children: string[];
    orbits: number;
    constructor(name: string, parent: any) {
        this.name = name;
        this.parent = parent ? parent : null;
        this.children = new Array();
        this.orbits = 0;
    }
}

function findHierarchy(planet: any, list = new Array()): any {
    if (planet.parent == undefined) {
        return count
    } else {
        count++;
        list.push(planet.parent);
        return findHierarchy(planet.parent, list)
    }
}

var objects = data.map((el: string) => new Planet(el[1], el[0]))
objects.push(new Planet('COM', undefined));
objects.forEach((el: any) => (el.parent = objects.find((n: any) => n.name == el.parent)))
objects.forEach((el: any) => (el.children.push(objects.filter((n: any) => n.parent == el))))
objects.forEach((el: any) => {
    count = 0;
    el.orbits = findHierarchy(el)
    total += el.orbits
})

console.log('Pt 1: ' + total);

var you = objects.find((el: any) => el.name == 'YOU');
var san = objects.find((el: any) => el.name == 'SAN');
let listYou = new Array();
let listSan = new Array();
findHierarchy(you, listYou)
findHierarchy(san, listSan)
listSan = listSan.map(el => el.name)
listYou = listYou.map(el => el.name)
var crossingAt = listYou.filter(value => listSan.includes(value)).shift()
function rec(planet: any): any {
    if (planet.parent.name == crossingAt) {
        return steps;
    } else {
        steps++
        return rec(planet.parent)
    }
}
rec(you)
rec(san)

console.log('Pt 2: ' + steps)
