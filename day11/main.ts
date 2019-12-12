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

    constructor (inst:number[], startColor:number) {
        this.instructions = inst;
        this.currentColor = startColor;  // defaults to 0 for pt 1, 1 for pt 2
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
                switch (this.currentOrientation) {
                    case 'up': {this.currentOrientation = 'left'; break;}
                    case 'left': {this.currentOrientation = 'down'; break;}
                    case 'down': { this.currentOrientation = 'right'; break;}
                    case 'right': { this.currentOrientation = 'up'; break;}
                }
            }
            else {
                // turn right
                switch (this.currentOrientation) {
                    case 'up': { this.currentOrientation = 'right'; break; }
                    case 'right': { this.currentOrientation = 'down'; break; }
                    case 'down': { this.currentOrientation = 'left'; break; }
                    case 'left': { this.currentOrientation = 'up'; break; }
                }
            }

            // move forward one square
            switch (this.currentOrientation) {
                case 'up': {this.currentPosition.y++; break;}
                case 'down': {this.currentPosition.y--; break;}
                case 'right': {this.currentPosition.x++; break;}
                case 'left': {this.currentPosition.x--; break;}
            }

            // find the next square color and use it as input for the next compute
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

// pt 1
var rook = new paintBot(input, 0); // part 1 starts on black square
var rookOut = rook.paint();
var rookUnique:any = [];

for (var s in rookOut) {
    var square = rookOut[s];
    var matchSquare = rookUnique.filter((i: canvasSquare) => square.x === i.x && square.y === i.y);

    if (matchSquare.length > 0) {
        continue;
    }

    rookUnique.push(rookOut[s]);
}

console.log('Pt 1: ' + rookUnique.length);

// pt 2
var bishop = new paintBot(input, 1); // part 2 starts on white square
var bishopOut = bishop.paint();
var bishopUnique: any = [];

for (var s in bishopOut) {
    var square = bishopOut[s];
    var matchSquare = bishopUnique.filter((i: canvasSquare) => square.x === i.x && square.y === i.y);

    if (matchSquare.length > 0) {
        bishopUnique[bishopUnique.indexOf(matchSquare[0])].c = bishopOut[s].c;
    }
    else {
        bishopUnique.push(bishopOut[s]);
    }
}

var minX = 0;
var maxX = 0;
var minY = 0;
var maxY = 0;

for (var s in bishopUnique) {
    var square = bishopUnique[s];
    if (square.x < minX) {minX = square.x}
    if (square.x > maxX) {maxX = square.x}
    if (square.y < minY) {minY = square.y}
    if (square.y > maxY) {maxY = square.y}
}

// just in case the max of x or y is negative
var absX = Math.abs(minX) > Math.abs(maxX) ? Math.abs(minX) : Math.abs(maxX);
var absY = Math.abs(minY) > Math.abs(maxY) ? Math.abs(minY) : Math.abs(maxY);

var codeCanvas:number[][] = [];
// init to black canvas
for (var i = 0; i <= absY; i++) {
    // rows
    codeCanvas[i] = [];
    for (var j = 0; j <= absX; j++) {
        // columns
        codeCanvas[i][j] = 0;
    }
}

// update with our canvas squares which are in no particular order
for (var s in bishopUnique) {
    var square = bishopUnique[s];
    codeCanvas[Math.abs(square.y)][Math.abs(square.x)] = square.c;
}

// draw it out
console.log('Pt 2:')
for (var i = 0; i <= absY; i++) {
    // rows
    var line = '';
    for (var j = 0; j <= absX; j++) {
        // columns
        line += codeCanvas[i][j] === 0 ? '🖤' : '🤍';
    }
    console.log(line);
}
