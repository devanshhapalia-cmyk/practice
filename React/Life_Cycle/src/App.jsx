import './App.css'
import React from 'react';
import {UserProfile} from './UserProfile'
import DebouncedSearch from './DebouncedSearch';
import ThrottledScroll from './ThrottledScroll';
function App() {
  const [userId, setUserId] = React.useState(1);

  return (
    <div style={{ height: "1500px", overflowY: "auto", border: "1px solid #ccc" }}>
      <button onClick={() => setUserId(1)}>User 1</button>
      <button onClick={() => setUserId(2)}>User 2</button>

      <UserProfile userId={userId} />
      <DebouncedSearch />
      <ThrottledScroll />
   </div>
  );
}
export default App;