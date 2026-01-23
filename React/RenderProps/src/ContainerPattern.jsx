import React, { useEffect, useState } from "react";

// --------------------
// Presentational Component (UI only)
// --------------------
function UserList({ users, onSelect }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => onSelect(user)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

// --------------------
// Container Component (Logic only)
// --------------------
function UserListContainer() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulate API
    setTimeout(() => {
      setUsers([
        { id: 1, name: "Ali" },
        { id: 2, name: "Sara" }
      ]);
    }, 1000);
  }, []);

  function handleSelect(user) {
    alert(user.name);
  }

  return <UserList users={users} onSelect={handleSelect} />;
}

// --------------------
// App
// --------------------
export default function ContainerPattern() {
  return (
    <div>
      <h1>Users</h1>
      <UserListContainer />
    </div>
  );
}
