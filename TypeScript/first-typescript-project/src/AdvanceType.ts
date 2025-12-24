// Key Advanced Type Features
// Mapped Types: Transform properties of existing types
// Conditional Types: Create types based on conditions
// Template Literal Types: Build types using string templates
// Utility Types: Built-in type helpers for common transformations
// Recursive Types: Self-referential types for tree-like structures
// Type Guards & Type Predicates: Runtime type checking
// Type Inference: Advanced pattern matching with infer

//1.Mapped Types
// Convert all properties to boolean
type Flags<T> = {
  [K in keyof T]: boolean;
};

interface User {
  id: number;
  name: string;
  email: string;
}

const user1: User = { id: 1, name: "Alice", email: "alice@example.com" };

function createFlags<T extends object>(obj: T): Flags<T> {
  const out: any = {};
  for (const k in obj) out[k] = true;
  return out;
}

const userFlags = createFlags(user1);
console.log(userFlags.id);
console.log(userFlags.name);
console.log(userFlags.email);

//2.Conditional Types
// Conditional types (runtime illustration)
type IsString<T> = T extends string ? true : false;
type ArrayElement<T> = T extends (infer U)[] ? U : never;

const arr = [1, 2, 3];
console.log(typeof arr[0]); // 'number'

function isString(x: unknown): boolean {
  return typeof x === "string";
}
console.log(isString("hello")); // true
console.log(isString(42));      // false

//3.Template Literal Types
// Template literal types (runtime illustration)
type Greeting = `Hello, ${string}`;
const validGreeting: Greeting = "Hello, World!";
console.log(validGreeting);

// Style pattern
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";
type Style = `${Color}-${Size}`;

const examples: Style[] = ["red-small", "green-medium", "blue-large"];
console.log(JSON.stringify(examples));

//3.Utility Types
// Utility types (runtime illustration)
interface User2 {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

const user2: User2 = {
  id: 1,
  name: "Ann",
  email: "ann@example.com",
  createdAt: new Date("2020-01-01T00:00:00Z"),
};

// Pick / Omit demo at runtime
const preview = { id: user2.id, name: user2.name };
const withoutEmail = { id: user2.id, name: user2.name, createdAt: user2.createdAt };
console.log(JSON.stringify(preview));
console.log(JSON.stringify(withoutEmail));