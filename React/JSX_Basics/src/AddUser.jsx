import { useState } from "react";
function AddUser() {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);   
  const myArray=[1,2,3,4,5]
  const addUser = () => {   
    setUsers([{ id: 3, name: "Charlie" }, ...users]);
  };
  
  return (
    <>
      <button onClick={addUser}>Add User</button>
      {users.map((user) => (//index is for the array
        <input
          key={user.id}
          defaultValue={user.name}
        />
      ))}
      {myArray.map((arr,index)=>
        <h1 key={index}>{arr}</h1>
    )}
    {myArray.forEach((arr)=>{//this will not render h1 component on screen only map function can do that because it does not return anything
        console.log(arr);
        <h1>{arr}</h1>
    })}
    </>
  );
}
export default AddUser;