const names: string[] = [];
names.push("Dylan"); // no error
console.log(names);
names.push("devansh");
console.log(names);
// names.push(15);----will give me error type number 


const users: readonly string[]=["devansh"];
// users.push("John");---willgive me error because i have made it readonly 
console.log(users)
names.push("jonny","jack");
console.log(names);

// push()
// slice()
// splice()
// reverse()
// reduce()
// concat()
// some()
// shift()
// map()
// indexOf()
// filter()
// reduceRight()
// join()
// pop()
// sort()
// unshift()
// forEach()
//     all method are the same as javascript

//Typed Array
// A tuple is a typed array with a pre-defined length and types for each index.
// define our tuple
let ourTuple: [number, boolean, string];

// initialize correctly
ourTuple = [5, false, 'Coding God was here'];
console.log(ourTuple);
// Even though we have a boolean, string, and number the order matters in our tuple and will throw an error.

ourTuple.push("something outside entered")
console.log(ourTuple);
//this can be a problem so make tuple readonly

let readTuple:readonly [number,string]=[1,"devansh"]


//destructuring tuple
const graph: [number, number] = [55.2, 41.3];
const [x, a] = graph;
console.log(x);
console.log(a);

