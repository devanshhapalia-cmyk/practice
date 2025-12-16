// Object in javascript are the collections of key-value pair./
// object should be declared uisng const keyword 
//we can modify the object value
const person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
//OR

const person1 = {};

// Add Properties
person1.firstName = "John";
person1.lastName = "Doe";
person1.age = 50;
person1.eyeColor = "blue";

//OR
const person2 = new Object({
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

delete person.age;
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

