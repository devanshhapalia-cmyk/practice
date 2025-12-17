import {add} from './Math.js'

let a=add(2,3);
console.log(a);

//export many thing like variable, function, object, class

//named export {} what ever you want to export should be enclosed within {} and the same name should be used to access it.

// Named imports are constructed using curly braces:---Import names must match export names:
// import { name, age } from "./person.js";

// Default exports are not:
// import message from "./message.js";

// //EXAMPLE
// Module File
// export default function parse() { ... }

// export function validate() { ... }
// export function format() { ... }
// Module Script
// import parse, { validate, format } from './parser.js';

//usig * we can import all at once

// import * as math from "./math.js";

