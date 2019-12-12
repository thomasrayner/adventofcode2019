import { readFileSync } from 'fs';
import { intcodeProcessor } from "..\\common\\computer";

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
        this.currentColor = 1;  // defaults to 0 for pt 1, 1 for pt 2
        this.currentPosition = new canvasSquare(0, 0, this.currentColor);
        this.currentOrientation = 'up';
        this.index = 0;
        this.paintedCount = 0;
        this.canvas = new Array();
        this.computer = new intcodeProcessor(this.instructions, [this.currentColor]);
    }

    paint() {
        // paint the square
        var tSquare = new canvasSquare(this.currentPosition.x, this.currentPosition.y, this.currentPosition.c);
        this.canvas.push(tSquare);
        
        while (!this.computer.done) {
            this.computer.compute();
            // get the next output
            var color = this.computer.output.shift() as number;
            var turn = this.computer.output.shift() as number;

            // paint the square
            this.currentPosition.c = this.currentColor = color;
            var tSquare = new canvasSquare(this.currentPosition.x, this.currentPosition.y, this.currentPosition.c);
            this.canvas.push(tSquare);

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
                    this.currentPosition.y++;
                    break;
                }
                case 'down': {
                    this.currentPosition.y--;
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

            var tx = this.currentPosition.x;
            var ty = this.currentPosition.y;
            var ta:any = [];
            var nextColor = this.canvas.forEach((x: canvasSquare) => {
                if (x.x == tx && x.y == ty) {
                    ta.push(x);
                }
            });
            nextColor = ta[ta.length - 1] == undefined ? 0 : ta[ta.length - 1].c;

            this.computer.input.push(nextColor);
        }
        return this.canvas;
    }
}

var rook = new paintBot(input);
var out = rook.paint();
var unique:any = [];
for (var s in out) {
    var square = out[s];
    var matchSquare = unique.filter((i: canvasSquare) => square.x === i.x && square.y === i.y);
    if (matchSquare.length > 0) {
        unique[unique.indexOf(matchSquare[0])].c = out[s].c;
    }
    else {
        unique.push(out[s]);
    }
}

// Uncomment below line for pt 1 output, don't forget to change starting square to *black*
// console.log('Pt 1: ' + unique.length);

// Uncomment below line for pt 2 output, don't forget to change starting square to *white*
var minX = 0;
var maxX = 0;
var minY = 0;
var maxY = 0;

for (var s in unique) {
    var square = unique[s];
    if (square.x < minX) {minX = square.x}
    if (square.x > maxX) {maxX = square.x}
    if (square.y < minY) {minY = square.y}
    if (square.y > maxY) {maxY = square.y}
}

var absX = Math.abs(minX) > Math.abs(maxX) ? Math.abs(minX) : Math.abs(maxX);
var absY = Math.abs(minY) > Math.abs(maxY) ? Math.abs(minY) : Math.abs(maxY);

var codeCanvas:number[][] = [];
// init to black canvas
for (var i = 0; i <= absY; i++) {
    codeCanvas[i] = [];
    for (var j = 0; j <= absX; j++) {
        codeCanvas[i][j] = 0;
    }
}

// update with our canvas squares
for (var s in unique) {
    var square = unique[s];
    codeCanvas[Math.abs(square.y)][Math.abs(square.x)] = square.c;
}

// draw it out
console.log('Pt 2:\n')
for (var i = 0; i <= absY; i++) {
    var line = '';
    for (var j = 0; j <= absX; j++) {
        line += codeCanvas[i][j] === 0 ? '🖤' : '🤍';
    }
    console.log(line);
}