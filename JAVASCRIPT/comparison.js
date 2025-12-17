
// 2 < 12	true	
// 2 < "12"	true	
// 2 < "John"	false	
// 2 > "John"	false	
// 2 == "John"	false	
// "2" < "12"	false	
// "2" > "12"	true	
// "2" == "12"	false
// false: The boolean keyword.
// 0, -0: The number zero and negative zero.
// 0n: BigInt zero.
// "", '', ``: Empty strings of any quote type.
// null: The absence of any value.
// undefined: A variable that has not been assigned a value.
// NaN: "Not a Number," resulting from invalid mathematical operations.
// document.all: A unique, legacy browser object that is falsy for backward compatibility. 
Boolean("" ?? "abc");
// console.log(s);

console.log("=== Equality vs Strict Equality ===");
console.log(0 == false);        // true
console.log(0 === false);       // false
console.log("" == false);       // true
console.log("" === false);      // false
console.log(null == undefined); // true
console.log(null === undefined);// false

console.log("\n=== Number & String Comparisons ===");
console.log("5" == 5);          // true
console.log("5" === 5);         // false
console.log("10" > 2);          // true (string converted to number)
console.log("2" > "10");       // true (string comparison)

console.log("\n=== NaN Comparisons ===");
console.log(NaN == NaN);         // false
console.log(NaN === NaN);        // false
console.log(isNaN(NaN));         // true
console.log(Number.isNaN(NaN));  // true

console.log("\n=== null Comparisons ===");
console.log(null == 0);          // false
console.log(null > 0);           // false
console.log(null >= 0);          // true (null becomes 0)

console.log("\n=== undefined Comparisons ===");
console.log(undefined == 0);     // false
console.log(undefined > 0);      // false
console.log(undefined < 0);      // false

console.log("\n=== Boolean Comparisons ===");
console.log(true == 1);          // true
console.log(true === 1);         // false
console.log(false == 0);         // true

console.log("\n=== Array Comparisons ===");
console.log([] == false);        // true

console.log(false === []);        // false

console.log([] == 0);            // true
console.log([1] == 1);           // true
console.log([1,2] == "1,2");     // true
// console.log([] === []);          // false (different references)

console.log("\n=== Object Comparisons ===");
console.log({} == {});           // false
// console.log({} === {});          // false

const a = {};
const b = a;
console.log(a === b);            // true

console.log("\n=== + and !! Tricks ===");
console.log(+true);              // 1
console.log(+false);             // 0
console.log(!!"hello");          // true
console.log(!!"");               // false

console.log("\n=== Weird Ones ===");
console.log(0.1 + 0.2 === 0.3);  // false (floating-point issue)
console.log("\t" == 0);          // true
console.log("\n" == 0);          // true
console.log(" " == 0);           // true
