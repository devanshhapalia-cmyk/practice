import { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCheck, AiOutlineClose, AiOutlineBell } from 'react-icons/ai';
import { useTodo } from '../Context/TodoContext';
import AddTodoModal from './AddTodoModal';

export default function TodoList({ todos = [] }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const { deleteTodo, toggleComplete, editTodo } = useTodo();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-400';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'HIGH';
      case 'medium': return 'MED';
      case 'low': return 'LOW';
      default: return priority;
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTodo(null);
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
    <div className="flex flex-col items-center p-8 min-h-auto">
      <ul className="list-none p-0 my-4 w-full max-w-2xl flex flex-col gap-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center py-3 px-4 rounded-lg min-h-[60px] gap-3 ${
              todo.completed 
                ? 'bg-gray-950 opacity-60' 
                : 'bg-gray-950 backdrop-opacity-5'
            }`}
          >
            {/* Priority Badge */}
            <div
              className={`px-2 py-1 rounded-xl text-[10px] font-bold text-white min-w-[40px] text-center flex-shrink-0 ${getPriorityColor(todo.priority)}`}
            >
              {getPriorityText(todo.priority)}
            </div>

            {/* Checkbox */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo._id)}
              className="w-[18px] h-[18px] cursor-pointer accent-blue-500"
            />

            {/* Edit Mode */}
            {editingId === todo.id ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 bg-gray-700 border border-gray-600 text-white px-2.5 py-1 rounded text-sm outline-none focus:border-blue-500"
                />
                <button 
                  onClick={() => handleSaveEdit(todo.id)} 
                  className="text-white p-1.5 rounded hover:bg-blue-600 transition-colors"
                >
                  <AiOutlineCheck size={18} />
                </button>
                <button 
                  onClick={handleCancelEdit} 
                  className="text-white p-1.5 rounded hover:bg-blue-600 transition-colors"
                >
                  <AiOutlineClose size={18} />
                </button>
              </div>
            ) : (
              <>
                {/* Todo Content */}
            <div className="flex-1">
              {/* Todo Text */}
              <span 
                className={`block text-white text-base ${
                  todo.completed ? 'line-through opacity-60' : ''
                }`}
              >
                {todo.text}
              </span>

              {/* Description */}
              {todo.description && (
                <p className="text-gray-400 text-sm mt-1">
                  {todo.description}
                </p>
              )}

              {/* Meta Info: Priority, Due Date, Reminder */}
              <div className="flex flex-wrap gap-2 mt-2">
                {/* Priority Badge */}
                {/* <div
                  className={`px-2 py-1 rounded text-[10px] font-bold text-white ${getPriorityColor(todo.priority)}`}
                >
                  {getPriorityText(todo.priority)}
                </div> */}

                {/* Due Date & Time */}
                {todo.dueDate && (
                  <span className="inline-flex items-center px-2 py-1 rounded text-[10px] bg-gray-600 text-gray-300">
                    {todo.dueDate} {todo.dueTime && `at ${todo.dueTime}`}
                  </span>
                )}

                {/* Reminder Indicator */}
                {todo.reminderAt && (
                  <span 
                    className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-medium ${
                      todo.notified 
                        ? "bg-gray-600 text-gray-400" 
                        : "bg-blue-600 text-white animate-pulse"
                    }`}
                    title={todo.notified ? "Reminder sent" : "Reminder active"}
                  >
                    <AiOutlineBell className="mr-1" size={10} />
                    {todo.notified ? "Sent" : "Active"}
                  </span>
                )}
              </div>
            </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="text-white p-1.5 rounded hover:bg-blue-600 transition-colors"
                  >
                    <AiOutlineEdit size={18} />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="text-white p-1.5 rounded hover:bg-red-600 transition-colors"
                  >
                    <AiOutlineDelete size={18} />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <AddTodoModal 
          onClose={handleCloseModal}
          editingTodo={editingTodo}
        />
      )}
    </div>
  );
}