function myFunction() {
  const myCollection = document.getElementsByTagName("p");
  for (let i = 0; i < myCollection.length; i++) {
    myCollection[i].style.color = "red";
  }
}
const box = document.getElementById("box");


const staticNodeList = box.querySelectorAll(".item"); // NodeList (STATIC)


document.getElementById("add").addEventListener("click", () => {
  const p = document.createElement("p");
  p.className = "item";
  p.textContent = "Three";
  box.appendChild(p);
});
