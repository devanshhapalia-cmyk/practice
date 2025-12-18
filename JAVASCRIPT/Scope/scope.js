// JavaScript variables have 3 types of scope:

// Global scope----------------Variables declared Globally (outside any block or function) have Global Scope.
// Function scope--------------Variables defined inside a function are not accessible (visible) from outside the function.
// Block scope-----------------ES6 introduced two important new JavaScript keywords: let and const.
// ----------------------------These two keywords provide Block Scope in JavaScript.
// ----------------------------Variables declared with let and const inside a code block are "block-scoped," meaning they are only accessible within that block.
// block scope example
{
  let x = 2;
}
// x can NOT be used here

// Variables declared with the var keyword can NOT have block scope.
// Variables declared with the var keyword, inside a { } block; can be accessed from outside the block.

{
  var x = 2;
}
// x CAN be used here

// If you assign a value to a variable that has not been declared, it will become a GLOBAL variable.
myFunction();

// code here can use carName

function myFunction() {
  carName = "Volvo";
}

//Hoisting
y=5;
console.log(y);
var y;

// carName = "Volvo";------------reference error
// let carName;

// carName = "Volvo";-----------refernce error
// const carName;
//Initializations are Not Hoisted