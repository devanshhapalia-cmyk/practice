
//CALL()------With the call() method, you can write a method that can be used on different objects.
// object can use  the method belonging to another object.
const person = {
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
}
const person1 = {
  firstName:"John",
  lastName: "Doe"
}
const person2 = {
  firstName:"Mary",
  lastName: "Doe"
}

// This will return "John Doe":
console.log(person.fullName.call(person1));
// This will return "Mary Doe"
console.log(person.fullName.call(person2));

//CALL() method with argument
const person3 = {
  fullName: function(city, country) {
    return this.firstName + " " + this.lastName + "," + city + "," + country;
  }
}

const person4 = {
  firstName:"John",
  lastName: "Doe"
}
console.log(person3.fullName.call(person4, "Oslo", "Norway"));


//APPLY METHOD 
//you can write a method  which can be used on different objects
// const person = {==========================SIMILAR TO CALL
//   fullName: function() {
//     return this.firstName + " " + this.lastName;
//   }
// }

// const person1 = {
//   firstName: "Mary",
//   lastName: "Doe"
// }

// // This will return "Mary Doe":
// person.fullName.apply(person1);


//DIFFERENCE BETWEEN APPLY AND CALL
//Call() take the argument separatly 
//Apply() take the argument in array


const person5 = {
  fullName: function(city, country) {
    return this.firstName + " " + this.lastName + "," + city + "," + country;
  }
}

const person6 = {
  firstName:"John",
  lastName: "Doe"
}

person5.fullName.apply(person6, ["Oslo", "Norway"]);

//BIND()-----an object can borrow method from another object.
const person7 = {
  firstName:"John",
  lastName: "Doe",
  fullName: function () {
    return this.firstName + " " + this.lastName;
  }
}

const member = {
  firstName:"Hege",
  lastName: "Nilsen",
}

let fullName = person7.fullName.bind(member);
console.log(fullName());

//bind method is used to prevent the losing of this context

//while using callback method this is lost
const person8 = {
  firstName:"John",
  lastName: "Doe",
  display: function () {
    console.log(this.firstName + " " + this.lastName);
  }
}

setTimeout(person8.display, 3000);//undefined firstName and lastName


const person9 = {
  firstName:"John",
  lastName: "Doe",
  display: function () {
   
   console.log(this.firstName + " " + this.lastName);
  }
}

let display = person9.display.bind(person9);
setTimeout(display, 3000);


//CLOSURE

// Global variables can be made local (private) with closures.

// undeclared variable are always  global 
let count=0;
function add(){
  count+=1;
}
add();
console.log(count);//1
add();
console.log(count);//2
add();
console.log(count);//3

//closure
function myCounter() {
  let counter = 0;
  return function() {
    counter++;
    return counter;
  };
}
const add1 = myCounter();
add1();
add1();
add1();

// the counter is now 4
console.log(add1());