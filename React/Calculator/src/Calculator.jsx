import { useState } from "react";

function Calculator() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState(null);
  const handleOperation = (operation) => {
    const n1 = parseInt(number1, 10);
    const n2 = parseInt(number2, 10);

    let res;
    if (operation === "add") {
      res = n1 + n2;
    } else if (operation === "subtract") {
      res = n1 - n2;
    }
setResult(res);
    
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter a number"
        value={number1}
        onChange={(e) => setNumber1(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter a number"
        value={number2}
        onChange={(e) => setNumber2(e.target.value)}
      />

      <button onClick={() => handleOperation("add")}>
        Add
      </button>

      <button onClick={() => handleOperation("subtract")}>
        Subtract
      </button>

      {result !== null && <h3>Result: {result}</h3>}
    </>
  );
}

export default Calculator;
