
import { useState } from "react";
function Nested() {
//     const user = {
//   name: "Dev",
//   settings: {
//     theme: "dark"
//   }
// };
//   const changeTheme = () => {
//     // mutate nested value
//     // user.settings.theme = "light";

//     console.log("theme changed to:", user.settings.theme);
//   };

 const [user, setUser] = useState({
    name: "Dev",
    settings: {
      theme: "dark"
    }
  });

  const changeTheme = () => {
    setUser(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        theme: prev.settings.theme==="dark"?"light":"dark"
      }
    }));
  };
  return (
    <div>
      <h2>Theme: {user.settings.theme}</h2>
      <button onClick={changeTheme}>
        Change Theme
      </button>
    </div>
  );
}

export default Nested;
