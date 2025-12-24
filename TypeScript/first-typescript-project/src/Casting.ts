//Casting in typescipt is done by as keyword
let s: unknown = 'hello';
console.log((s as string).length);
let n: unknown = 4;
console.log((n as string).length);//print undefined becase number do not have length

// console.log((4 as string).length); // Error: Conversion of type 'number' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.


let m: unknown = 'hello';
console.log((<string>m).length);

// Force casting
// To override type errors that TypeScript may throw when casting, first cast to unknown, then to the target type.
let r = 'hello';
// console.log(((r as unknown) as number).length); // x is not actually a number so this will return error
