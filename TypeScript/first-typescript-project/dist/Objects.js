"use strict";
const car = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
};
console.log(car);
car.type = "Ford"; // no error
//car.type = 2; // Error: Type 'number' is not assignable to type 'string'.
// const car1: { type: string, mileage: number } = { // Error: Property 'mileage' is missing in type '{ type: string; }' but required in type '{ type: string; mileage: number; }'.
//   type: "Toyota",
// };
// car1.mileage = 2000;
const car1 = {
    type: "Toyota"
};
car1.mileage = 2000;
console.log(car1);
const nameAgeMap = {};
nameAgeMap.Devansh = 21; // no error { Jack: 25 }
// nameAgeMap.Mark = "Fifty"; // Error: Type 'string' is not assignable to type 'number'.
console.log(nameAgeMap);
//# sourceMappingURL=Objects.js.map