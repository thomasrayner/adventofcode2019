var fs = require('fs');
const fileName = "c:\\temp\\input01.txt";

function getFuelRequirement(moduleMass:number):number {
    var mass = Math.floor(moduleMass / 3) - 2;
    return mass;
}

var fileContents = fs.readFileSync(fileName, 'utf-8');
var moduleMasses = fileContents.split('\n');
var totalFuelMass = 0;

moduleMasses.forEach((m:number) => {
    var moduleFuel = getFuelRequirement(m);
    var neededFuel = moduleFuel;
    totalFuelMass += neededFuel;

    while (getFuelRequirement(neededFuel) > 0) {
        neededFuel = getFuelRequirement(neededFuel);
        totalFuelMass += neededFuel;
    }
});

console.log("Total fuel: " + totalFuelMass);
