//string literals
function currdirection(direction:"north"|"south"|"east"|"west"){
    console.log(`current direction:${direction}`);
}
currdirection("north");

//numeric literals
function rollDice():1|2|3|4|5|6{
    return Math.floor(Math.random()*6) as 1|2|3|4|5|6;
}
console.log(rollDice())


//Literal Types with Objects
type HTTPSuccess = {
  type: "success";
  status: 200 | 201 | 204;
  statusText: "OK" | "Created" | "No Content";
  data: any;
};

type HTTPError = {
  type: "error";
  status: 400 | 401 | 403 | 404 | 500;
  statusText:
    | "Bad Request"
    | "Unauthorized"
    | "Forbidden"
    | "Not Found"
    | "Internal Server Error";
  error: string;
};


type HTTPResponse = HTTPSuccess | HTTPError;

function handleResponse(response: HTTPResponse) {
  if (response.type === "success") {
    console.log(`Success: ${response.statusText}`);
    console.log(response.data);  
  } else {
    console.log(`Error ${response.status}: ${response.statusText}`);
    console.log(`Message: ${response.error}`);
  }
}
const successResponse: HTTPSuccess = {
  type: "success",
  status: 200,
  statusText: "OK",
  data: { username: "john_doe", email: "john@example.com" }
};

const errorResponse: HTTPError = {
  type: "error",
  status: 404,
  statusText: "Not Found",
  error: "User not found in database"
};

handleResponse(successResponse);
handleResponse(errorResponse);
