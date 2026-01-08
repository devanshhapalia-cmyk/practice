// App.jsx
import { useState } from "react";
import { UserContext } from "./UserContext";
import Navbar from "./Navbar";
function App() {
  const [user, setUser] = useState("John Doe");

  return (<>
    <UserContext.Provider value={{ user, setUser }}>
      <Navbar />
    </UserContext.Provider>

    </>
  );
}

export default App;
