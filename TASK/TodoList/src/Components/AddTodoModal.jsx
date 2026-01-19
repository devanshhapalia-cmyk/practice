import { useEffect, useRef, useState } from "react";
import { useTodo } from "../Context/TodoContext";
import { AiOutlineClose } from "react-icons/ai";

const AddTodoModal = ({ onClose, editingTodo = null, initialData = null, onSubmit = null }) => {
  const { addTodo, editTodo, todos } = useTodo();

  const [text, setText] = useState(editingTodo?.text || initialData?.text || "");
  const [description, setDescription] = useState(editingTodo?.description || "");
  const [priority, setPriority] = useState(editingTodo?.priority || initialData?.priority || "medium");
  const [dueDate, setDueDate] = useState(editingTodo?.dueDate || "");
  const [dueTime, setDueTime] = useState(editingTodo?.dueTime || "");
  const [reminderEnabled, setReminderEnabled] = useState(editingTodo?.reminderAt ? true : false);
  const [reminderType, setReminderType] = useState("minutes");
  const [reminderValue, setReminderValue] = useState(15);
  const [errors, setErrors] = useState({});

  const textRef = useRef(null);
  const MAX_DESCRIPTION_LENGTH = 100;
  const MIN_TEXT_LENGTH = 3;

  useEffect(() => {
    textRef.current?.focus();
    return () => (document.body.style.overflow = "auto");
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Sanitize HTML to prevent XSS attacks
  const sanitizeText = (text) => {
    return text
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/\//g, "&#x2F;");
  };

  const validateForm = () => {
    const trimmedText = sanitizeText(text.trim());
    const trimmedDesc = sanitizeText(description.trim());

    const newErrors = {};

    // Text validation
    if (!trimmedText) newErrors.text = "Todo text is required";
    else if (trimmedText.length < MIN_TEXT_LENGTH)
      newErrors.text = `Text must be at least ${MIN_TEXT_LENGTH} characters`;

    // Description validation
    if (description && !trimmedDesc)
      newErrors.description = "Description cannot be just spaces";
    else if (description.length > MAX_DESCRIPTION_LENGTH)
      newErrors.description = `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters`;

    // Duplicate text check
    const exists = todos.some(
      (t) =>
        t.text.toLowerCase() === trimmedText.toLowerCase() &&
        t.id !== editingTodo?.id
    );
    if (exists) newErrors.text = "This TODO already exists";

    // Due date validation
    if (!dueDate) newErrors.dueDate = "Due date is required";
    else if (dueDate < getTodayDate()) newErrors.dueDate = "Due date cannot be in the past";

    // Due time validation
    if (dueDate && !dueTime) newErrors.dueTime = "Due time is required";
    
    // Reminder validation
    if (reminderEnabled && (!reminderValue || reminderValue < 1)) {
      newErrors.reminder = "Reminder value must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const todoData = {
      text: sanitizeText(text.trim()),
      description: sanitizeText(description),
      priority,
      dueDate,
      dueTime,
      reminder: reminderEnabled ? {
        type: reminderType,
        value: reminderValue
      } : null
    };

    if (onSubmit) {
      onSubmit(todoData);
    } else if (editingTodo) {
      editTodo(editingTodo.id, todoData);
    } else {
      addTodo(todoData);
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-start justify-center bg-black/30 pt-10 pb-10"
      onClick={onClose}
    >
      <div
        className="w-[420px] rounded-xl border border-gray-600 bg-gray-800 p-7 shadow-xl max-w-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[22px] font-bold text-white">
            {editingTodo ? "Edit TODO" : "Add New TODO"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Text */}
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-300">
              Todo Text * (min {MIN_TEXT_LENGTH} characters)
            </label>
            <input
              ref={textRef}
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setErrors({ ...errors, text: "" });
              }}
              maxLength={100}
              className="h-10 rounded-md border border-gray-600 bg-gray-700 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-gray-600 text-white placeholder-gray-400"
              placeholder="Enter your todo..."
            />
            {errors.text && (
              <p className="mt-1 text-xs text-red-500">{errors.text}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-300">
              Description (max {MAX_DESCRIPTION_LENGTH} characters)
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH));
                setErrors({ ...errors, description: "" });
              }}
              maxLength={MAX_DESCRIPTION_LENGTH}
              placeholder={`Enter description (${description.length}/${MAX_DESCRIPTION_LENGTH})`}
              className="h-20 resize-none rounded-md border border-gray-600 bg-gray-700 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-gray-600 text-white placeholder-gray-400"
            />
            <small className="mt-1 text-right text-xs text-gray-400">
              {description.length}/{MAX_DESCRIPTION_LENGTH}
            </small>
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Priority */}
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-300">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="h-10 rounded-md border border-gray-600 bg-gray-700 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-gray-600 text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Due Date & Time */}
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-300">
              Due Date & Time *
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={dueDate}
                min={getTodayDate()}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  setErrors({ ...errors, dueDate: "", dueTime: "" });
                }}
                className="flex-1 h-10 rounded-md border border-gray-600 bg-gray-700 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-gray-600 text-white"
              />
              <input
                type="time"
                value={dueTime}
                onChange={(e) => {
                  setDueTime(e.target.value);
                  setErrors({ ...errors, dueTime: "" });
                }}
                className="flex-1 h-10 rounded-md border border-gray-600 bg-gray-700 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-gray-600 text-white"
              />
            </div>
            {(errors.dueDate || errors.dueTime) && (
              <p className="mt-1 text-xs text-red-500">
                {errors.dueDate || errors.dueTime}
              </p>
            )}
          </div>

          {/* Reminder Settings */}
          <div className="mb-4 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="reminder"
                checked={reminderEnabled}
                onChange={(e) => setReminderEnabled(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 bg-gray-700 border-gray-600"
              />
              <label htmlFor="reminder" className="text-sm font-semibold text-gray-300">
                Set Reminder Notification
              </label>
            </div>
            
            {reminderEnabled && (
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-sm text-gray-300">Notify me</span>
                <input
                  type="number"
                  min="1"
                  max="999"
                  value={reminderValue}
                  onChange={(e) => setReminderValue(parseInt(e.target.value) || 1)}
                  className="w-16 h-8 rounded-md border border-gray-600 bg-gray-700 px-2 text-sm outline-none transition focus:border-blue-500 focus:bg-gray-600 text-white"
                />
                <select
                  value={reminderType}
                  onChange={(e) => setReminderType(e.target.value)}
                  className="h-8 rounded-md border border-gray-600 bg-gray-700 px-2 text-sm outline-none transition focus:border-blue-500 focus:bg-gray-600 text-white"
                >
                  <option value="minutes">minute(s) before</option>
                  <option value="hours">hour(s) before</option>
                  <option value="days">day(s) before</option>
                </select>
                <span className="text-sm text-gray-300">due date</span>
              </div>
            )}
            
            {errors.reminder && (
              <p className="mt-1 text-xs text-red-500">{errors.reminder}</p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-10 min-w-[90px] rounded-md bg-gray-600 text-sm font-semibold text-gray-300 transition hover:bg-gray-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-10 min-w-[90px] rounded-md bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {editingTodo ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
