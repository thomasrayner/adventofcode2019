"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var computer_1 = require("..\\common\\computer");
var filename = 'c:\\temp\\input11.txt';
var input = fs_1.readFileSync(filename).toString().trim().split(',').map(Number);
var canvasSquare = /** @class */ (function () {
    function canvasSquare(x, y, c) {
        this.x = x;
        this.y = y;
        this.c = c;
    }
    canvasSquare.prototype.getXY = function () {
        return this.x.toString() + this.y.toString();
    };
    return canvasSquare;
}());
var paintBot = /** @class */ (function () {
    function paintBot(inst) {
        this.instructions = inst;
        this.currentColor = 1; // defaults to 0 for pt 1, 1 for pt 2
        this.currentPosition = new canvasSquare(0, 0, this.currentColor);
        this.currentOrientation = 'up';
        this.index = 0;
        this.paintedCount = 0;
        this.canvas = new Array();
        this.computer = new computer_1.intcodeProcessor(this.instructions, [this.currentColor]);
    }
    paintBot.prototype.paint = function () {
        // paint the square
        var tSquare = new canvasSquare(this.currentPosition.x, this.currentPosition.y, this.currentPosition.c);
        this.canvas.push(tSquare);
        while (!this.computer.done) {
            this.computer.compute();
            // get the next output
            var color = this.computer.output.shift();
            var turn = this.computer.output.shift();
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
            var ta = [];
            var nextColor = this.canvas.forEach(function (x) {
                if (x.x == tx && x.y == ty) {
                    ta.push(x);
                }
            });
            nextColor = ta[ta.length - 1] == undefined ? 0 : ta[ta.length - 1].c;
            this.computer.input.push(nextColor);
        }
        return this.canvas;
    };
    return paintBot;
}());
var rook = new paintBot(input);
var out = rook.paint();
var unique = [];
for (var s in out) {
    var square = out[s];
    var matchSquare = unique.filter(function (i) { return square.x === i.x && square.y === i.y; });
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
    if (square.x < minX) {
        minX = square.x;
    }
    if (square.x > maxX) {
        maxX = square.x;
    }
    if (square.y < minY) {
        minY = square.y;
    }
    if (square.y > maxY) {
        maxY = square.y;
    }
}
var absX = Math.abs(minX) > Math.abs(maxX) ? Math.abs(minX) : Math.abs(maxX);
var absY = Math.abs(minY) > Math.abs(maxY) ? Math.abs(minY) : Math.abs(maxY);
var codeCanvas = [];
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
console.log('Pt 2:\n');
for (var i = 0; i <= absY; i++) {
    var line = '';
    for (var j = 0; j <= absX; j++) {
        line += codeCanvas[i][j] === 0 ? '🖤' : '🤍';
    }
    console.log(line);
}
//# sourceMappingURL=main.js.map