
import '../assets/style/todoList.css';
import { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { useTodo } from '../Context/TodoContext';

function TodoList({ todos }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const { deleteTodo, toggleComplete, editTodo } = useTodo();

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getPriorityText = (priority) => {
    switch(priority) {
      case 'high': return 'HIGH';
      case 'medium': return 'MED';
      case 'low': return 'LOW';
      default: return priority;
    }
  };

  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const handleSaveEdit = (id) => {
    if (editText.trim()) {
      editTodo(id, editText.trim());
      setEditingId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="todoContainer">
      <ul className="todoList">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <div className="todoItem">
              <div 
                className="priorityBadge"
                style={{ backgroundColor: getPriorityColor(todo.priority) }}
              >
                {getPriorityText(todo.priority)}
              </div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="todoCheckbox"
              />
              
              {editingId === todo.id ? (
                <div className="editContainer">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="editInput"
                  />
                  <button 
                    onClick={() => handleSaveEdit(todo.id)}
                    className="saveBtn"
                  >
                    <AiOutlineCheck size={16} />
                  </button>
                  <button 
                    onClick={handleCancelEdit}
                    className="cancelBtn"
                  >
                    <AiOutlineClose size={16} />
                  </button>
                </div>
              ) : (
                <div className="todoContent">
                  <span className="todoText">{todo.text}</span>
                  <div className="todoActions">
                    <button 
                      onClick={() => handleEdit(todo.id, todo.text)}
                      className="editBtn"
                    >
                      <AiOutlineEdit size={16} />
                    </button>
                    <button 
                      onClick={() => deleteTodo(todo.id)}
                      className="deleteBtn"
                    >
                      <AiOutlineDelete size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;