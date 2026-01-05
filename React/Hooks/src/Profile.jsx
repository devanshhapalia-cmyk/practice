// Profile.jsx
import { useContext } from "react";
import { UserContext } from "./UserContext";

function Profile() {
  const { setUser } = useContext(UserContext);

  return (
    <button onClick={() => setUser("Alice")}>
      Change User
    </button>
  );
}

export default Profile;
