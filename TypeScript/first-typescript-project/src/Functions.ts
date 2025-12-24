//Functions should specify the return type 
// the `: number` here specifies that this function returns a number
function getTime(): number {
  return new Date().getTime();
}
console.log(getTime());
//Optional Parameters
function add1(a: number, b: number, c?: number) {
  return a + b + (c || 0);
}
console.log(add1(1,2,3));
console.log(add1(1,2));
//Default Parameters
function pow(value: number, exponent: number = 10) {
  return value ** exponent;
}
console.log(pow(2));

//Named Parameters
function divide({ dividend, divisor }: { dividend: number, divisor: number }) {
  return dividend / divisor;
}
console.log(divide({dividend: 10, divisor: 2}));

//Rest Parameters
function add3(a: number, b: number, ...rest: number[]) {
  return a + b + rest.reduce((p, c) => p + c, 0);
}

console.log(add3(10,10,10,10,10));