"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var computer_1 = require("..\\common\\computer");
require("fs");
var fs_1 = require("fs");
var filename = "c:\\temp\\input09.txt";
var tapeString = fs_1.readFileSync(filename, 'utf-8');
var tapeCode = tapeString.split(",").map(Number);
var comp = new computer_1.intcodeProcessor(tapeCode, [1]);
comp.compute();
console.log('Pt 1: ' + comp.output);
var comp = new computer_1.intcodeProcessor(tapeCode, [2]);
comp.compute();
console.log('Pt 1: ' + comp.output);
//# sourceMappingURL=main.js.map