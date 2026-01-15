import "../assets/style/searchBar.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState } from "react";
import { useTodo } from "../Context/TodoContext";
import TodoList from "./TodoList";

function SearchBar() {
  const [todoItem, setTodoItem] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const { todos, addTodo, deleteTodo, toggleComplete, editTodo } = useTodo();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTodoItem(value);

    const existingTodo = todos.find(
      (todo) => todo.text.toLowerCase() === value.toLowerCase()
    );
    setIsSearchMode(existingTodo !== undefined);
  };

  const createTodo = (e) => {
    e.preventDefault();
    const trimmedTodo = todoItem.trim();
    if (!trimmedTodo) {
      return;
    }

    const existingTodo = todos.find(
      (todo) => todo.text.toLowerCase() === trimmedTodo.toLowerCase()
    );

    if (existingTodo) {
      return;
    }

    addTodo(trimmedTodo, priority);
    setTodoItem("");
    setIsSearchMode(false);
  };

  const priorityOrder = { high: 0, medium: 1, low: 2 };

  const filteredTodos = todoItem.trim()
    ? todos.filter((todo) =>
        todo.text.toLowerCase().includes(todoItem.toLowerCase())
      )
    : todos;

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const totalTodos = filteredTodos.length;
  const completedTodos = filteredTodos.filter((todo) => todo.completed).length;
  const remainingTodos = totalTodos - completedTodos;

  return (
    <div>
      <form className="newTaskForm" onSubmit={createTodo}>
        <input
          placeholder={
            isSearchMode ? "Existing todo found" : "Add a new task or search"
          }
          type="text"
          maxLength={60}
          id="inputTodo"
          value={todoItem}
          pattern="[a-zA-Z ]+[a-zA-Z0-9]*"
          onChange={handleInputChange}
          className={isSearchMode ? "searchModeInput" : ""}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="prioritySelect"
          disabled={isSearchMode}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button
          type="submit"
          disabled={isSearchMode}
          className={isSearchMode ? "disabledButton" : ""}
        >
          {isSearchMode ? "Exists" : "Create"} <AiOutlinePlusCircle size={20} />
        </button>
      </form>

      {todoItem.trim() && (
        <div className="searchInfo">
          {isSearchMode ? (
            <p className="existingTodoMessage">This todo already exists!</p>
          ) : (
            <p className="searchResults">Found {totalTodos} matching todos</p>
          )}
        </div>
      )}

      <div className="todoStats">
        <div className="statItem">
          <span className="statNumber">{totalTodos}</span>
          <span className="statLabel">Total</span>
        </div>
        <div className="statItem">
          <span className="statNumber">{completedTodos}</span>
          <span className="statLabel">Completed</span>
        </div>
        <div className="statItem">
          <span className="statNumber">{remainingTodos}</span>
          <span className="statLabel">Remaining</span>
        </div>
      </div>

      <TodoList todos={sortedTodos} />
    </div>
  );
}

export default SearchBar;
