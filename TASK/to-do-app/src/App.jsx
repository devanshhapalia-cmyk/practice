import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoList from "./components/TodoList/TodoList";
import AddTodoModal from "./components/AddTodoModal/AddTodoModal";

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  // Request notification permission on app mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted");
        } else if (permission === "denied") {
          console.log("Notification permission denied");
        }
      });
    }
  }, []);

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingTodo(null);
  };

  return (
    <>
      <TodoInput onAddClick={() => setIsAddModalOpen(true)} />

      <TodoList onEdit={handleEditTodo} />

      {(isAddModalOpen || editingTodo) && (
        <AddTodoModal 
          onClose={handleCloseModal}
          editingTodo={editingTodo}
        />
      )}
    </>
  );
}

export default App;
