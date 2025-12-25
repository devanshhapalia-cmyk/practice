"use strict";
//string literals
function currdirection(direction) {
    console.log(`current direction:${direction}`);
}
currdirection("north");
//numeric literals
function rollDice() {
    return Math.floor(Math.random() * 6);
}
console.log(rollDice());
function handleResponse(response) {
    if (response.type === "success") {
        console.log(`Success: ${response.statusText}`);
        console.log(response.data);
    }
    else {
        console.log(`Error ${response.status}: ${response.statusText}`);
        console.log(`Message: ${response.error}`);
    }
}
const successResponse = {
    type: "success",
    status: 200,
    statusText: "OK",
    data: { username: "john_doe", email: "john@example.com" }
};
const errorResponse = {
    type: "error",
    status: 404,
    statusText: "Not Found",
    error: "User not found in database"
};
handleResponse(successResponse);
handleResponse(errorResponse);
//# sourceMappingURL=LiteralType.js.map