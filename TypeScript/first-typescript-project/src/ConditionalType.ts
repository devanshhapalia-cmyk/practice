//Basic conditional Type Syntax
const checkIfString = (v:any) => {
  return typeof v === "string" ? true : false;
};

console.log("Is 'hello' a string?", checkIfString("hello")); // true
console.log("Is 42 a string?", checkIfString(42)); // false
console.log("Is a string literal a string?", checkIfString("TypeScript")); // true


//Conditional type with union
type extractType<T>=T extends string ?  T : never;
type stringOnly<T>=extractType<string|number|"hello">
let d:stringOnly<number>="hello";
console.log(d);

type OnlyStrings<T> = T extends string ? T : never;

type Mixed = string | number | boolean;
type StringsOnly = OnlyStrings<Mixed>;
const f:StringsOnly="e";
console.log(typeof f);
type Mixed1 = number | boolean;
type StringsOnly1= OnlyStrings<Mixed>;
// const g:StringsOnly1=true;
// console.log(typeof g);

//Type Inference with infer
type MyReturnType<T> =
  T extends (...args: any[]) => infer R ? R : never;
function getUser() {
  return {
    name: "Alice",
    age: 25,
  };
}
type User1 = MyReturnType<typeof getUser>;
const u1: User1 = {
    name:"devansh",
    age:21
};

console.log(u1.name); // Alice
console.log(u1.age);  // 25
