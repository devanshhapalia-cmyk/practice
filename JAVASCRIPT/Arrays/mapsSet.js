//SETS

// Passing an array to new Set()
// Create an empty set and use add() to add values

const letters = new Set(["a","b","c"]);
//OR
const letters1 = new Set();

// Add Values to the Set
letters1.add("a");
letters1.add("b");
letters1.add("c");

//OR
const letters2 = new Set();

// Create Variables
const a = "a";
const b = "b";
const c = "c";

// Add Variables to the Set
letters2.add(a);
letters2.add(b);
letters2.add(c);
letters2.add(c);//will not get store it store 'c' only one time
//methods
// new Set()
// add()
// clear()
// delete()
// entries()
// forEach()
// has()
// keys()
// values()
console.log(letters.size);

// List all Elements
let text = "";
for (const x of letters) {
  text += x;
}
console.log(text);
//OR
text = "";
letters.forEach (function(value) {
  text += value;
})
console.log(text);

let answer = letters.has("d");
console.log(answer);

const myIterator = letters.keys();

// List all Elements
text = "";
for (const x of myIterator) {
  text += x;
}
console.log(text);

// union()
// difference()
// intersection()
// isDisjointFrom()
// isSubsetOf()
// isSupersetOf()
// symmetricDifference()

//WEAKSET
// A JavaScript WeakSet is a collection of values where the values must be objects.

// Create a WeakSet
let mySet = new WeakSet();

// Create an Object
let myObj = {fname:"John", lname:"Doe"};

// Add the Object
mySet.add(myObj);

// Do I have myObj in the mySet?
answer = mySet.has(myObj);
console.log(answer);

//map
// Create an empty Map
const fruits = new Map();

// Set Map Values
fruits.set("apples", 500);
fruits.set("bananas", 300);
fruits.set("oranges", 200);
console.log(fruits);


//OR
// Create a Map
const fruits1 = new Map([
  ["apples", 500],
  ["bananas", 300],
  ["oranges", 200]
]);
console.log(fruits1);

//adding to map
fruits.set("mangos", 100);

//changing/Updating to map
fruits.set("apples", 200);

//get()  value from key
console.log(fruits.get("apples"))

//delete from map
fruits.delete("apples");


//remove all elements from map
fruits.clear();

console.log(fruits.has("apple"))//false because deleted above

//WEAKMAP
// Create a WeakMap
let myMap = new WeakMap();

// Create an Object
myObj = {fname:"John", lname:"Doe"};

// Set a WeakMap value
myMap.set(myObj, "player");

// Get the WeakMap value
let type = myMap.get(myObj);
console.log(type);