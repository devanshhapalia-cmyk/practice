// The Object.prototype is on the top of the prototype inheritance chain:
// Date objects, Array objects, and Person objects inherit from Object.prototype.
function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
}

Person.prototype.nationality = "English";//prototype property allows you to add new properties to object constructors:

Person.prototype.name = function () {//prototype property also allows you to add new methods to objects constructors:
    return this.firstName + " " + this.lastName;
};


//Object iteration
// Copies properties from a source object to a target object
// Object.assign(target, source)

// // Creates an object from an existing object
// Object.create(object)

// // Returns an array of the key/value pairs of an object
// Object.entries(object)

// // Creates an object from a list of keys/values
// Object.fromEntries()

// // Returns an array of the keys of an object
// Object.keys(object)

// // Returns an array of the property values of an object
// Object.values(object)

// // Groups object elements according to a function
// Object.groupBy(object, callback)
const person1 = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue"
};

// Create Source Object
const person2 = { firstName: "Anne", lastName: "Smith" };

// Assign Source to Target
Object.assign(person1, person2);
console.log(person1);//[
//     ['firstName', 'Anne'],
//     ['lastName', 'Smith'],
//     ['age', 50],
//     ['eyeColor', 'blue']
// ]

// Object.entries() returns an array of the key/value pairs in an object:
let text = Object.entries(person1);//object to array
console.log(text);

// fromEntries() method creates an object from a list of key/value pairs.

const fruits = [
    ["apples", 300],
    ["pears", 900],
    ["bananas", 500]
];

const myObj = Object.fromEntries(fruits);
console.log(myObj);//array to object

// Object.values() is similar to Object.entries(), but returns a single dimension array of the object values:
text = Object.values(person1);
console.log(text);//[ 'Anne', 'Smith', 50, 'blue' ]


const fruits2 = [
  {name:"apples", quantity:300},
  {name:"bananas", quantity:500},
  {name:"oranges", quantity:200},
  {name:"kiwi", quantity:150}
];

// Callback function to Group Elements
function myCallback({ quantity }) {
  return quantity > 200 ? "ok" : "low";
}

// Group by Quantity
//const result = Object.groupBy(fruits2, myCallback);//only added  in  2024 Js
//console.log(result);//further access as result.ok.enteries;

// Object.keys() method returns an array with the keys of an object.

//GETTER AND SETTER

 const person3 = {
  firstName: "John",
  lastName: "Doe",
  language: "en",
//   get lang() {
//     return this.language;
//   }
  set lang(lang) {
    this.language = lang;
  }
};
// console.log(person3.lang);-----en
person3.lang = "fr";
console.log(person3.language);//---fr



// Object.preventExtensions() method prevents adding properties to an object.
// Create Object
const person4= {firstName:"John", lastName:"Doe"};

// Prevent Extensions
Object.preventExtensions(person4);

// This will throw an error
person4.nationality = "English";
console.log(person4.nationality);//undefined---throws error
let answer = Object.isExtensible(person4);
// Object.isExtensible() returns true if an object is extensible
console.log(answer);//false


// The Object.seal() method prevents additions or deletions of new properties.

// The Object.seal() method makes existing properties non-configurable.

// The Object.isSealed() method can be used to check if an object is sealed.

// Note
// The Object.seal() method will fail silently in non-strict mode and throw a TypeError in strict mode.

const person5 = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};

// Seal Object
Object.seal(person5)

// This will throw an error
delete person5.age;
answer = Object.isSealed(person5);
console.log(answer)//true

// Object.freeze() method prevents any changes to an object.
const person6 = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};

// Freeze Object
Object.freeze(person6)

// This will throw an error
person6.age = 51;
console.log(person6.age);//50
console.log(Object.isFrozen(person6));//true