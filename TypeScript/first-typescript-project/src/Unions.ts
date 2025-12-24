// Union | (OR)
// Using the | we are saying our parameter is a string or number:

function printStatusCode(code: string | number) {
  console.log(`My status code is ${code}.`)
}

printStatusCode(404);
printStatusCode('404');
// function printStatusCode(code: string | number) {
//   console.log(`My status code is ${code.toUpperCase()}.`) // error: Property 'toUpperCase' does not exist on type 'string | number'. Property 'toUpperCase' does not exist on type 'number'
// }