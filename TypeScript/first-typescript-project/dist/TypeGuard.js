"use strict";
// Why Use Type Guards:
// Type Safety: 
// Code Clarity: 
// Better Tooling:
// Error Prevention: 
// Runtime Safety: 
//1.typeOf typeGuards
function processValue(value) {
    if (typeof value === "string") {
        // TypeScript knows that value is a string here
        return value.toUpperCase();
    }
    else {
        // TypeScript knows that value is a number here
        return value.toFixed(2);
    }
}
// Examples
console.log(processValue("hello world")); // Outputs: HELLO WORLD
console.log(processValue(123.456)); // Outputs: 123.46
//2.instanceOf
class Bird {
    fly() {
        console.log("Flying...");
    }
}
class Fish {
    swim() {
        console.log("Swimming...");
    }
}
function move(animal) {
    if (animal instanceof Bird) {
        // TypeScript knows animal is Bird here
        animal.fly();
    }
    else {
        // TypeScript knows animal is Fish here
        animal.swim();
    }
}
// Examples
const bird = new Bird();
const fish = new Fish();
move(bird); // Outputs: Flying...
move(fish); // Outputs: Swimming...
function isStudent(obj) {
    return (typeof obj === "object" &&
        typeof obj.id === "number" &&
        typeof obj.name === "string");
}
const std1 = {
    id: 1,
    name: "devansh"
};
if (isStudent(std1)) {
    console.log(`id=${std1.id} and name=${std1.name}`);
}
function area(shape) {
    if (shape.kind === "circle") {
        shape.radius;
        return Math.PI * shape.radius ** 2;
    }
    if (shape.kind === "square") {
        shape.side;
        return shape.side ** 2;
    }
}
const circle = {
    kind: "circle",
    radius: 5,
};
console.log(area(circle)); //  works
function makeSound(animal) {
    if ("bark" in animal) {
        // TypeScript knows animal is Dog here
        animal.bark();
    }
    else {
        // TypeScript knows animal is Cat here
        animal.meow();
    }
}
// Example usage
const dog = {
    bark() {
        console.log("Woof woof!");
    }
};
const cat = {
    meow() {
        console.log("Meow!");
    }
};
makeSound(dog); // Outputs: Woof woof!
makeSound(cat); // Outputs: Meow!
//6.Type assertion
//Assertion function for string
function assertIsString(value) {
    if (typeof value !== "string") {
        throw new Error("Value must be a string");
    }
}
// Generic assertion function
function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}
try {
    const input = "hello";
    // Runtime check + type narrowing
    assertIsString(input);
    //TypeScript now KNOWS input is string
    console.log(input.toUpperCase()); // HELLO
}
catch (e) {
    console.log("string error:", e.message);
}
//# sourceMappingURL=TypeGuard.js.map