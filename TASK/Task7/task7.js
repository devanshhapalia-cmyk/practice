// // let element = document.getElementById("demo");

// // async function fetchUserData() {
// //   try {
// //     const response =   fetch('https://jsonplaceholder.typicode.com/todos/1');

// //     if (!response.ok) {
// //       throw new Error(`HTTP error! status: ${response.status}`);
// //     }

// //     const data = await response.json();
// //     console.log(data)
// //     element.innerHTML=data;

// //   } catch (error) {
// //     console.error('Could not get user data:', error);
// //   }
// // }

// // fetchUserData();
// // async function fetchUserData() {
// //   const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';

// //   try {
// //     const response = await fetch(API_URL);

// //     if (!response.ok) {
// //       const errorBody = await response.text();

// //       const frontendErrorLog = {
// //         type: "API_ERROR",
// //         api: API_URL,
// //         method: "GET",
// //         statusCode: response.status,
// //         statusText: response.statusText,
// //         backendMessage: errorBody,
// //         feature: "Fetch User Todo",
// //         timestamp: new Date().toISOString(),
// //         userAgent: navigator.userAgent
// //       };

// //       console.error("Frontend Error Log:", frontendErrorLog);


// //       throw new Error("API request failed");
// //     }

// //     const data = await response.json();
// //     document.getElementById("demo").innerHTML = data.title;

// //   } catch (error) {
// //     console.error("Runtime Error:", {
// //       message: error.message,
// //       stack: error.stack,
// //       timestamp: new Date().toISOString()
// //     });
// //   }
// // }
// // fetchUserData();
// const output = document.getElementById("output");

// async function loadData() {
//   output.textContent = "Loading...";

//   try {
//     const usersPromise = fetch('https://jsonplaceholder.typicode.com/users/1');
//     const postsPromise = fetch('https://jsonplaceholder.typicode.com/posts/1');
//     const commentsPromise = fetch('https://jsonplaceholder.typicode.com/comments/2');
//     const todosPromise = fetch('https://jsonplaceholder.typicode.com/todos/1');
//     const albumsPromise = fetch('https://jsonplaceholder.typicode.com/albums/1');

//     const responses = await Promise.all([
//       usersPromise,
//       postsPromise,
//       commentsPromise,
//       todosPromise,
//       albumsPromise
//     ]);

//     responses.forEach(res => {
//       if (!res.ok) {
//         throw new Error(`HTTP Error: ${res.status}`);
//       }
//     });

//     const [
//       user,
//       post,
//       comment,
//       todo,
//       album
//     ] = await Promise.all(responses.map(res => res.json()));

//     output.textContent = JSON.stringify(
//       { user, post, comment, todo, album },
//       null,
//       2
//     );

//   } catch (error) {
//     output.innerHTML = `<span class="error">${error.message}</span>`;
//     console.error("Frontend Error Log:", {
//       message: error.message,
//       timestamp: new Date().toISOString(),
//       feature: "Parallel API Fetch"
//     });
//   }
// }
