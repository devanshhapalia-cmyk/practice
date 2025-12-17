var x = 5;
let y = 6;
let z = x + y;
console.log(z);

// The rules for constructing names (identifiers) are:

// Names can contain letters, digits, underscores, and dollar signs.
let $myMoney = 5;
// Names must begin with a letter, a $ sign or an underscore (_).
let _lastName = "Johnson";
// Names are case sensitive (X is different from x).
// Reserved words (JavaScript keywords) cannot be used as names.

var x = "John" + " " + "Doe";//John Doe
console.log(x);

var x = "5" + 2 + 3;//523
console.log(x);

var x = 2 + 3 + "5";//55
console.log(x);


//1. LET variable

// The let keyword was introduced in ES6 (2015)

// Variables declared with let have Block Scope

// Variables declared with let must be Declared before use

// Variables declared with let cannot be Redeclared in the same scope

{
  let x = 2;
}
// x can NOT be used here

//Variables declared with the var always have Global Scope.

{
  var x = 2;
}
// x CAN be used here

// Hoisting
// Variables defined with var are hoisted to the top and can be initialized at any time.

// Meaning: You can use the variable before it is declared:

