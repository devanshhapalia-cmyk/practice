import '../assets/style/searchBar.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useState, useCallback, useMemo } from 'react';
import { useTodo } from '../Context/TodoContext';
import TodoList from './TodoList';

function SearchBar() {
  const [todoItem, setTodoItem] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { todos, addTodo, deleteTodo, toggleComplete, editTodo, loading, error } = useTodo();

  const itemsPerPage = 10;

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      const existingTodo = todos && todos.find(todo => 
        todo.text.toLowerCase() === value.toLowerCase()
      );
      setIsSearchMode(existingTodo !== undefined);
    }, 300),
    [todos]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTodoItem(value);
    setCurrentPage(1); // Reset to first page when searching
    debouncedSearch(value);
  };

  const createTodo = (e) => {
    e.preventDefault();
    const trimmedTodo = todoItem.trim();
    if (!trimmedTodo) {
      return;
    }

    // Check if todo already exists
    const existingTodo = todos && todos.find(todo => 
      todo.text.toLowerCase() === trimmedTodo.toLowerCase()
    );

    if (existingTodo) {
      return;
    }

    // addTodo(trimmedTodo, priority);
    setTodoItem(""); 
    setIsSearchMode(false);
    setCurrentPage(1); 
  }
  const priorityOrder = { high: 0, medium: 1, low: 2 };

  const filteredAndSortedTodos = useMemo(() => {
    const filtered = todoItem.trim() && todos
      ? todos.filter((todo) =>
          todo.text.toLowerCase().includes(todoItem.toLowerCase())
        )
      : todos || [];

    return [...filtered].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [todos, todoItem]);

  // Pagination logic - memoized for performance
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredAndSortedTodos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTodos = filteredAndSortedTodos.slice(startIndex, endIndex);

    return {
      totalPages,
      paginatedTodos,
      totalTodos: filteredAndSortedTodos.length,
      completedTodos: filteredAndSortedTodos.filter((todo) => todo.completed).length,
      remainingTodos: filteredAndSortedTodos.length - filteredAndSortedTodos.filter((todo) => todo.completed).length
    };
  }, [filteredAndSortedTodos, currentPage, itemsPerPage]);

  const { totalPages, paginatedTodos, totalTodos, completedTodos, remainingTodos } = paginationData;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div>
      <form className="newTaskForm" onSubmit={createTodo}>
         <input
          placeholder={isSearchMode ? "Existing todo found" : "Add a new task or search"}
          type="text"
          maxLength={60}
          value={todoItem}
          onChange={handleInputChange}
          className={`h-full flex-1 text-white bg-[#262626] border border-[#0D0D0D] rounded-lg px-4 text-base
            placeholder:text-[#808080]
            focus:outline-none focus:border-[#1E6F9F]
            ${isSearchMode ? "border-[#dc3545] bg-[#2a1a1a]" : ""}`}
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

      {error && (
        <div className="searchInfo">
          <p className="existingTodoMessage">Error: {error}</p>
        </div>
      )}

      {loading ? (
        <div className="searchInfo">
          <p className="searchResults">Loading todos...</p>
        </div>
      ) : (
        <>
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

      <TodoList todos={paginatedTodos} />
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="paginationButton"
          >
            Previous
          </button>
          
          <div className="pageNumbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`pageButton ${currentPage === pageNum ? 'active' : ''}`}
              >
                {pageNum}
              </button>
            ))}
          </div>
          
          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="paginationButton"
          >
            Next
          </button>
        </div>
      )}
        </>
      )}
    </div>
  );
}

export default SearchBar;
