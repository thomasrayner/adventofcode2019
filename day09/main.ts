import { intcodeProcessor } from "..\\common\\computer";
import 'fs';
import { readFileSync } from "fs";
var filename = "c:\\temp\\input09.txt";
var tapeString = readFileSync(filename, 'utf-8');
var tapeCode = tapeString.split(",").map(Number);

var comp = new intcodeProcessor(tapeCode, [1]);
comp.compute();
console.log('Pt 1: ' + comp.output);

var comp = new intcodeProcessor(tapeCode, [2]);
comp.compute();
console.log('Pt 1: ' + comp.output);