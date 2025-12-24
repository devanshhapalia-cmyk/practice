interface people {
    name: string;
    age: number;
}

// `keyof Person` here creates a union type of "name" and "age", other strings will not be allowed
function printPersonProperty(person: people, property: keyof people) {
    console.log(`Printing person property ${property}: "${person[property]}"`);
}

let people = {
    name: "Max",
    age: 27
};

printPersonProperty(people, "name"); // Printing person property name: "Max"s

//keyof with index signatures
type StringMap = { [key: string]: unknown };

// `keyof StringMap` resolves to `string` here
function createStringPair(property: keyof StringMap, value: string): StringMap {
  return { [property]: value };
}

console.log(JSON.stringify(createStringPair('greeting', 'hello')));