"use strict";
//Functions should specify the return type 
// the `: number` here specifies that this function returns a number
function getTime() {
    return new Date().getTime();
}
console.log(getTime());
//Optional Parameters
function add1(a, b, c) {
    return a + b + (c || 0);
}
console.log(add1(1, 2, 3));
console.log(add1(1, 2));
//Default Parameters
function pow(value, exponent = 10) {
    return value ** exponent;
}
console.log(pow(2));
//Named Parameters
function divide({ dividend, divisor }) {
    return dividend / divisor;
}
console.log(divide({ dividend: 10, divisor: 2 }));
//Rest Parameters
function add3(a, b, ...rest) {
    return a + b + rest.reduce((p, c) => p + c, 0);
}
console.log(add3(10, 10, 10, 10, 10));
//# sourceMappingURL=Functions.js.map