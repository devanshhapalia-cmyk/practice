// myTitle = document.getElementById("demo").innerHTML;
// myTitle = document.getElementById("demo").firstChild.nodeValue;//same as above nodeValues is used to access the innnerHTML
document.getElementById("id02").innerHTML = document.getElementById("id01").firstChild.nodeValue;
document.getElementById("id02").innerHTML+= document.getElementById("id01").childNodes[0].nodeValue;//same as above

//document.body
//document.documentElement
//<html>          ← document.documentElement
//   <head></head>
//   <body>        ← document.body
//     content
//   </body>
// </html>
//     document.documentElement.clientHeight
// document.documentElement.scrollTop
// document.documentElement.scrollHeight
document.getElementById("documentBody").textContent = document.body.innerHTML;
document.getElementById("documentElement").textContent = document.documentElement.innerHTML;
//through nodeName we can access the name of the HTML tag

document.getElementById("nodeName").innerHTML = document.getElementById("id01").nodeName;
//appending the newly created child node
const paraNew = document.createElement("p");
const node = document.createTextNode("This is new.");
paraNew.appendChild(node);
const element = document.getElementById("mainParent");
element.appendChild(paraNew);
//insertBefore example

const para = document.createElement("p");
const node1 = document.createTextNode("This is new.");
para.appendChild(node1);

const element1 = document.getElementById("div1");
const child = document.getElementById("p1");
element1.insertBefore(para,child);