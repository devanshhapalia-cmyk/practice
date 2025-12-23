//get element by id
$(document).ready(function() {
  var myElements = $("#id01");
  $("#demo").text("The text from the id01 paragraph is: " + myElements[0].innerHTML);
});

$(document).ready(function() {
  var myElements = $("p");
  $("#demo1").text("The text in the first paragraph is: " + myElements[0].innerHTML);
});

$(document).ready(function() {
  var myElements = $(".intro");
  $("#demo2").text("The first paragraph with class='intro' is: " + myElements[0].innerHTML);
});

$(document).ready(function() {
  var myElement = $("#01");
  let text=myElement.text();//GET TEXT
  console.log(text);
  myElement.html("<h1>Hello World using HTML </h1>");
});

$(document).ready(function() {
  $("#demo").css("font-size","35px");
});
// 
// $(document).ready(function() {
//   $("#id02").remove();
// });
