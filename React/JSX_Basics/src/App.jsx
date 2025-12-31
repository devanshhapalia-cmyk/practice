import './App.css'

function App() {
  const hp = 218 * 1.36;
  const myobj = {
    name: "Fiat",
    model: "500",
    color: "white"
  };
  //should use className instead of the class beacuse JSC is renderd as Javascript which have class as reserved keyword 
  function myfunc(){
    return alert('called a function');
  }
  return (
    <>
      <h1>My car</h1>
      <p>It has {hp} horsepower</p>
       <h1>My car is a {myobj.color} {myobj.name} {myobj.model}</h1>
       <button onClick={myfunc}>function calling example</button>
    </>
  )
}

export default App
