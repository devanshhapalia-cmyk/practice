"use strict";
//Type:any
//tells the compiler to skip the type checking for the particular variable
// When to use any:
// 
// When migrating JavaScript code to TypeScript
// When working with dynamic content where the type is unknown
// When you need to opt out of type checking for a specific case
// let u = true;
// u = "string"; // Error: Type 'string' is not assignable to type 'boolean'.
// Math.round(u)// Error: Argument of type 'boolean' is not assignable to parameter of type 'number'.
let u = true;
u = "Devansh";
console.log(Math.round(u)); //Nan
// Type:unknown
//unknown is type-safe counter part of any
//type-safely say that this variable can be anything first you need to check it
// Key differences between unknown and any:
// unknown must be type-checked before use
// You can't access properties on an unknown type without type assertion
// You can't call or construct values of type unknown
let w = 1;
w = "string";
w = {
    runANonExistentMethod: () => {
        console.log("I think therefore I am unknown");
    }
};
// w.runANonExistentMethod(); // Error: Object is of type 'unknown'.
if (typeof w === 'object' && w !== null) {
    w.runANonExistentMethod();
}
//Type:never
// The never type represents the type of values that never occur.
// Common use cases for never:
// For functions that will never return a value
// In type guards that should never match
// For exhaustive type checking in switch statements
// In generic types to indicate certain cases are impossible
// let x: never = true;-- // Error: Type 'boolean' is not assignable to type 'never'.
//Type: undefined & null
// undefined and null have their own types, just like string or number.
let y = undefined;
let z = null;
console.log(y);
console.log(z);
//# sourceMappingURL=specialType.js.map