"use strict";
class Person {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
const person = new Person("Jane");
console.log(person.getName());
// There are three main visibility modifiers in TypeScript.
// public - (default) allows access to the class member from anywhere
// private - only allows access to the class member from within the class
// protected - allows access to the class member from itself and any classes that inherit it, which is covered in the inheritance section below
//Parameter Properties
class person2 {
    // private readonly name:string ---can not be assign new value after once assign.
    constructor(name) {
        this.name = name;
    }
    getNames() {
        return this.name;
    }
}
const person1 = new person2("Devansh");
console.log(person1.getNames());
class polygon {
    constructor(g, h) {
        this.g = g;
        this.h = h;
    }
    getArea() {
        return this.g * this.h;
    }
}
const myRect = new polygon(10, 20);
console.log(myRect.getArea());
class Rectangle2 {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}
class Square extends Rectangle2 {
    constructor(width) {
        super(width, width);
    }
}
const mySq = new Square(20);
console.log(mySq.getArea());
class Rectangle3 {
    // using protected for these members allows access from classes that extend from this class, such as Square
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
    toString() {
        return `Rectangle[width=${this.width}, height=${this.height}]`;
    }
}
class Square2 extends Rectangle3 {
    constructor(width) {
        super(width, width);
    }
    // this toString replaces the toString from Rectangle
    toString() {
        return `Square[width=${this.width}]`;
    }
}
const mySq2 = new Square(20);
console.log(mySq2.toString());
//Abstract Class
class Polygon {
    toString() {
        return `Polygon[area=${this.getArea()}]`;
    }
}
class Rectangle4 extends Polygon {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}
const myRect2 = new Rectangle4(10, 20);
console.log(myRect2.getArea());
//# sourceMappingURL=Classes.js.map