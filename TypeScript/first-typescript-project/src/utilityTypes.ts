// UTILITY TYPE: Partial
//Assigning the value is optional
interface smFn
{
    a:number;
    b?:number;
}

let summation: Partial<smFn> = {};
summation.a=10;
console.log(summation.b);//undefined

// UTILITY TYPE: Required
interface smFn1
{
    a:number;
    b:number;
}
let summation1: Required<smFn> = {a:10,b:10}; //Required Forces to assign the value of b unless it is optional.

// UTILITY TYPE: Record
interface smFn2
{
    a:number;
    b:number;
}
let summation2: Record<string, number> = {a:10,b:10}; //Record is used to define the type of key and value pair.
console.log(summation2);    //{ a: 10, b: 10 }

//UTILITY TYPE: Omit
interface smFn3
{
    a:number;
    b:number;
    c:number;
}
let summation3: Omit<smFn3, "b"|"a"> = {c:10}; //Omit is used to remove the key from the interface.

//UTILITY TYPE: Pick
interface smFn4
{
    a:number;
    b:number;
    c:number;
}
let summation4: Pick<smFn4, "b"|"a"> = {a:10,b:10}; //Pick is used to select the key from the interface.

//UTILITY TYPE: Exclude
type smFn5 = "a" | "b" | "c" | "d";
let summation5: Exclude<smFn5, "a"|"b"> = "c"; //Exclude is used to exclude the key from the type.
let summation6: Exclude<smFn5, "a"|"b"> = "d"; 

//UTILITY TYPE: ReturnType
function smFn7()
{
    return 100;
}
// let summation7: ReturnType<typeof smFn7> = "A"; //This will give error because the return type of smFn7 is number.
let summation8: ReturnType<typeof smFn7> = 100; 

//UTILITY TYPE: Parameters
function smFn9(a:number, b:number)
{
    return a+b;
}
let summation9: Parameters<typeof smFn9> = [10,20]; //This will give the type of the parameters of the function.

//UTILITY TYPE: Readonly
interface smFn10
{
    a:number;
    b:number;
}
let summation10: Readonly<smFn10> = {a:10,b:10}; //Readonly is used to make the object readonly.
// summation10.a=20; //This will give error because the object is readonly.