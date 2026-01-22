import { Navigate } from "react-router-dom";

const isAuth = false; // simulate auth

export default function ProtectedRoute({ children }) {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
