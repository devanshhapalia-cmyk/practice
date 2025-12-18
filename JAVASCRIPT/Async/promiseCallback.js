//all settled example

const myPromise1 = new Promise((resolve) => {
  setTimeout(resolve, 200, "King");
});

const myPromise2 = new Promise((resolve) => {
  setTimeout(resolve, 400, "Queen");
});

Promise.allSettled([myPromise1, myPromise2]).then((results) => {
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      myDisplay(result.value);
    }
  });
});

function myDisplay(value) {
  document.getElementById("demo").innerHTML += value + "<br>";
}
let text = "";
const {promise, resolve, reject} = Promise.withResolvers();

// Simulate async work
setTimeout(() => {
  Math.random() > 0.5
    ? resolve("Operation successful!")
    : reject("Operation failed!");
}, 2000);

// Set text in then/catch, update DOM in finally
promise
  .then((message) => text = message)
  .catch((error) => text = error)
  .finally(() => {
    document.getElementById("demo1").innerHTML = text;
});

//another example of then catch and finally

function getUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let internet = true; // simulate network

      if (internet) {
        resolve("User data loaded");
      } else {
        reject("No internet connection");
      }
    }, 1500);
  });
}

getUserData()
  .then((data) => {
    console.log(data); // success
  })
  .catch((error) => {
    console.error(error); // failure
  })
  .finally(() => {
    console.log("Hide loading spinner");
  });


//race

const promise1 = new Promise((resolve) => {
  setTimeout(resolve, 1000, "got the api correctly fetch");
});

const promise2 = new Promise((_, reject) => {
  setTimeout(reject, 100, "Error in fetching");
});

Promise.race([promise1,promise2])
.then(result=>console.log(result))
.catch(error=>console.log(error))
.finally(last=>console.log("finally"));

