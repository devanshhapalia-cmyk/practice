import '../assets/style/searchBar.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useState, useCallback, useMemo, useRef } from 'react';
import { useTodo } from '../Context/TodoContext';
import TodoList from './TodoList';
import AddTodoModal from './AddTodoModal';

function SearchBar() {
  const [todoItem, setTodoItem] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // New state for filter
  const { todos, addTodo, deleteTodo, toggleComplete, editTodo, loading, error } = useTodo();

  const itemsPerPage = 10;

const debounceTimer = useRef(null);

const debouncedSearch = (value) => {
  clearTimeout(debounceTimer.current);

  debounceTimer.current = setTimeout(() => {
    const existingTodo = todos && todos.find(todo =>
      todo.text.toLowerCase() === value.toLowerCase()
    );
    setIsSearchMode(existingTodo !== undefined);
  }, 300);
};

const handleInputChange = (e) => {
  const value = e.target.value;
  setTodoItem(value);
  setCurrentPage(1);
  debouncedSearch(value);

};


  const createTodo = (e) => {
    e.preventDefault();
    const trimmedTodo = todoItem.trim();
    if (!trimmedTodo) return;

    const existingTodo = todos && todos.find(todo => 
      todo.text.toLowerCase() === trimmedTodo.toLowerCase()
    );

    if (existingTodo) return;

    // Open modal with pre-filled data
    setModalOpen(true);
  };

  const handleAddTodo = (todoData) => {
    addTodo(todoData);
    setTodoItem("");
    setIsSearchMode(false);
    setCurrentPage(1);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const priorityOrder = { high: 0, medium: 1, low: 2 };

  const filteredAndSortedTodos = useMemo(() => {
    let filtered = todos || [];

    if (todoItem.trim()) {
      filtered = filtered.filter((todo) =>
        todo.text.toLowerCase().includes(todoItem.toLowerCase())
      );
    }

    if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (filter === 'remaining') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    return [...filtered].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [todos, todoItem, filter]);

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredAndSortedTodos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTodos = filteredAndSortedTodos.slice(startIndex, endIndex);

    return {
      totalPages,
      paginatedTodos,
      totalTodos: (todos || []).length,
      completedTodos: (todos || []).filter((todo) => todo.completed).length,
      remainingTodos: (todos || []).length - (todos || []).filter((todo) => todo.completed).length
    };
  }, [filteredAndSortedTodos, currentPage, itemsPerPage, todos]);

  const { totalPages, paginatedTodos, totalTodos, completedTodos, remainingTodos } = paginationData;

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  return (
    <div className="bg-gray min-h-screen p-4">
      <form className="flex gap-2 max-w-[736px] w-full h-[54px] mx-auto" onSubmit={createTodo}>
        <input
          placeholder={isSearchMode ? "Existing todo found" : "Add a new task or search"}
          type="text"
          maxLength={60}
          value={todoItem}
          onChange={handleInputChange}
          className={`flex-1 h-full px-4 rounded-lg text-base placeholder-gray-400 text-white border border-black bg-[#262626] focus:outline-none focus:border-[#1E6F9F] ${isSearchMode ? "border-red-600 bg-[#2a1a1a]" : ""}`}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={isSearchMode}
          className="h-full min-w-[140px] px-4 rounded-lg text-sm font-medium bg-[#262626] text-white border border-black focus:outline-none focus:border-[#1E6F9F] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button
          type="submit"
          disabled={isSearchMode}
          className={`h-full px-4 rounded-lg font-bold text-sm flex items-center gap-1 ${isSearchMode ? "bg-gray-500 cursor-not-allowed opacity-60" : "bg-[#1E6F9F] text-white"}`}
        >
          {isSearchMode ? "Exists" : "Add Details"} <AiOutlinePlusCircle size={20} />
        </button>
      </form>

      {error && (
        <div className="text-center mt-4 px-4">
          <p className="text-red-600 font-medium m-0">Error: {error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center mt-4 px-4">
          <p className="text-[#1E6F9F] font-medium m-0">Loading todos...</p>
        </div>
      ) : (
        <>
          {todoItem.trim() && (
            <div className="text-center mt-4 px-4">
              {isSearchMode ? (
                <p className="text-red-600 font-medium m-0">This todo already exists!</p>
              ) : (
                <p className="text-[#1E6F9F] font-medium m-0">Found {totalTodos} matching todos</p>
              )}
            </div>
          )}

          <div className="flex justify-center gap-8 mt-8 flex-wrap px-4">
            <button
              className={`flex flex-col items-center bg-[#262626] border rounded-xl px-8 py-4 min-w-[100px] transition-colors ${
                filter === 'all' ? 'border-[#1E6F9F]' : 'border-black hover:border-gray-600'
              }`}
              onClick={() => {
                setFilter('all');
                setCurrentPage(1);
              }}
            >
              <span className="text-[#1E6F9F] text-2xl font-bold">{totalTodos}</span>
              <span className="text-gray-400 text-xs uppercase tracking-wide mt-2">Total</span>
            </button>
            <button
              className={`flex flex-col items-center bg-[#262626] border rounded-xl px-8 py-4 min-w-[100px] transition-colors ${
                filter === 'completed' ? 'border-[#1E6F9F]' : 'border-black hover:border-gray-600'
              }`}
              onClick={() => {
                setFilter('completed');
                setCurrentPage(1);
              }}
            >
              <span className="text-[#1E6F9F] text-2xl font-bold">{completedTodos}</span>
              <span className="text-gray-400 text-xs uppercase tracking-wide mt-2">Completed</span>
            </button>
            <button
              className={`flex flex-col items-center bg-[#262626] border rounded-xl px-8 py-4 min-w-[100px] transition-colors ${
                filter === 'remaining' ? 'border-[#1E6F9F]' : 'border-black hover:border-gray-600'
              }`}
              onClick={() => {
                setFilter('remaining');
                setCurrentPage(1);
              }}
            >
              <span className="text-[#1E6F9F] text-2xl font-bold">{remainingTodos}</span>
              <span className="text-gray-400 text-xs uppercase tracking-wide mt-2">Remaining</span>
            </button>
          </div>

          <TodoList todos={paginatedTodos} />

          {/* Add Todo Modal */}
          {modalOpen && (
            <AddTodoModal 
              onClose={handleCloseModal}
              initialData={{
                text: todoItem.trim(),
                priority: priority
              }}
              onSubmit={handleAddTodo}
            />
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-4 flex-wrap">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded ${currentPage === pageNum ? "bg-[#1E6F9F] text-white" : "bg-gray-200"}`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
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
