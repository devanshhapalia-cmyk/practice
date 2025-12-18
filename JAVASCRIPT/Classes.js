class Cars{
    constructor(name,year){
        this.name=name;
        this.year=year;
    }
    age(){
        const date=new Date();
        return date.getFullYear()-this.year;
    }
    changeName(x){
        this.name=x;
    }
}
const car1=new Cars("maruti","2010");
console.log(`Age is :${car1.age()}`);
car1.changeName('benz')
console.log(`change name then it become ${car1.name}`);

//inheritance in javascript
class Car {
  constructor(brand) {
    this.carname = brand;
  }
  present() {
    return 'I have a ' + this.carname;
  }
}

class Model extends Car {
  constructor(brand, mod) {
    super(brand);//automatically call the parent constructor
    this.model = mod;
  }
  show() {
    return this.present() + ', it is a ' + this.model;
  }
}

let myCar = new Model("Ford", "Mustang");
console.log(myCar.show());

class Car2 {
  constructor(brand) {
    this.carname = brand;
  }
  get cnam() {
    return this.carname;
  }
  set cnam(x) {
    this.carname = x;
  }
}
const car2=new Car2("Ford");
console.log(car2.cnam);
car2.cnam="alto";
console.log(car2.cnam);
//class are not hoisted as function  using class before declaration will provide an error


//static method can only be called by the object class and not by the object 
class Car3 {
  constructor(name) {
    this.name = name;
  }
  static hello() {
    return "Hello!!";
  }
}

const myCar1 = new Car("Ford");
//console.log(myCar1.hello)//error
console.log(Car3.hello());