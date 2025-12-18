//await keywaord can only be used inside async
//async example
async function myFunction() {
  return "Hello";
}
myFunction().then(
  function(value) {myDisplayer(value);},
  function(error) {myDisplayer(error);}
);
function myDisplayer(value){
    document.getElementById("async").innerHTML=value;
}

async function myDisplay() {
  let myPromise = new Promise(function(resolve) {
    setTimeout(function() {resolve("async await done");}, 3000);
  });
  document.getElementById("aysncAwait").innerHTML = await myPromise;
}

myDisplay();