"use strict";
// Key Advanced Type Features
// Mapped Types: Transform properties of existing types
// Conditional Types: Create types based on conditions
// Template Literal Types: Build types using string templates
// Utility Types: Built-in type helpers for common transformations
// Recursive Types: Self-referential types for tree-like structures
// Type Guards & Type Predicates: Runtime type checking
// Type Inference: Advanced pattern matching with infer
const user1 = { id: 1, name: "Alice", email: "alice@example.com" };
function createFlags(obj) {
    const out = {};
    for (const k in obj)
        out[k] = true;
    return out;
}
const userFlags = createFlags(user1);
console.log(userFlags.id);
console.log(userFlags.name);
console.log(userFlags.email);
const arr = [1, 2, 3];
console.log(typeof arr[0]); // 'number'
function isString(x) {
    return typeof x === "string";
}
console.log(isString("hello")); // true
console.log(isString(42)); // false
const validGreeting = "Hello, World!";
console.log(validGreeting);
const examples = ["red-small", "green-medium", "blue-large"];
console.log(JSON.stringify(examples));
const user2 = {
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
//# sourceMappingURL=AdvanceType.js.map