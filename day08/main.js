"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://github.com/bhosale-ajay/adventofcode/blob/master/2019/ts/D08.test.ts
var fs = require('fs');
var dotless_1 = require("dotless");
var _a = ['0', '1', '2'], B = _a[0], W = _a[1], T = _a[2];
var filename = "C:\\temp\\input08.txt";
var input = fs.readFileSync(filename, 'utf-8').trim(" ");
var lines = input.match(/.{1,150}/g).map(function (l) { return l.split(''); });
var maxZero = 0;
var maxZeroIndex = 0;
var countby = lines.map(dotless_1.countBy()).reduce(function (acc, l) { return (l[B] < acc[B] ? l : acc); });
;
console.log("Pt 1: " + countby[W] * countby[T]);
var finalLayer = lines[0];
for (var index = 1; index < lines.length; index++) {
    var current = lines[index];
    for (var nestedIndex = 0; nestedIndex < current.length; nestedIndex++) {
        if (finalLayer[nestedIndex] === T && current[nestedIndex] !== T) {
            finalLayer[nestedIndex] = current[nestedIndex];
        }
    }
}
var m = finalLayer.join('').match(/.{1,25}/g);
var n = m.join('\n').replace(/0/g, ' ').replace(/1/g, '|');
console.log("Pt 2: \n" + n);
//# sourceMappingURL=main.js.map