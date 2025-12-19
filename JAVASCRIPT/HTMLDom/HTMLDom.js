const getbyId = document.getElementById("intro");//elements by ID
getbyId.innerHTML="<b>this is inner html in getElementById  elements</b>";
const element = document.getElementsByTagName("p");//elements by tag name
getbyId.innerHTML+="<br>"+element[0].innerHTML;
//can also select elements by class 
//querySelectorAll
const x = document.querySelectorAll("p.intro");
document.getElementById("demo").innerHTML ='The first paragraph (index 0) with class="intro" is: ' + x[0].innerHTML;