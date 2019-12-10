// https://gist.github.com/simon-paris/3d39f8ffb384b81132016f98442a62b2
// There was no way I was going to sort out the math in a reasonable amount of time
var fs = require('fs');
var filename = "c:\\temp\\input10.txt";
var outString = '';

var input = fs.readFileSync(filename).toString().split(/\n/g).map((x:string) => x.split(''));

function getGcd(x:number, y:number) {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}

var total = 0;
input.forEach((v:any, y1:any) => v.forEach((v:any, x1:any) => { // eq to nested looping through the y then x
    if (input[y1][x1] === '#') {
        total++
    }
}));

var max = 0;
input.forEach((v: any, y1: any) => v.forEach((v: any, x1: any) => {
    var count = total - 1;
    var angles:any = [];
    var inputCopy = input.slice().map((v:any) => v.slice());

    if (inputCopy[y1][x1] !== '#') {
        return;
    }
    inputCopy[y1][x1] = 'X';

    function scan(x1:any, y1:any, x2:any, y2:any) {
        var offsetX = x2 - x1;
        var offsetY = y2 - y1;
        var gcd = getGcd(offsetX, offsetY);
        offsetX /= gcd;
        offsetY /= gcd;

        while (true) {
            x2 += offsetX;
            y2 += offsetY;
            if (x2 >= 0 && x2 < inputCopy.length && y2 >= 0 && y2 < inputCopy[0].length) {
                if (inputCopy[y2][x2] === '#') {
                    count--;
                }
                inputCopy[y2][x2] = ' ';
            }
            else {
                break;
            }
        }
    }

    inputCopy.forEach((v:any, y2:any) => v.forEach((v:any, x2:any) => {
        if (inputCopy[y2][x2] === '#' && !(x1 === x2 && y1 === y2)) {
            scan(x1, y1, x2, y2);
        }
    }));

    inputCopy.forEach((v: any, y2: any) => v.forEach((v: any, x2: any) => {
        if (inputCopy[y2][x2] !== '#') {
            return;
        }
        
        let angle = Math.atan2(y2 - y1, x2 - x1) + (Math.PI / 2);
        if (angle < 0) {
            angle += Math.PI * 2;
        }
        angles.push({x: x2, y: y2, angle});
        
    }))

    angles.sort((a:any, b:any) => a.angle - b.angle).slice();

    if (count >= max) {
        outString = "Pt 1: " + count + "\nPt 2: " + (angles[199].x * 100 + angles[199].y);
        max = count;
    }
}));

console.log(outString);
