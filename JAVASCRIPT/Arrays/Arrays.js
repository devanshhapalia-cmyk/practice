const cars = ["Saab", "Volvo", "BMW"];//array
//OR
const cars1 = [];
cars[0]= "Saab";
cars[1]= "Volvo";
cars[2]= "BMW";
//OR
const cars2 = new Array("Saab", "Volvo", "BMW");
//changing the array element
cars[0] = "Opel";
console.log(cars);
console.log(typeof cars);

//Array Elements Can Be Objects
function myFunction(){
    return this;
}
const myArray=new Array();
myArray[0] = Date.now;
myArray[1] = myFunction;
myArray[2] = cars;
console.log(myArray);


//adding element in array
console.log(`Before adding:${cars}`);
cars.push('MG');
console.log(`After adding:${cars}`);

const fruits = ["Banana", "Orange", "Apple"];
// fruits[6] = "Lemon";  // Creates undefined "holes" in fruits
// console.log(fruits[5]);//undefined

//The join() method also joins all array elements into a string.
console.log(fruits.join("*"));
const fruits1 = ["Banana", "Orange", "Apple", "Mango"];
fruits1.pop();

console.log(fruits1);

//The shift() method removes the first array element and "shifts" all other elements to a lower index.

const fruits2 = ["Banana", "Orange", "Apple", "Mango"];
fruits2.shift();
console.log(fruits2)

const fruits3= ["Banana", "Orange", "Apple", "Mango"];
fruits3.unshift("Lemon");
console.log(fruits3);

const myGirls = ["Cecilie", "Lone"];
const myBoys = ["Emil", "Tobias", "Linus"];

const myChildren = myGirls.concat(myBoys);//for 3 array arr1.concat(arr2,arr3);
console.log(myChildren);

// The splice() method can be used to add new items to an array:

const fruits4 = ["Banana", "Orange", "Apple", "Mango"];
fruits4.splice(2, 0, "Lemon", "Kiwi");
console.log(fruits4);
const fruits5 = ["Banana", "Orange", "Apple", "Mango"];
fruits5.splice(2, 2, "Lemon", "Kiwi");
console.log(fruits5);

const fruits6 = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
const citrus = fruits6.slice(1);
console.log(citrus);

const fruits7 = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
const citrus1 = fruits7.slice(1, 3);console.log(citrus1);

fruits.includes("Mango"); // is true if fruits array contain mango else false


const numbers = [4, 9, 16, 25, 29];
let first = numbers.find(myFunction);//only function is given 
console.log(first);
function myFunction(value, index, array) {
  return value > 18;
}
fruits.sort();
console.log(fruits);

fruits.reverse();
console.log(fruits);

//sorting in array
const points = [40, 100, 1, 5, 25, 10];
points.sort(function(a, b){return a - b});
console.log(points);//lowest calue at points[0]

//highest value at  point[0]
points.sort(function(a, b){return b - a});
console.log(points);

//filter

const numbers1 = [45, 4, 9, 16, 25];
const over18 = numbers1.filter(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
console.log(over18);

//const array can't be reassigned


