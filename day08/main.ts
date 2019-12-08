//https://github.com/bhosale-ajay/adventofcode/blob/master/2019/ts/D08.test.ts
var fs = require('fs');
import {countBy} from 'dotless';
const [B, W, T] = ['0', '1', '2'];
var filename = "C:\\temp\\input08.txt";
var input = fs.readFileSync(filename, 'utf-8').trim(" ");
var lines = (input.match(/.{1,150}/g) as RegExpMatchArray).map(l => l.split(''));
var maxZero = 0;
var maxZeroIndex = 0;

var countby = lines.map(countBy()).reduce((acc, l) => (l[B] < acc[B] ? l : acc));;
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
var m = finalLayer.join('').match(/.{1,25}/g) as RegExpMatchArray;
var n = m.join('\n').replace(/0/g, ' ').replace(/1/g, '|');
console.log("Pt 2: \n" + n);