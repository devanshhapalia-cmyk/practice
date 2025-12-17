// Use if to specify a code block to be executed, if a specified condition is true

// if (condition) {
//   // code to execute if the condition is true
// }

// Use else to specify a code block to be executed, if the same condition is false

// if (condition) {
//   // code to execute if the condition is true
// } else {
//   // code to execute if the condition is false
// }


// Use else if to specify a new condition to test, if the first condition is false

// if (condition1) {
//   // code to execute if condition1 is true
// } else if (condition2) {
//   // code to execute if the condition1 is false and condition2 is true
// } else {
//   // code to execute if the condition1 is false and condition2 is false
// }



// Use switch to specify many alternative code blocks to be executed

// switch(expression) {
//   case x:
//     // code block
//     break;
//   case y:
//     // code block
//     break;
//   default:
//     // code block
// }


// Use (? :) (ternary) as a shorthand for if...else

    // condition ? expression1 : expression2

//     let text="";
//     text += "d" + "<br>";
// text += "e" + "<br>";
// text += "v" + "<br>";
// text += "a" + "<br>";
// text += "n" + "<br>";
// text += "s" + "<br>";
// text += "h" + "<br>";
// console.log(text);

// for (let i = 0; i < cars.length; i++) {
//   text += cars[i] + "<br>";
// }
// 

let i = 5;

for (i = 0; i < 10; i++) {
  i+=1;
}
console.log(i);
i-=1;
while (i < 10) {
  var text = "The number is " + i;
    console.log(text);
  i++;
}
console.log(i);
i-=1;
do {
  let text = "The number is " + i;
      console.log(text);
  i++;
}
while (i < 10);
console.log(i);

// for(exp1; exp2; exp3){
// }


// exp 1
// exp 1 is used to initialize the variable(s) used in the loop (let i = 0).
// exp 1 is optional.
// You can omit exp 1 if the value is set before the loop starts:

// exp 2
// exp 2 is used to evaluate the condition of the initial variable (i < len).
// exp 2 is also optional.
// If exp 2 returns false, the loop will end.

// exp 3
// exp 3 increments the value of the initial variable (i++).
// exp 3 is optional.
// exp 3 can do anything like negative increment (i--), positive increment (i = i + 15), or anything else.
// exp 3 can be omitted (if you increment the value inside the loop):

text = "";

loop1: for (let j = 1; j < 5; j++) {
  loop2: for (let i = 1; i < 5; i++) {
    if (i === 3) { break loop2; }
    text += i;
   }
}

console.log(text);

//two for loop for..of and for...in 
// 1. for...of is used for iterating over elements in Array

// 2. for...in is used for iterating over index used mostly for objjects