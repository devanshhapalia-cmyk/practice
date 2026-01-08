import { useState,useEffect,useEffectEvent } from "react";
function EffectEvent(){

    const [count, setCount] = useState(0);

  // ✅ Effect Event
  const logCount = useEffectEvent(() => {
    console.log("Count:", count);
  });

  useEffect(() => {
    const id = setInterval(() => {
      logCount(); // always latest count
    }, 1000);

    return () => clearInterval(id);
  }, []); 

  return (
    <div style={{ padding: 20 }}>
      <h2>Fixed example</h2>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}
export default EffectEvent