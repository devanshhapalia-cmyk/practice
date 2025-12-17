let carName1 = "Volvo XC60";  // Double quotes
let carName2 = 'Volvo XC60';  // Single quotes
let text = `He's often called "Johnny"`; //using `` introduce in ES6

//string length
text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let length = text.length;

console.log(length);//26

// \" inserts a double quote in a string:
text = "We are the so-called \"Vikings\" from the north.";

// \' inserts a single quote in a string:
text= 'It\'s alright.';

// \\ inserts a backslash in a string:
text = "The character \\ is called backslash.";


let x = "John";
let y = new String("John");//The new keyword complicates the code and slows down execution speed.



// When using the == operator, x and y are equal:TRUE
// let x = "John";
// let y = new String("John");

// When using the === operator, x and y are not equal:FALSE
// let x = "John";
// let y = new String("John");


// (x == y) true or false?===FALSE
// let x = new String("John");
// let y = new String("John");

// (x === y) true or false?===FALSE
// let x = new String("John");
// let y = new String("John");

//`` inside we can interpolate variable inside the string.
let price = 10;
let VAT = 0.25;

let total = `Total: ${(price * (1 + VAT)).toFixed(2)}`;
console.log(total);

text = "HELLO WORLD";
let char = text.charAt(0);
console.log(char)//H


text = "HELLO WORLD";
char = text.charCodeAt(0);
console.log(char);//72--H

text = "hELLO WORLD";
let code = text.codePointAt(0);
console.log(code)//104--h


const nameSite = "W3Schools";
let letter = nameSite[2];
console.log(letter);//S

text = "HELLO WORLD";
text[0] = "A";  //HELLO WORLD
console.log(text);//does not work

let text1 = "Hello";
let text2 = "World";
let text3 = text1.concat(" ", text2);
console.log(text3);
//OR
text = "Hello" + " " + "World!";
text = "Hello".concat(" ", "World!");

// slice(start, end)========== extracts a part of a string and returns the extracted part in a new string.
// substring(start, end)======same as slice but start and end values less than 0 are treated as 0 in substring().
// substr(start, length)======The substr() method is removed (deprecated) in the latest JavaScript standard.



text = "Apple, Banana, Kiwi";
let part = text.slice(7, 13);
console.log(part);//Banana

// If you omit the second parameter, the method will slice out the rest of the string:
text = "Apple, Banana, Kiwi";
part = text.slice(7);//Banana, Kiwi
console.log(part);

// If a parameter is negative, the position is counted from the end of the string:
text = "Apple, Banana, Kiwi";
part = text.slice(-12);
console.log(part);//Banana, Kiwi

// This example slices out a portion of a string from position -12 to position -6:
text = "Apple, Banana, Kiwi";
part = text.slice(-12, -6);
console.log(part);//Banana

let str = "Apple, Banana, Kiwi";
part = str.substring(7, 13);
console.log(part);//Banana

text1 = "Hello World!";
text2 = text1.toUpperCase();
console.log(text2);//HELLO WORLD!

text1 = "Hello World!";
text2 = text1.toLowerCase();
console.log(text2);//hello world!

// The trim() method removes whitespace from both sides of a string:
 text1 = "      Hello World!      f    ";
 text2 = text1.trim();
console.log(text2);//Hello World!      f

// The trimStart() method works like trim(), but removes whitespace only from the start of a string.
text1 = "     Hello World!  "  ;
text2 = text1.trimStart();
console.log(text2);//Hello World!   

//similarly their is trimEnd();

text1 = "     Hello World!     ";
text2 = text1.trimEnd();
console.log(text2);//     Hello World!

// The padStart() method pads a string from the start.
//The padEnd() method pads a string from the End.
// The padStart() method is a string method.

// To pad a number, convert the number to a string first.
text = "5";
let padded = text.padStart(4,"0");
console.log(padded);//0005
 text = "5";
 padded = text.padStart(4,"x");
 console.log(padded);//xxx5

 let numb = 5;
text = numb.toString();
padded = text.padStart(4,"0");
console.log(padded);//0005

text = "5";
padded = text.padEnd(4,"0");
console.log(5000)//5000

    // repeat()
// The repeat() method returns a string with a number of copies of a string.
// The repeat() method returns a new string.
// The repeat() method does not change the original string.
text = "Hello world!";
let result = text.repeat(4);
console.log(result)//Hello world!*4

// The replace() method replaces a specified value with another value in a string:
// The replace() method does not change the string it is called on. and also case sensitive
// The replace() method returns a new string.
// The replace() method replaces only the first match
// If you want to replace all matches, use a regular expression with the /g flag set. See examples below.
text = "Please visit Microsoft!";
let newText = text.replace("Microsoft", "W3Schools");
console.log(newText);//Please visit W3Schools!

// To replace case insensitive, use a regular expression with an /i flag (insensitive):

text = "Please visit Microsoft!";
newText = text.replace(/MICROSOFT/i, "W3Schools");
console.group(newText);//Please visit W3Schools!

// To replace all matches, use a regular expression with a /g flag (global match):
text = "Please visit Microsoft and Microsoft!";
newText = text.replace(/Microsoft/g, "W3Schools");
console.log(newText);//Please visit W3Schools and W3Schools!

// string---->array
// A string can be converted to an array with the split() method:
text = "a,b,c,d,e,f";
const myArray = text.split(",");
console.log(myArray[1]);//b

//seraching in array

// The indexOf() method returns the index (position) of the first occurrence of a string in a string, or it returns -1 if the string is not found:
text = "Please locate where 'locate' occurs!";
let index = text.indexOf("locate");
console.log(index);//7

// The lastIndexOf() method returns the index of the last occurrence of a specified text in a string:
text = "Please locate where 'locate' occurs!";
index = text.lastIndexOf("locate");
console.log(index)//21


// ***indexOf(), and lastIndexOf() return -1 if the text is not found:'

text = "Please locate where 'locate' occurs!";
index=text.search("locate");
console.log(index)//7
// The search() method cannot take a second start position argument.
// The indexOf() method cannot take powerful search values (regular expressions).


// The match() method returns an array containing the results of matching a string against a string (or a regular expression).
// Perform a search for "ain":

text = "The rain in SPAIN stays mainly in the plain";
index=text.match("ain");
console.log(index)
// Perform a search for "ain":

text = "The rain in SPAIN stays mainly in the plain";
index=text.match(/ain/);
console.log(index)
// Perform a global search for "ain":

text = "The rain in SPAIN stays mainly in the plain";
index=text.match(/ain/g);
console.log(index)
// Perform a global, case-insensitive search for "ain":

text = "The rain in SPAIN stays mainly in the plain";
index=text.match(/ain/gi);
console.log(index)//first index in valur then it make and array with all upper and lower case ain in sentence case insensiive

// The includes() method returns true if a string contains a specified value.
// Otherwise it returns false.

// Check if a string includes "world":
text = "Hello world, welcome to the universe.";
index=text.includes("world");
console.log(index)//true
// Check if a string includes "world". Start at position 12:

text = "Hello world, welcome to the universe.";
index=text.includes("world", 12);
console.log(index)//false


//startsWith and eendWith
text = "Hello world, welcome to the universe.";
text.startsWith("world", 6)//true