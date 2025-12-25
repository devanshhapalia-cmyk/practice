// Return type is inferred as string
function greet2(name: string) {
  return `Hello, ${name}!`;
}

// Return type is inferred as number
function adds(a: number, b: number) {
  return a + b;
}

// Return type is inferred as string | number
function getValue(key: string) {
   if (key === "name") {
    return "Alice";
   } else {
    return 42;
   }
}
// Using the inferred return types
let greeting2 = greet2("Bob"); // inferred as string
console.log(greeting2);
let sum = adds(5, 3); // inferred as number
console.log(sum)
let value = getValue("age"); // inferred as string | number
console.log(value);


//Contextual typing
// The type of the callback parameter is inferred from the array method context
const Names = ["Alice", "Bob", "Charlie"];

// Parameter 'name' is inferred as string
Names.forEach(name => {
  console.log(name.toUpperCase());
});

// Parameter 'name' is inferred as string, and the return type is inferred as number
const nameLengths = Names.map(name => {
  return name.length;
});

// nameLengths is inferred as number[]
console.log(nameLengths);


//type inference in object literals
// TypeScript infers the type of this object
const Users = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  active: true,
  details: {
    age: 30,
    address: {
      city: "New York",
      country: "USA"
    }
  }
};

// Accessing inferred properties
console.log(Users.name.toUpperCase());
console.log(Users.details.age);
console.log(Users.details.address.city.toLowerCase());
