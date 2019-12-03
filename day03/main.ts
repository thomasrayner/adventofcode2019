var fs = require('fs');
var fileName = 'C:\\temp\\input03.txt';
var wirePaths = fs.readFileSync(fileName, 'utf-8').split('\n');
var wireOne = wirePaths[0].split(',')
var wireTwo = wirePaths[1].split(',')
var manDistances:number[] = [];

class intersection {
    location:number[];
    distance:number;

    constructor(loc:number[], dis:number) {
        this.location = loc;
        this.distance = dis;
    }
}

var intersections:intersection[] = [];

function move(x:number, y:number, dir:string) {
    switch (dir) {
        case 'U': {
            return [x, y + 1];
        }
        case 'D': {
            return [x, y - 1];
        }
        case 'R': {
            return [x + 1, y];
        }
        case 'L': {
            return [x - 1, y];
        }
        default: {
            throw "Invalid instruction";
        }
    }
}

function calculateDistance(x:number, y:number) {
    // measuring distance to 0,0 so abs(x - 0) is just abs(x)
    var dis = Math.abs(x) + Math.abs(y);
    return dis;
}

var xPos = 0;
var yPos = 0;
var wireOneCoords:string[] = [];
console.log("Mapping wire one coords.");
wireOne.forEach((instruction:string) => {
    var direction = instruction.substring(0, 1);
    var distance = parseInt(instruction.substring(1));

    for (distance; distance > 0; distance--) {
        var newPos = move(xPos, yPos, direction);
        xPos = newPos[0];
        yPos = newPos[1];
        wireOneCoords.push(xPos + "," + yPos);
    }
});

xPos = 0;
yPos = 0;
var wireTwoCoords:string[] = [];
console.log("Mapping wire two coords.");
wireTwo.forEach((instruction: string) => {
    var direction = instruction.substring(0, 1);
    var distance = parseInt(instruction.substring(1));

    for (distance; distance > 0; distance--) {
        var newPos = move(xPos, yPos, direction);
        xPos = newPos[0];
        yPos = newPos[1];
        wireTwoCoords.push(xPos + "," + yPos);
    }
});

console.log('Wire One: ' + wireOneCoords.length + " entries. Wire Two: " + wireTwoCoords.length + " entries. Calculating intersection.");
var intersectingCoords = wireOneCoords.filter(x => wireTwoCoords.includes(x));

console.log("Finding Manhattan distances for " + intersectingCoords.length + " intersections.");
intersectingCoords.forEach((i:string) => {
    var intCoords = i.split(',');
    var newInt = new intersection([parseInt(intCoords[0]), parseInt(intCoords[1])], calculateDistance(parseInt(intCoords[0]), parseInt(intCoords[1])));
    intersections.push(newInt);
    manDistances.push(newInt.distance);
});

var shortestDistance = Math.min(...manDistances);
console.log("Intersection with shortest Manhattan distance (pt 1): " + shortestDistance + ".");

console.log("Computing shortest combined distance to an intersection.");
var shortestCombined = Number.MAX_VALUE;
intersectingCoords.forEach((i:string) => {
    var combined = wireOneCoords.indexOf(i) + wireTwoCoords.indexOf(i);
    if (combined < shortestCombined) {
        shortestCombined = combined + 2; // add 2 because I'm not counting 0,0
    }
});
console.log("Shortest combined distance (pt 2): " + shortestCombined + ".");
