export class intcodeProcessor {
    tape:number[];
    input:number[];
    index:number;
    output:number[];
    paused:boolean;
    base:number;

    constructor(tapeInput:number[], inputValue:number[]) {
        this.tape = tapeInput;
        this.input = inputValue;
        this.index = 0;
        this.output = [];
        this.paused = false;
        this.base = 0;
    }

    getMode(position:number, mode:number) {
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
    }

    compute() {
        var [p1, p2, p3, p1s, p2s, p3s] = [0, 0, 0, 0, 0, 0];   // initialize to avoid Typescript complaining about use before assignment
        while (this.index < this.tape.length) {
            var opcode = this.tape[this.index] % 100;

            // 0 = position/address, 1 = immediate, 2 = relative/base
            var paramOneMode = Math.floor((this.tape[this.index] / 100)) % 10
            var paramTwoMode = Math.floor((this.tape[this.index] / 1000)) % 10
            var paramThreeMode = Math.floor((this.tape[this.index] / 10000)) % 10

            // identify what the params are
            try {
                p1 = this.getMode(this.tape[this.index + 1], paramOneMode);
                p2 = this.getMode(this.tape[this.index + 2], paramTwoMode);
                p3 = this.getMode(this.tape[this.index + 3], paramThreeMode);
            }
            catch {
                // squash out of bound error
            }

            // always relative mode params
            try {
                p1s = paramOneMode === 2 ? this.tape[this.index + 1] + this.base : this.tape[this.index + 1];
                p2s = paramTwoMode === 2 ? this.tape[this.index + 2] + this.base : this.tape[this.index + 2];
                p3s = paramThreeMode === 2 ? this.tape[this.index + 3] + this.base : this.tape[this.index + 3];
            }
            catch {
                // squash out of bounds error
            }

            // computation functions
            switch (opcode) {
                case 1: {   // addition
                    this.tape[p3s] = p1 + p2;
                    this.index += 4;
                    break;
                }
                case 2: {   // multiplication
                    this.tape[p3s] = p1 * p2;
                    this.index += 4;
                    break;
                }
                case 3: {   // input
                    if (this.input.length === 0) {
                        this.paused = true;
                        break;
                    }
                    this.tape[p1s] = this.input.shift() as number;
                    this.index += 2;
                    break;
                }
                case 4: {   // output
                    this.output.push(p1);
                    this.index += 2;
                    break;
                }
                case 5: {   // jump to p2 if p1 != 0
                    this.index = p1 != 0 ? p2 : this.index + 3;
                    break;
                }
                case 6: {   // jump to p2 if p1 == 0
                    this.index = p1 === 0 ? p2 : this.index + 3;
                    break;
                }
                case 7: {   // less-than
                    this.tape[p3s] = p1 < p2 ? 1 : 0;
                    this.index += 4;
                    break;
                }
                case 8: {   // equality
                    this.tape[p3s] = p1 === p2 ? 1 : 0;
                    this.index += 4;
                    break;
                }
                case 9: {   // increase relative base
                    this.base += p1;
                    this.index += 2;
                    break;
                }
                case 99: {  // halt
                    this.paused = false;
                    return;
                }
            }
        }
    }
}