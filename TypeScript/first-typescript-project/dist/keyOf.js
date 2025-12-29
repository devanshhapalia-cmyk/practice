"use strict";
// `keyof Person` here creates a union type of "name" and "age", other strings will not be allowed
function printPersonProperty(person, property) {
    console.log(`Printing person property ${property}: "${person[property]}"`);
}
let people = {
    name: "Max",
    age: 27
};
printPersonProperty(people, "name"); // Printing person property name: "Max"s
// `keyof StringMap` resolves to `string` here
function createStringPair(property, value) {
    return { [property]: value };
}
console.log(JSON.stringify(createStringPair('greeting', 'hello')));
//# sourceMappingURL=keyOf.js.map