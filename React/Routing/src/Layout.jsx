import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/user/101">User</NavLink>
      </nav>
      <hr />
      <Outlet />
    </>
  );
}
