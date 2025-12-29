"use strict";
// Explicit Typing: You explicitly declare the type of a variable
// Type Inference: TypeScript automatically determines the type based on the assigned value
// Explicit type annotations
// String
let greeting = "Hello, TypeScript!";
// Number
let userCount = 42;
// Boolean
let isLoading = true;
// Array of numbers
let scores = [100, 95, 98];
// Output the values
console.log(greeting);
console.log(userCount);
console.log(isLoading);
console.log(scores);
// Function with explicit parameter and return types
function greet(name) {
    return `Hello, ${name}!`;
}
greet("Alice");
// TypeScript infers 'string'
let username = "alice";
// TypeScript infers 'number'
let score = 100;
// TypeScript infers 'boolean[]'
let flags = [true, false, true];
// TypeScript infers return type as 'number'
function add(a, b) {
    return a + b;
}
// Log the values to see them in the output
console.log(username);
console.log(score);
console.log(flags);
console.log(add(5, 3));
const user = {
    name: "Alice",
    age: 30,
    isAdmin: true
};
console.log(user.name);
// ****TypeScript falls back to the any type, which disables type checking.
// 1. JSON.parse returns 'any' because the structure isn't known at compile time
const data = JSON.parse('{ "name": "Alice", "age": 30 }');
// 2. Variables declared without initialization
let something; // Type is 'any'
something = 'hello';
something = 42; // No error
//# sourceMappingURL=explicitAndInference.js.map