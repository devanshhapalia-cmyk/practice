"use strict";
//Basic conditional Type Syntax
const checkIfString = (v) => {
    return typeof v === "string" ? true : false;
};
console.log("Is 'hello' a string?", checkIfString("hello")); // true
console.log("Is 42 a string?", checkIfString(42)); // false
console.log("Is a string literal a string?", checkIfString("TypeScript")); // true
let d = "hello";
console.log(d);
const f = "e";
console.log(typeof f);
function getUser() {
    return {
        name: "Alice",
        age: 25,
    };
}
const u1 = {
    name: "devansh",
    age: 21
};
console.log(u1.name); // Alice
console.log(u1.age); // 25
//# sourceMappingURL=ConditionalType.js.map