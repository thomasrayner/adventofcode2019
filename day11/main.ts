import { readFileSync } from 'fs';
import { intcodeProcessor } from "..\\common\\computer";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

var filename = 'c:\\temp\\input11.txt';
var input = readFileSync(filename).toString().trim().split(',').map(Number);

class canvasSquare {
    x:number;
    y:number;
    c:number;

    constructor(x:number, y:number, c:number) {
        this.x = x;
        this.y = y;
        this.c = c;
    }
    
    getXY() {
        return this.x.toString() + this.y.toString();
    }
}

class paintBot {
    instructions:number[];
    currentPosition:canvasSquare;
    currentColor:number;    // 0 for black, 1 for white
    currentOrientation:string;
    index:number;
    paintedCount:number;
    canvas:any;
    computer:intcodeProcessor;

    constructor (inst:number[]) {
        this.instructions = inst;
        this.currentColor = 0;  // defaults to 0 for pt 1, 1 for pt 2
        this.currentPosition = new canvasSquare(0, 0, this.currentColor);
        this.currentOrientation = 'up';
        this.index = 0;
        this.paintedCount = 0;
        this.canvas = new Array();
        this.computer = new intcodeProcessor(this.instructions, [this.currentColor]);
    }

    paint() {
        this.computer.compute();
        while (!this.computer.done) {
            // paint the square
            var tSquare = new canvasSquare(this.currentPosition.x, this.currentPosition.y, this.currentPosition.c)
            this.canvas.push(tSquare);

            // get the next output
            this.computer.compute();
            var color = this.computer.output.shift() as number;
            var turn = this.computer.output.shift() as number;
            this.currentPosition.c = color;

            // go somewhere else next
            if (turn === 0) {
                // turn left
                if (this.currentOrientation === 'up') {
                    this.currentOrientation = 'left';
                }
                else if (this.currentOrientation === 'left') {
                    this.currentOrientation = 'down';
                }
                else if (this.currentOrientation === 'down') {
                    this.currentOrientation = 'right';
                }
                else {
                    this.currentOrientation = 'up';
                }
            }
            else {
                // turn right
                if (this.currentOrientation === 'up') {
                    this.currentOrientation = 'right';
                }
                else if (this.currentOrientation === 'right') {
                    this.currentOrientation = 'down';
                }
                else if (this.currentOrientation === 'down') {
                    this.currentOrientation = 'left';
                }
                else {
                    this.currentOrientation = 'up';
                }
            }

            switch (this.currentOrientation) {
                case 'up': {
                    this.currentPosition.y--;
                    break;
                }
                case 'down': {
                    this.currentPosition.y++;
                    break;
                }
                case 'right': {
                    this.currentPosition.x++;
                    break;
                }
                case 'left': {
                    this.currentPosition.x--;
                    break;
                }
            }

            // go again
            this.computer.input.push(this.currentColor);
        }
        return this.canvas;
    }
}

var rook = new paintBot(input);
var out = rook.paint();
var unique = new Set();
for (var i in out) {
    // var xy = out[i].x.toString() + out[i].y.toString();
    var xy = out[i].getXY();
    if (!unique.has(xy)) {
        unique.add(xy);
    }
}

console.log('Pt 1: ' + unique.size);
