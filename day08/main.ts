// https://github.com/bhosale-ajay/adventofcode/blob/master/2019/ts/D08.test.ts
// ^^ thanks for teaching me how reduce works, about dotless, and why you should always cast the output of your
// regex matches as RegExpMatchArray
var fs = require('fs');
import {countBy} from 'dotless';
const [B, W, T] = ['0', '1', '2'];
var filename = "C:\\temp\\input08.txt";
var input = fs.readFileSync(filename, 'utf-8').trim(" ");
var lines = (input.match(/.{1,150}/g) as RegExpMatchArray).map(line => line.split(''));

var countby = lines.map(countBy()).reduce((ret, eva) => (eva[B] < ret[B] ? eva : ret));;
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
var finalArray = finalLayer.join('').match(/.{1,25}/g) as RegExpMatchArray;
var finalString = finalArray.join('\n').replace(/0/g, '🖤').replace(/1/g, '🤍');
console.log("Pt 2: \n" + finalString);