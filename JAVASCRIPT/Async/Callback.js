// JavaScript Asynchronous Flow refers to how JavaScript handles tasks that take time to complete, like reading files, or waiting for user input, without blocking the execution of other code.

// This can be achieved by 
// Event
// CallBack
// Promises
// Async/await

// CallBack 

function myDisplayer(something) {
  document.getElementById("demo").innerHTML = something;
}

function myCalculator(num1, num2, myCallback) {
  let sum = num1 + num2;
  myCallback(sum);
}

myCalculator(5, 5, myDisplayer);//Don't write myDisplayer();
// myDisplayer is a called a callback function.

// It is passed to myCalculator() as an argument.


const myNumber=[4,2,-1,5,-3,9];
const posNumber=removeNeg(myNumber,x=>x>=0);
function removeNeg(number,callback){
    const pos=[];
    for(const x of number){
        if(callback(x)){
            pos.push(x);
        }
    }
    return pos;
}
document.getElementById("demoPos").innerHTML="positive number are :"+posNumber;
setTimeout(myFunction, 3000);

function myFunction() {
  document.getElementById("setTime").innerHTML = "SetTimeOut example!!";
}

const interval=setInterval(myInterval, 1000);

function myInterval() {
  let d = new Date();
  document.getElementById("setInterval").innerHTML=
  d.getHours() + ":" +
  d.getMinutes() + ":" +
  d.getSeconds();
}
document.getElementById("stopInterval").addEventListener("click",function(){
    clearInterval(interval);
})

function step1(callback) {
    setTimeout(() => {
        console.log("Step 1 completed");
        callback();
    }, 1000);
}
//promises
// pending	initial state
// rejected	operation failed
// fulfilled	operation completed
let myPromise = new Promise(function(myResolve, myReject) {
  result = true;

// Code that might take some time goes here

  if (result == true) {
    myResolve("OK");
  } else {
    myReject("Error");
  }
});

// Using then() to display result
myPromise.then(x => myDisplay(x), x => myDisplay(x));

// Funtion to run when the Promise is settled:
function myDisplay(some) {
  document.getElementById("promise").innerHTML = "my promises result: "+some;
}

function myDisplayer(some) {
  document.getElementById("promise2").innerHTML = some;
}

let myPromise1 = new Promise(function(myResolve, myReject) {
  let x = 2;

  if (x == 0) {
    myResolve("OK");
  } else {
    myReject("Error");
  }
});
//promise  with setTimeout
myPromise1.then(
  function(value) {myDisplayer(value);},
  function(error) {myDisplayer(error);}
);

let myPromise2 = new Promise(function(myResolve, myReject) {
  setTimeout(function() { myResolve("Promise and setTimeout success"); }, 3000);
});

myPromise2.then(function(value) {
  document.getElementById("promise3").innerHTML = value;
})
.then(function(error){
    document.getElementById("promise3").innerHTML=error;
});
//promises
function myDisplayer1(some) {
  document.getElementById("demo2").innerHTML = some;
}

let myPromise3 = new Promise(function(myResolve, myReject) {
  let req = new XMLHttpRequest();
  req.open('GET', "https://ghibliapi.vercel.app/people");
  req.onload = function() {
    if (req.status != 200) {
      myResolve(req.response);
    } else {
      myReject("File not Found");
    }
  };
  req.send();
});

myPromise3.then(
  function(value) {myDisplayer1(value);},
  function(error) {myDisplayer1(error);}
);