// JSON stands for JavaScript Object Notation.

// JSON is a plain text format for storing and transporting data.

// JSON is similar to the syntax for creating JavaScript objects.

// JSON is used to send, receive and store data.

// e.g.'{"name":"John", "age":30, "car":null}'

// JavaScript has a built in function for converting JSON strings into JavaScript objects:

// JSON.parse()

// JavaScript also has a built in function for converting an object into a JSON string:

// JSON.stringify()

let text = '{ "employees" : [' +
'{ "firstName":"John" , "lastName":"Doe" },' +
'{ "firstName":"Anna" , "lastName":"Smith" },' +
'{ "firstName":"Peter" , "lastName":"Jones" } ]}';
const obj = JSON.parse(text);
console.log(obj);

text = '["Ford", "BMW", "Audi", "Fiat"]';
const myArr = JSON.parse(text);
console.log(myArr)

text = '{"name":"John", "age":"function () {return 30;}", "city":"New York"}';
obj1 = JSON.parse(text);
obj1.age = eval("(" + obj1.age + ")");

console.log(obj1.name + ", " + obj1.age());

obj2 = {name: "John", age: 30, city: "New York"};
const myJSON = JSON.stringify(obj2);
console.log(myJSON);

text = ["Ford", "BMW", "Audi", "Fiat"];
console.log(JSON.stringify(text));

//js value in to string
const num = 123e-5;
myJSON1 = JSON.stringify(num);
console.log(myJSON1)

obj3 = {name: "John", today: new Date(), city : "New York"};//date object to date string

myJSON2 = JSON.stringify(obj3);
console.log(myJSON2);

//stringify will remove the function key value if present in object 

obj4 = {name: "John", age: function () {return 30;}, city: "New York"};
myJSON3 = JSON.stringify(obj4);

console.log(myJSON3)//{"name":"John","city":"New York"}
// for this solution is before stringify convert it to string 
obj4.age = obj4.age.toString();
 myJSON3 = JSON.stringify(obj4);
console.log(myJSON3)

//iterating in JSON
const myJSON4 = '{"name":"John", "age":30, "car":null}';
const myObj = JSON.parse(myJSON4);

text = "";
for (const x in myObj) {
  text += myObj[x] + ", ";
}
console.log(text);