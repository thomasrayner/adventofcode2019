/*
It is a six-digit number.
The value is within the range given in your puzzle input.
Two adjacent digits are the same (like 22 in 122345).
Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
*/

var rawInput = '254032-789860';
var lowerBound = parseInt(rawInput.split('-')[0]);
var upperBound = parseInt(rawInput.split('-')[1]);
var possibilities:number[] = [];

function checkDoubles(input:string[]) {
    var inputString = input.join('');
    var i = 1;
    for (i; i < input.length; i++) {
        if (input[i] === input[i - 1]) {
            // pt 2 - can't be more than a double
            var badPattern = new RegExp("(" + input[i] + ")\\1{2,}");
            if (!badPattern.test(inputString)) {
                return true;
            }
        }
    }
    return false;
}

function checkNeverDecrease(input:string[]) {
    var i = 1;
    for (i; i < input.length; i++) {
        if (parseInt(input[i]) < parseInt(input[i - 1])) {
            return false;
        }
    }
    return true;
}


var index = lowerBound;
for (index; index < upperBound; index++) {
    var test = index.toString().split('');
    var hasDouble = checkDoubles(test);
    var neverDecreases = checkNeverDecrease(test);

    if (hasDouble && neverDecreases) {
        possibilities.push(index);
    }
}

console.log("There are " + possibilities.length + " possibilities.");
