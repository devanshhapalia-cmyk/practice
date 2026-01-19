import { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();
const API_URL = 'https://dummyjson.com/todos';

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Request notification permission on mount
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

  // Browser notification helper
  const showNotification = (title, body, todoId) => {
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification(title, {
        body,
        icon: "/favicon.ico",
        tag: todoId,
        requireInteraction: true,
      });
      
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
      
      setTimeout(() => notification.close(), 10000);
    }
  };

  // Reminder check interval
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      todos.forEach((todo) => {
        if (todo.reminderAt && !todo.notified && now >= todo.reminderAt) {
          const dueDateTime = todo.dueTime 
            ? new Date(`${todo.dueDate}T${todo.dueTime}`).toLocaleString()
            : todo.dueDate;
          
          showNotification(
            `Todo Reminder: ${todo.text}`,
            `This todo is due ${dueDateTime}. Priority: ${todo.priority}`,
            todo.id
          );
          
          if (!("Notification" in window) || Notification.permission !== "granted") {
            alert(`Reminder: "${todo.text}" is due on ${dueDateTime}!`);
          }
          
          setTodos((prev) =>
            prev.map((t) =>
              t.id === todo.id ? { ...t, notified: true } : t
            )
          );
        }
      });
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, [todos]);

  // Fetch todos from API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();
        // Convert API todos to our format with additional fields
        const formattedTodos = data.todos.map(todo => ({
          id: todo.id,
          text: todo.todo,
          completed: todo.completed,
          priority: 'medium',
          dueDate: '',
          dueTime: '',
          description: '',
          reminderAt: null,
          notified: false
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

  // Sanitize HTML to prevent XSS attacks
  const sanitizeText = (text) => {
    return text
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/\//g, "&#x2F;");
  };

  const addTodo = async (todoData) => {
    try {
      // Sanitize input data
      const sanitizedData = {
        ...todoData,
        text: sanitizeText(todoData.text),
        description: sanitizeText(todoData.description)
      };
      // Calculate reminder timestamp
      let reminderAt = null;
      if (todoData.dueDate && todoData.dueTime && todoData.reminder) {
        const dueDateTime = new Date(`${todoData.dueDate}T${todoData.dueTime}`).getTime();
        if (todoData.reminder.type === "minutes") {
          reminderAt = dueDateTime - todoData.reminder.value * 60 * 1000;
        } else if (todoData.reminder.type === "hours") {
          reminderAt = dueDateTime - todoData.reminder.value * 60 * 60 * 1000;
        } else if (todoData.reminder.type === "days") {
          reminderAt = dueDateTime - todoData.reminder.value * 24 * 60 * 60 * 1000;
        }
      }

      const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo: sanitizedData.text,
          completed: false,
          userId: 1
        })
      });
      const data = await response.json();
      const newTodo = {
        id: data.id,
        text: data.todo,
        completed: data.completed,
        priority: sanitizedData.priority || 'medium',
        dueDate: sanitizedData.dueDate || '',
        dueTime: sanitizedData.dueTime || '',
        description: sanitizedData.description || '',
        reminderAt,
        notified: false
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

  const editTodo = async (id, updates) => {
    try {
      // Sanitize input data
      const sanitizedUpdates = {
        ...updates,
        text: updates.text ? sanitizeText(updates.text) : undefined,
        description: updates.description ? sanitizeText(updates.description) : undefined
      };
      // Calculate updated reminder timestamp
      let reminderAt = null;
      if (updates.dueDate && updates.dueTime && updates.reminder) {
        const dueDateTime = new Date(`${updates.dueDate}T${updates.dueTime}`).getTime();
        if (updates.reminder.type === "minutes") {
          reminderAt = dueDateTime - updates.reminder.value * 60 * 1000;
        } else if (updates.reminder.type === "hours") {
          reminderAt = dueDateTime - updates.reminder.value * 60 * 60 * 1000;
        } else if (updates.reminder.type === "days") {
          reminderAt = dueDateTime - updates.reminder.value * 24 * 60 * 60 * 1000;
        }
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo: sanitizedUpdates.text || updates.text
        })
      });
      const data = await response.json();
      
      setTodos(todos.map(t =>
        t.id === id ? {
          ...t,
          text: sanitizedUpdates.text || t.text,
          dueDate: sanitizedUpdates.dueDate || t.dueDate,
          dueTime: sanitizedUpdates.dueTime || t.dueTime,
          priority: sanitizedUpdates.priority || t.priority,
          description: sanitizedUpdates.description || t.description,
          reminderAt,
          notified: false
        } : t
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
