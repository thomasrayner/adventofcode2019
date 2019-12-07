var fs = require('fs');
const fileName = "C:\\temp\\day7.txt";

var fileContents = fs.readFileSync(fileName, 'utf-8');
var tapeString = fileContents.split(',');
var tape = tapeString.map(Number);

function day7(inTape:number[], userInput:number[]):number {
    var runTape = [...inTape];
    var index = 0;
    var scoopOver = new Map([[1, 4], [2, 4], [3, 2], [4, 2], [5, 3], [6, 3], [7, 4], [8, 4], [99, 0]]);
    
    while (true) {
        var scoop = 0;
        var pointerChanged = false;
        var rawOpcode = runTape[index].toString();
        var opcode = parseInt(rawOpcode);
        var parameterMode = false; // 0 = position mode
        var a = b = c = 0;

        if (opcode > 100) {
            parameterMode = true;
            opcode = parseInt(rawOpcode.substring((rawOpcode.length - 2)));
            var c = rawOpcode.length >= 3 ? parseInt(rawOpcode.substring((rawOpcode.length - 3), (rawOpcode.length - 2))) : 0;
            var b = rawOpcode.length >= 4 ? parseInt(rawOpcode.substring((rawOpcode.length - 4), (rawOpcode.length - 3))) : 0;
            var a = rawOpcode.length >= 5 ? parseInt(rawOpcode.substring((rawOpcode.length - 5), (rawOpcode.length - 4))) : 0;
        }

        scoop = scoopOver.get(opcode)!;

        if (opcode == 99) {
            break;
        }
        
        var inputOneIndex = (parameterMode && c == 1) ? index + 1 : runTape[index + 1];
        var inputTwoIndex = 0; // need to initialize, won't be used in this state
        if ([1, 2, 3, 4, 5, 6, 7, 8].indexOf(opcode) > -1) {
            inputTwoIndex = (parameterMode && b == 1) ? index + 2 : runTape[index + 2];
        }
        if ([1, 2, 7, 8].indexOf(opcode) > -1) {
            // params that have an instruction writes to will never be in immediate mode
            var outputIndex = tape[index + 3];
        }

        switch (opcode % 10) {
            case 1: {
                // add
                runTape[outputIndex] = runTape[inputOneIndex] + runTape[inputTwoIndex];
                break;
            }
            case 2: {
                // multiply
                runTape[outputIndex] = runTape[inputOneIndex] * runTape[inputTwoIndex];
                break;
            }
            case 3: {
                // input
                runTape[runTape[index + 1]] = userInput.shift() as number;
                break;
            }
            case 4: {
                // output
                if (runTape[inputOneIndex] != 0) {
                    return runTape[inputOneIndex] as number;
                }
                break;
            }
            case 5: {
                // jump-if-true
                if (runTape[inputOneIndex] != 0) {
                    pointerChanged = true;
                    index = runTape[inputTwoIndex];
                }
                break;
            }
            case 6: {
                // jump-if-false
                if (runTape[inputOneIndex] === 0) {
                    pointerChanged = true;
                    index = runTape[inputTwoIndex];
                }
                break;
            }
            case 7: {
                // less-than
                runTape[outputIndex] = (runTape[inputOneIndex] < runTape[inputTwoIndex]) ? 1 : 0;
                break;
            }
            case 8: {
                // equals
                runTape[outputIndex] = (runTape[inputOneIndex] == runTape[inputTwoIndex]) ? 1 : 0;
                break;
            }
        }

        if (!pointerChanged) {
            index = index + scoop;
        }
    }
    return 0;
}

function* combinations(from: number, to: number) {
    function* settings(ignore: number[] = []) {
        for (let i = from; i <= to; i++) {
            if (ignore.findIndex(ti => ti === i) === -1) {
                yield i;
            }
        }
    }
    for (const a of settings()) {
        for (const b of settings([a])) {
            for (const c of settings([a, b])) {
                for (const d of settings([a, b, c])) {
                    for (const e of settings([a, b, c, d])) {
                        yield [a, b, c, d, e];
                    }
                }
            }
        }
    }
}

function findHighestSignal1(newTape:any) {
    var program = Object.assign([], newTape);;
    let max = 0;
    for (const [a, b, c, d, e] of combinations(0, 4)) {
        const oa:number = day7(program, [a, 0]);
        const ob:number = day7(program, [b, oa]);
        const oc:number = day7(program, [c, ob]);
        const od:number = day7(program, [d, oc]);
        const oe:number = day7(program, [e, od]);
        if (oe > max) {
            max = oe;
        }
    }
    return max;
};


var highest1 = findHighestSignal1(tape);
console.log("Pt 1: " + highest1);
