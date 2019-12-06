"use strict";
// https://github.com/agardes/AoC-2019/blob/master/day06.js
var fs = require('fs');
var filename = "c:\\temp\\input06.txt";
var data = fs.readFileSync(filename, 'utf-8').split('\n').map(function (el) { return el.split(')'); });
data.pop();
var count = 0;
var total = 0;
var steps = 0;
var Planet = /** @class */ (function () {
    function Planet(name, parent) {
        this.name = name;
        this.parent = parent ? parent : null;
        this.children = new Array();
        this.orbits = 0;
    }
    return Planet;
}());
function findHierarchy(planet, list) {
    if (list === void 0) { list = new Array(); }
    if (planet.parent == undefined) {
        return count;
    }
    else {
        count++;
        list.push(planet.parent);
        return findHierarchy(planet.parent, list);
    }
}
var objects = data.map(function (el) { return new Planet(el[1], el[0]); });
objects.push(new Planet('COM', undefined));
objects.forEach(function (el) { return (el.parent = objects.find(function (n) { return n.name == el.parent; })); });
objects.forEach(function (el) { return (el.children.push(objects.filter(function (n) { return n.parent == el; }))); });
objects.forEach(function (el) {
    count = 0;
    el.orbits = findHierarchy(el);
    total += el.orbits;
});
console.log('Pt 1: ' + total);
var you = objects.find(function (el) { return el.name == 'YOU'; });
var san = objects.find(function (el) { return el.name == 'SAN'; });
var listYou = new Array();
var listSan = new Array();
findHierarchy(you, listYou);
findHierarchy(san, listSan);
listSan = listSan.map(function (el) { return el.name; });
listYou = listYou.map(function (el) { return el.name; });
var crossingAt = listYou.filter(function (value) { return listSan.includes(value); }).shift();
function rec(planet) {
    if (planet.parent.name == crossingAt) {
        return steps;
    }
    else {
        steps++;
        return rec(planet.parent);
    }
}
rec(you);
rec(san);
console.log('Pt 2: ' + steps);
//# sourceMappingURL=main.js.map