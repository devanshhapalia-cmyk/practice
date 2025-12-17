// Functions are fundamental building blocks in all programming.
// reusable block of code

// function name( p1, p2, ... ) {
//   // code to be executed
//   return valuel;
// }

//example
function toCelsius(fahrenheit) {
  return (5/9) * (fahrenheit-32);
}

// Call the toCelcius() function
let value = toCelsius(77);
console.log(value);//25
// toCelsius refers to the function object.

// toCelsius() refers to the function result.

// Arrow function
let myFunction = (a, b) => a * b;

// Parameter vs Arguments
// "name" and "age" are parameters:
function greet(name, age) {
  return `Hello ${name}! You are ${age} years old.`;
}
// "John" and 21 are arguments:
console.log(greet("John", 21));


function myFunction1(x, y) {
  if (y === undefined) {
    y = 2;
  }
  return y*x;
}
//called with the missing argument than it will be undefined
console.log(myFunction1(2));//4

//aslo ES6 allows giving the default value to parameter
function myFunction2(x, y = 10) {
  return x + y;
}
console.log(myFunction2(5));//15

//if more argument are pass when calling a function that time parameter must be taken as rest which convert the incoming parameter into an array
function sum(...args) {
  let sum = 0;
  for (let arg of args) sum += arg;
  return sum;
}

let x = sum(4, 9, 16, 25, 29, 100, 66, 77);
console.log(x);//326


// argument object in function 
x = sumAll(1, 123, 500, 115, 44, 88);

function sumAll() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}
console.log(x);//871

// arguments are pass by value 


//NOW FUNCTION EXPRESSION======function assigned to a variable
const result=function(a,b){

    return a+b;
}
console.log(result(1,2));//3-----invoked using the variable name and not  function name

// main thing in function vs function expression

let sum1=function add(a,b){};//<---required ;
// hoisted on the top of their scope 

// mostly anunymous function are used i.e functions without name


const y=function (a,b) {return a+b};

// Arrow function 
let myfunction3=(a,b)=>a*b;
console.log(myfunction3(1,2));//2

// if {} then return statement mandatory else not 

//Another method of defining the function is 
const myFunction6 = new Function("a", "b","c", "return a * b*c");

x = myFunction6(4, 3,2);
console.log(x);//24

//Function Hoisting

// Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope.
//Hoisting applies to variable declarations and to function declarations
console.log(myFunction7(5));//25

function myFunction7(y) {
  return y * y;
}

console.log(typeof(myFunction7));//function
//JavaScript functions can best be described as objects
//JavaScript functions have both properties and methods.


// .toString to function give whole function in string 
function myFunction8(a, b) {
  return a * b;
}

text = myFunction8.toString();
console.log(text);


//this keyword refer to the Object
// Alone this keyword------------refer to global object---also in strict mode same
// function this keyword------------refer to global object 
// in function with strict mode--------it is undefined
// in object ----------------------------it refer to the object
// in event -------------------------------this refer to the element that received the event
// call() apply and bind ----------------this refer to any Object


x=this;
console.log(x);//{}

function myfunction9(){
  return this;
}

console.log(myfunction9);//[Function: myfunction9] and in strict mode undefined


//Event Handler

{/* <button onclick="this.style.display='none'"> */}
  {/* Click to Remove Me! */}
{/* </button> */}


              // // Regular Function:
// hello = function() {
//   document.getElementById("demo").innerHTML += this;
// }

// // The window object calls the function:
// window.addEventListener("load", hello);====================Object Window

// // A button object calls the function:
// document.getElementById("btn").addEventListener("click", hello);=============Object HTMLButton


//               //ARROW FUNCTION
// hello = () => {
//   document.getElementById("demo").innerHTML += this;
// }

// // The window object calls the function:
// window.addEventListener("load", hello);=========Object Window

// // A button object calls the function:
// document.getElementById("btn").addEventListener("click", hello);============Object Window

//INOKING THE FUNCTION WITH THE CONSTUCTOR
// This is a function constructor:
function myFunction10(arg1, arg2) {
  this.firstName = arg1;
  this.lastName  = arg2;
}

// This creates a new object
const myObj = new myFunction10("John", "Doe");

// This will return "John"
console.log(myObj.firstName);

//IIFE FUNCTIONS
// IIFEs where often used for encapsulation 
//When to use
// You want private scope in a browser script file
// You need initialization code that should run immediately
// Working with older code that rely on them
//1.
(function () {
  let text = "Hello! I called myself.";
})();
//2.
(function (name) {
  let text = "Hello " + name;
})("John Doe");
//3.
(() => {
  let text = "Hello! I called myself.";
})();
//4.
((name) => {
  let text = "Hello " + name;
})("John Doe");

//EXAMPLE
const counter = (function () {
  let value = 0;
  return {
    increment() { value++; },
    get() { return value; }
  };
})();

counter.increment();
x = counter.get();
console.log(x);
