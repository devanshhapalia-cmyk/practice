class Person {
    private name: string;

    public constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
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
    public constructor(private name: string) {
    }
    public getNames(): string {
        return this.name
    }

}
const person1 = new person2("Devansh")
console.log(person1.getNames());

//implements
interface shape {
    getArea: () => number;

}
class polygon implements shape {
    public constructor(protected readonly g: number, protected readonly h: number) { }
    public getArea(): number {
        return this.g * this.h;
    }
}

const myRect = new polygon(10, 20);

console.log(myRect.getArea());

//extends
interface Shape2 {
  getArea: () => number;
}

class Rectangle2 implements Shape2 {
  public constructor(protected readonly width: number, protected readonly height: number) {}

  public getArea(): number {
    return this.width * this.height;
  }
}

class Square extends Rectangle2 {
  public constructor(width: number) {
    super(width, width);
  }

  // getArea gets inherited from Rectangle
}

const mySq = new Square(20);

console.log(mySq.getArea());

interface Shape {
  getArea: () => number;
}

class Rectangle3 implements Shape2 {
  // using protected for these members allows access from classes that extend from this class, such as Square
  public constructor(protected readonly width: number, protected readonly height: number) {}

  public getArea(): number {
    return this.width * this.height;
  }

  public toString(): string {
    return `Rectangle[width=${this.width}, height=${this.height}]`;
  }
}

class Square2 extends Rectangle3 {
  public constructor(width: number) {
    super(width, width);
  }

  // this toString replaces the toString from Rectangle
  public override toString(): string {
    return `Square[width=${this.width}]`;
  }
}

const mySq2 = new Square(20);

console.log(mySq2.toString());

//Abstract Class

abstract class Polygon {
  public abstract getArea(): number;

  public toString(): string {
    return `Polygon[area=${this.getArea()}]`;
  }
}

class Rectangle4 extends Polygon {
  public constructor(protected readonly width: number, protected readonly height: number) {
    super();
  }

  public getArea(): number {
    return this.width * this.height;
  }
}

const myRect2 = new Rectangle4(10,20);

console.log(myRect2.getArea());