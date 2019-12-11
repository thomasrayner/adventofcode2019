"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var intcodeProcessor = /** @class */ (function () {
    function intcodeProcessor(tapeInput, inputValue) {
        this.tape = tapeInput;
        this.input = inputValue;
        this.index = 0;
        this.output = [];
        this.paused = false;
        this.base = 0;
        this.done = false;
    }
    intcodeProcessor.prototype.getMode = function (position, mode) {
        switch (mode) {
            case 1: {
                return position;
            }
            case 2: {
                return this.tape[position + this.base];
            }
            default: {
                return this.tape[position];
            }
        }
    };
    intcodeProcessor.prototype.compute = function () {
        var _a = [0, 0, 0, 0, 0, 0], p1 = _a[0], p2 = _a[1], p3 = _a[2], p1s = _a[3], p2s = _a[4], p3s = _a[5]; // initialize to avoid Typescript complaining about use before assignment
        while (this.index < this.tape.length) {
            var opcode = this.tape[this.index] % 100;
            // 0 = position/address, 1 = immediate, 2 = relative/base
            var paramOneMode = Math.floor((this.tape[this.index] / 100)) % 10;
            var paramTwoMode = Math.floor((this.tape[this.index] / 1000)) % 10;
            var paramThreeMode = Math.floor((this.tape[this.index] / 10000)) % 10;
            // identify what the params are
            try {
                p1 = this.getMode(this.tape[this.index + 1], paramOneMode);
                p2 = this.getMode(this.tape[this.index + 2], paramTwoMode);
                p3 = this.getMode(this.tape[this.index + 3], paramThreeMode);
            }
            catch (_b) {
                // squash out of bound error
            }
            // always relative mode params
            try {
                p1s = paramOneMode === 2 ? this.tape[this.index + 1] + this.base : this.tape[this.index + 1];
                p2s = paramTwoMode === 2 ? this.tape[this.index + 2] + this.base : this.tape[this.index + 2];
                p3s = paramThreeMode === 2 ? this.tape[this.index + 3] + this.base : this.tape[this.index + 3];
            }
            catch (_c) {
                // squash out of bounds error
            }
            // computation functions
            switch (opcode) {
                case 1: { // addition
                    this.tape[p3s] = p1 + p2;
                    this.index += 4;
                    break;
                }
                case 2: { // multiplication
                    this.tape[p3s] = p1 * p2;
                    this.index += 4;
                    break;
                }
                case 3: { // input
                    if (this.input.length === 0) {
                        this.paused = true;
                        break;
                    }
                    this.paused = false;
                    this.tape[p1s] = this.input.shift();
                    //console.debug({ 'index': this.index, 'instruction': this.tape[this.index], 'output': this.output, 'input': this.input});
                    this.index += 2;
                    break;
                }
                case 4: { // output
                    this.output.push(p1);
                    this.index += 2;
                    //console.debug({ 'index': this.index, 'instruction': this.tape[this.index], 'output': this.output, 'input': this.input});
                    break;
                }
                case 5: { // jump to p2 if p1 != 0
                    this.index = p1 != 0 ? p2 : this.index + 3;
                    break;
                }
                case 6: { // jump to p2 if p1 == 0
                    this.index = p1 === 0 ? p2 : this.index + 3;
                    break;
                }
                case 7: { // less-than
                    this.tape[p3s] = p1 < p2 ? 1 : 0;
                    this.index += 4;
                    break;
                }
                case 8: { // equality
                    this.tape[p3s] = p1 === p2 ? 1 : 0;
                    this.index += 4;
                    break;
                }
                case 9: { // increase relative base
                    this.base += p1;
                    this.index += 2;
                    break;
                }
                case 99: { // halt
                    this.paused = false;
                    this.done = true;
                    return;
                }
            }
            if (this.paused) {
                break;
            }
        }
    };
    return intcodeProcessor;
}());
exports.intcodeProcessor = intcodeProcessor;
//# sourceMappingURL=computer.js.map