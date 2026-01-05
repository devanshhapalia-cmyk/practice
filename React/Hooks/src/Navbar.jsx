// Navbar.jsx
import { useContext } from "react";
import { UserContext } from "./UserContext";
import Profile from "./Profile";
function Navbar() {
  const { user } = useContext(UserContext);

  return <>
  <h2>Welcome, {user}</h2>;
 <Profile></Profile>
  </>
}

export default Navbar;
