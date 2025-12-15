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

