import React from "react";

// Fake auth function
function getCurrentUser() {
  return { name: "John" }; // change to null to simulate logged out
}

// Higher Order Component
function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const user = getCurrentUser();

    if (!user) {
      return <h2>Please Login</h2>;
    }

    return <WrappedComponent {...props} user={user} />;
  };
}

// Normal component
function Dashboard({ user }) {
  return <h1>Welcome {user.name} to your Dashboard</h1>;
}

// Wrapped component
const ProtectedDashboard = withAuth(Dashboard);

// App
export default function HOC() {
  return (
    <div>
      <ProtectedDashboard />
    </div>
  );
}
