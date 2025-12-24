"use strict";
let summation = {};
summation.a = 10;
console.log(summation.b); //undefined
let summation1 = { a: 10, b: 10 }; //Required Forces to assign the value of b unless it is optional.
let summation2 = { a: 10, b: 10 }; //Record is used to define the type of key and value pair.
console.log(summation2); //{ a: 10, b: 10 }
let summation3 = { c: 10 }; //Omit is used to remove the key from the interface.
let summation4 = { a: 10, b: 10 }; //Pick is used to select the key from the interface.
let summation5 = "c"; //Exclude is used to exclude the key from the type.
let summation6 = "d";
//UTILITY TYPE: ReturnType
function smFn7() {
    return 100;
}
// let summation7: ReturnType<typeof smFn7> = "A"; //This will give error because the return type of smFn7 is number.
let summation8 = 100;
//UTILITY TYPE: Parameters
function smFn9(a, b) {
    return a + b;
}
let summation9 = [10, 20]; //This will give the type of the parameters of the function.
let summation10 = { a: 10, b: 10 }; //Readonly is used to make the object readonly.
// summation10.a=20; //This will give error because the object is readonly.
//# sourceMappingURL=utilityTypes.js.map