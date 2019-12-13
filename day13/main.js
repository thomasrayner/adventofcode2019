"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var computer_1 = require("..\\common\\computer");
var fs = require('fs');
var filename = "c:\\temp\\input13.txt";
var input = fs.readFileSync(filename).toString().trim().split(',').map(Number);
var computerPt1 = new computer_1.intcodeProcessor(input, [0]);
computerPt1.compute();
// get initial state
var out = computerPt1.output;
var blockCount = 0;
for (var index = 0; index < out.length; index += 3) {
    if (out[index + 2] === 2) {
        blockCount++; // get pt 1
    }
}
console.log("Pt 1: " + blockCount);
var score = 0;
var paddlePos = [0, 0];
var ballPos = [0, 0];
input[0] = 2; // "put in two quarters to start the game"
var computerPt2 = new computer_1.intcodeProcessor(input, [0]);
while (!computerPt2.done) {
    computerPt2.compute();
    var board = computerPt2.output;
    for (var index = 0; index < board.length; index += 3) {
        if (board[index] === -1) {
            // update the score
            score = board[index + 2];
        }
        else {
            // update the board, we only really care about the paddle and ball
            switch (board[index + 2]) {
                case 3: { // paddle
                    paddlePos = [board[index], board[index + 1]];
                    break;
                }
                case 4: { // ball
                    ballPos = [board[index], board[index + 1]];
                    break;
                }
            }
        }
    }
    if (ballPos[0] < paddlePos[0]) {
        // ball is to the left of the paddle, tilt left
        computerPt2.input.push(-1);
    }
    else if (ballPos[0] > paddlePos[0]) {
        // ball is to the right of the paddle, tilt right
        computerPt2.input.push(1);
    }
    else {
        // ball is right above the paddle, hold still
        computerPt2.input.push(0);
    }
}
console.log("Pt 2: " + score);
//# sourceMappingURL=main.js.map