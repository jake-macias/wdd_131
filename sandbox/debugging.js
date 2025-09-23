const PI = 3.14;
let radius = 3;
let area = 0;
function calculateArea(radius) {
    const area = radius * radius * PI;
}
area = calculateArea(radius);
area = radius * radius * PI;
console.log("Area of circle with radius " + radius + " is: " + area);
radius = 4;
area = radius * radius * PI;
console.log("Area of circle with radius " + radius + " is: " + area);