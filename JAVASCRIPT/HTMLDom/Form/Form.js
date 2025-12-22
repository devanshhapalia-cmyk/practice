const x = document.forms["frm1"];
let text = "";
for (let i = 0; i < x.length ;i++) {
  text += x.elements[i].value + "<br>";
}
document.getElementById("demo").innerHTML = text;
//Event Listener
// document.getElementById("myBtn").addEventListener("click", displayDate);

function displayDate() {
  document.getElementById("demo1").innerHTML = Date();
}
document.getElementById("myBtn").addEventListener("click", function() {
  alert("Hello World!");
});
//window function on resizing the window

window.addEventListener("resize", function(){
  document.getElementById("demo2").innerHTML = Math.random();
});
//event capturing and event bubbling
document.getElementById("myP1Bubbling").addEventListener("click", function() {
  alert("You clicked the white element!");
}, false);

document.getElementById("myDiv1Bubbling").addEventListener("click", function() {
  alert("You clicked the orange element!");
}, false);

document.getElementById("myP2Caturing").addEventListener("click", function() {
  alert("You clicked the white element!");
}, true);

document.getElementById("myDiv2Caturing").addEventListener("click", function() {
  alert("You clicked the orange element!");
}, true);

// You can easily remove an event listener by using the removeEventListener() method.

// element.addEventListener(event, function, useCapture);

//default useCapture false means event bubbling
// document.addEventListener("click", () => {
//   console.log("Close dropdown");
// });

// document.getElementById("item").addEventListener("click", (e) => {
//   e.stopPropagation(); // stops bubbling
//   console.log("Item clicked");
// });

//if the usecapture is true it means it is of event capturing 
document.getElementById("dropdown").addEventListener("click", () => {
  console.log("Close dropdown");
},true);

document.getElementById("item").addEventListener("click", (e) => {
  e.stopPropagation(); // stops bubbling
  console.log("Item clicked");
});


//stopPropogation-
// Stops the event from moving to other elements

// Prevents event bubbling

// Prevents event capturing

// Does NOT stop browser default behavior

document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent clicked");
});

document.getElementById("child").addEventListener("click", (e) => {
e.stopPropagation();//this will stop parent click as without it out would be parent clicked child cliked but now it will be only child clicked
  console.log("Child clicked");
});

//window Object
function onResize() {
  document.getElementById("demo4").innerHTML = Math.random();
}

window.addEventListener("resize", onResize);

// later
document.getElementById("stopResize").addEventListener("click",function(){
window.removeEventListener("resize", onResize);
})

