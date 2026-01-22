import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import User from "./pages/User";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Index Route */}
        <Route index element={<Home />} />

        {/* Normal Routes */}
        <Route path="about" element={<About />} />

        {/* Dynamic Route */}
        <Route path="user/:id" element={<User />} />

        {/* Protected Route */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested Route */}
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Redirect */}
        <Route path="login" element={<Login />} />
        <Route path="signin" element={<Navigate to="/login" replace />} />

        {/* 404 Catch */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
