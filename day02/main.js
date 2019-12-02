"use strict";
var fs = require('fs');
var fileName = "C:\\temp\\input02.txt";
var fileContents = fs.readFileSync(fileName, 'utf-8');
var tapeString = fileContents.split(',');
// pt 1 instructions say to replace these static locations with these static values
tapeString[1] = "12";
tapeString[2] = "2";
var tape = tapeString.map(Number);
var index = 0;
while (tape[index] != 99) {
    if (tape[index] == 1) {
        tape[tape[index + 3]] = tape[tape[index + 1]] + tape[tape[index + 2]];
    }
    if (tape[index] == 2) {
        tape[tape[index + 3]] = tape[tape[index + 1]] * tape[tape[index + 2]];
    }
    index += 4;
}
console.log("Part 1: " + tape[0]);
// pt 2 brute force
var noun = 0;
var keepTrying = true;
for (noun = 0; noun < 100; noun++) {
    if (!keepTrying) {
        break;
    }
    var verb = 0;
    for (verb = 0; verb < 100; verb++) {
        if (!keepTrying) {
            break;
        }
        tapeString[1] = noun;
        tapeString[2] = verb;
        tape = tapeString.map(Number);
        index = 0;
        while (tape[index] != 99) {
            if (tape[index] == 1) {
                tape[tape[index + 3]] = tape[tape[index + 1]] + tape[tape[index + 2]];
            }
            if (tape[index] == 2) {
                tape[tape[index + 3]] = tape[tape[index + 1]] * tape[tape[index + 2]];
            }
            index += 4;
        }
        if (tape[0] == 19690720) {
            console.log("Part 2: " + ((100 * noun) + verb));
            keepTrying = false;
        }
    }
}
//# sourceMappingURL=main.js.map