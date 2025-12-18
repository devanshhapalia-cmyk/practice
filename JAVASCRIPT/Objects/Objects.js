// Object in javascript are the collections of key-value pair./
// object should be declared uisng const keyword 
//we can modify the object value
const person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};//object literals
//OR
person.height=10;
console.log(person);

const person1 = {};

// Add Properties
person1.firstName = "John";
person1.lastName = "Doe";
person1.age = 50;
person1.eyeColor = "blue";

//OR
const person2 = new Object({//using new keyword
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
});

// accessing the object 
// objectName.propertyName
// objectName["propertyName"]
console.log(person.lastName,
person1["lastName"]);

// function can also be used as value and invoke from key
const person3 = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566,
  fullName : function() {
    return this.firstName + " " + this.lastName;//this conetxt is used to refer to the person3 object
  }
};
console.log(person3.fullName());

// object can also be initialize through contructor

function Person4(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
}
Person4.height=10;
const p=new Person4("devansh","hapalia",20,"brown");
console.log(p);

// In JavaScript, almost "everything" is an object.

// Objects are objects
// Maths are objects
// Functions are objects
// Dates are objects
// Arrays are objects
// Maps are objects
// Sets are objects
// All JavaScript values, except primitives, are objects.

// JavaScript Primitives
// A primitive data type is data type that can only store a single primitive value.

// JavaScript defines 7 types of primitive data types:

// Type	Example value
// string	========"Hello"
// number	========3.14
// boolean	========true
// bigint	========12345678901234
// null	============null
// undefined	====undefined
// symbol	========symbol
// Learn


// Default value can also be provided by the object in the contructor
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
  this.nationality = "English";
}

//Deleting the property from the object 
const person5 = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};
delete person.age;//OR
delete person["age"];


//also allowed to nest the object 
const myObj = {
  name:"John",
  age:30,
  myCars: {
    car1:"Ford",
    car2:"BMW",
    car3:"Fiat"
  }
}

//different ways to access the nest key-value pair is by 
myObj.myCars.car2;
myObj.myCars["car2"];
myObj["myCars"]["car2"];
let p1 = "myCars";
let p2 = "car2";
myObj[p1][p2];


//Iterating through the object by for...in loop
const person6 = {
  name: "John",
  age: 30,
  city: "New York"
};

// Build a Text
let text = "";
for (let x in person6) {
  text += person6[x] + " ";
};
console.log(text);//John 30 New York 


// Create an Array
const myArray = Object.values(person6);
console.log(`Object in array : ${myArray}`);//Object in array : John,30,New York
// Stringify the Array
text = myArray.toString();
console.log(`stringify the object: ${text}`);//stringify the object: John,30,New York


// Object.entries() makes it simple to use objects in loops:

const fruits = {Bananas:300, Oranges:200, Apples:500};

text = "";
for (let [fruit, value] of Object.entries(fruits)) {
  text += fruit + ": " + value+" ";
}
console.log(text);//Bananas: 300 Oranges: 200 Apples: 500 


//creating object from another object
// Create an Object:
const person7 = {
  firstName: "John",
  lastName: "Doe"
};

// Create new Object
const man = Object.create(person7);
man.firstName = "Peter";
person7.firstName = "Peter";
console.log(man.firstName);
console.log(person7.firstName);

//from array to object
const fruits1 = [
["apples", 300],
["pears", 900],
["bananas", 500]
];

const myObj1 = Object.fromEntries(fruits1);
console.log(`pears=${myObj1.pears}`);

//object.assign() method copies one or more source objecct properties to target properties
// Create Target Object
const person8 = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};

// Create Source Object
const person9 = {firstName: "Anne",lastName: "Smith"};
const person10 = {age: 22,eyeColor: "brown"};
// Assign Source to Target
Object.assign(person8, person9,person10);
console.log(person8.firstName);console.log(person8.age);

//To add property in contructor we can't simple add it but must add through constructor function prototype
Person4.nationality = "English";
console.log(p.nationality);//Undefiend
Person4.prototype.nationality = "English";
console.log(p.nationality);//English

//adding method to a constructor
Person4.prototype.changeName = function (name) {
  this.lastName = name;
}

p.changeName("Doe");
console.log(p);


//Object Destructuring
// Create an Object
const person11 = {
  firstName: "John",
  lastName: "Doe",
  age: 50
};

// Destructuring
let {firstName, lastName:last} = person11;//Object Property Alias -------once alias applied the original name  can be used to access the value the alias only have to be used.
console.log(last);

console.log(`${firstName}`+" "+`${last}`);//John Doe---------order doest not matter
const person12 = {
  fName: "John",
  lName: "Doe",
  age: 50
};
// Destructuring
let {lName,fName} = person12;
console.log(`${fName}`+" "+`${lName}`);

// Create a String
let name2 = "W3Schools";

// Destructuring
let [a1, a2, a3, a4, a5] = name2;
console.log(a1);//W
console.log(a5);//h

// Create an Array
const fruits3 = ["Bananas", "Oranges", "Apples", "Mangos"];

// Destructuring
let [fruit1,,,fruit2] = fruits3;
console.log(`fruit1: ${fruit1} and fruit2: ${fruit2}`); 

let [first,...rest]=fruits3;
console.log(`first: ${first} rest: ${rest}`);//similary  we can do in object s also

// Create a Map
const fruits6 = new Map([
  ["apples", 500],
  ["bananas", 300],
  ["oranges", 200]
]);

// Destructuring
text = "";
for (const [key, value] of fruits6) {
  text += key + " is " + value+" ";
}
console.log(text);