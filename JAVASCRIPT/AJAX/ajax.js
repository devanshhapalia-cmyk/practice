// AJAX
// AJAX is not a programming language.

// AJAX is a technique for accessing web servers from a web page.

// AJAX stands for Asynchronous JavaScript And XML.
function loadDoc() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "ajax_info.txt");
  xhttp.send();
}   

// onload---------------------->Defines a function to be called when the request is received (loaded)
// onreadystatechange------------------>	Defines a function to be called when the readyState property changes
// readyState	------------------->Holds the status of the XMLHttpRequest.
// 0: request not initialized
// 1: server connection established
// 2: request received
// 3: processing request
// 4: request finished and response is ready


// responseText	---------------->Returns the response data as a string
// responseXML	--------------------->Returns the response data as XML data
// status	------------------------->Returns the status-number of a request
// 200: "OK"
// 403: "Forbidden"
// 404: "Not Found"
