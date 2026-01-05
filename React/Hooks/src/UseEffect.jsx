import {useEffect, useState } from "react";

function UseEffect() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []); // runs only once (on mount)

  if (!user) return <p>Loading...</p>;

  return <h2>{user.name}</h2>;
}
export default UseEffect;