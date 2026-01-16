import { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();
const API_URL = 'https://dummyjson.com/todos';

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();
        // Convert API todos to our format
        const formattedTodos = data.todos.map(todo => ({
          id: todo.id,
          text: todo.todo,
          completed: todo.completed,
          priority: 'medium' 
        }));
        setTodos(formattedTodos);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch todos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (text, priority = 'medium') => {
    try {
      const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo: text,
          completed: false,
          userId: 1
        })
      });
      const data = await response.json();
      const newTodo = {
        id: data.id,
        text: data.todo,
        completed: data.completed,
        priority
      };
      setTodos([...todos, newTodo]);
      return newTodo;
    } catch (err) {
      console.error('Failed to add todo:', err);
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
      setError(err.message);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed
        })
      });
      const data = await response.json();
      
      setTodos(todos.map(t =>
        t.id === id ? { ...t, completed: data.completed } : t
      ));
    } catch (err) {
      console.error('Failed to toggle todo:', err);
      setError(err.message);
    }
  };

  const editTodo = async (id, text) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo: text
        })
      });
      const data = await response.json();
      
      setTodos(todos.map(t =>
        t.id === id ? { ...t, text: data.todo } : t
      ));
    } catch (err) {
      console.error('Failed to edit todo:', err);
      setError(err.message);
    }
  };

  const value = {
    todos,
    addTodo,
    deleteTodo,
    toggleComplete,
    editTodo,
    loading,
    error
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
