import { useEffect, useRef, useState } from "react";
import { useTodos } from "../../context/TodoContext";

const AddTodoModal = ({ onClose, editingTodo = null }) => {
  const { addTodo, editTodo, todos } = useTodos();

  const [title, setTitle] = useState(editingTodo?.title || "");
  const [description, setDescription] = useState(editingTodo?.description || "");
  const [priority, setPriority] = useState(editingTodo?.priority || "Medium");
  const [dueDate, setDueDate] = useState(editingTodo?.dueDate || "");
  const [dueTime, setDueTime] = useState(editingTodo?.dueTime || "");
  const [reminderEnabled, setReminderEnabled] = useState(editingTodo?.reminderAt ? true : false);
  const [reminderType, setReminderType] = useState("minutes");
  const [reminderValue, setReminderValue] = useState(15);
  const [errors, setErrors] = useState({});

  const titleRef = useRef(null);
  const MAX_DESCRIPTION_LENGTH = 100;
  const MIN_TITLE_LENGTH = 3;

  useEffect(() => {
    titleRef.current.focus();
    return () => (document.body.style.overflow = "auto");
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const validateForm = () => {
    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();

    const newErrors = {};

    // Title
    if (!trimmedTitle) newErrors.title = "Title is required";
    else if (trimmedTitle.length < MIN_TITLE_LENGTH)
      newErrors.title = `Title must be at least ${MIN_TITLE_LENGTH} characters`;

    // Description (optional but cannot be just spaces)
    if (description && !trimmedDesc)
      newErrors.description = "Description cannot be just spaces";
    else if (description.length > MAX_DESCRIPTION_LENGTH)
      newErrors.description = `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters`;

    // Duplicate title
    const exists = todos.some(
      (t) =>
        t.title.toLowerCase() === trimmedTitle.toLowerCase() &&
        t.id !== editingTodo?.id
    );
    if (exists) newErrors.title = "This TODO already exists";

    // Due date
    if (!dueDate) newErrors.dueDate = "Due date is required";
    else if (dueDate < getTodayDate()) newErrors.dueDate = "Due date cannot be in the past";

    // Due time validation
    if (dueDate && !dueTime) newErrors.dueTime = "Due time is required";
    
    // Reminder validation
    if (reminderEnabled && (!reminderValue || reminderValue < 1)) {
      newErrors.reminder = "Reminder value must be at least 1";
    }

    setErrors(newErrors);

    // If any errors exist, form is invalid
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const todoData = {
      title: title.trim(),
      description,
      priority,
      dueDate,
      dueTime,
      reminder: reminderEnabled ? {
        type: reminderType,
        value: reminderValue
      } : null
    };

    if (editingTodo) {
      editTodo(editingTodo.id, todoData);
    } else {
      addTodo({ ...todoData, completed: false });
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-start justify-center bg-black/30 pt-10 pb-10 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-[420px] rounded-xl border border-slate-300/20 bg-gradient-to-br from-white to-slate-100 p-7 shadow-xl animate-slideUp max-w-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-5 text-[22px] font-bold text-slate-600">
          {editingTodo ? "Edit TODO" : "Add New TODO"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm font-semibold text-slate-500">
              Title * (min {MIN_TITLE_LENGTH} characters)
            </label>
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
              maxLength={100}
              className="h-10 rounded-md border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-400 focus:bg-slate-50 focus:ring-2 focus:ring-slate-300/30"
            />
            {errors.title &&
              <p className="mt-1 text-xs text-red-500">{errors.title}</p>
            }
          </div>

          {/* Description */}
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm font-semibold text-slate-500">
              Description (max {MAX_DESCRIPTION_LENGTH} characters)
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH));
                setError("");
              }}
              maxLength={MAX_DESCRIPTION_LENGTH}
              placeholder={`Enter description (${description.length}/${MAX_DESCRIPTION_LENGTH})`}
              className="h-20 resize-none rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-slate-50 focus:ring-2 focus:ring-slate-300/30"
            />
            <small className="mt-1 text-right text-xs text-slate-400">
              {description.length}/{MAX_DESCRIPTION_LENGTH}
              {errors.description &&
                <p className="mt-1 text-xs text-left text-red-500">{errors.description}</p>
              }
            </small>

          </div>

          {/* Priority */}
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm font-semibold text-slate-500">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="h-10 rounded-md border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-400 focus:bg-slate-50 focus:ring-2 focus:ring-slate-300/30"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

          </div>

          {/* Due Date & Time */}
          <div className="mb-4 flex flex-col">
            <label className="mb-2 text-sm font-semibold text-slate-500">
              Due Date & Time *
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={dueDate}
                min={getTodayDate()}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  setError("");
                }}
                className="flex-1 h-10 rounded-md border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-400 focus:bg-slate-50 focus:ring-2 focus:ring-slate-300/30"
              />
              <input
                type="time"
                value={dueTime}
                onChange={(e) => {
                  setDueTime(e.target.value);
                  setError("");
                }}
                className="flex-1 h-10 rounded-md border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-400 focus:bg-slate-50 focus:ring-2 focus:ring-slate-300/30"
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
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <label htmlFor="reminder" className="text-sm font-semibold text-slate-500">
                Set Reminder Notification
              </label>
            </div>
            
            {reminderEnabled && (
              <div className="flex gap-2 items-center">
                <span className="text-sm text-slate-600">Notify me</span>
                <input
                  type="number"
                  min="1"
                  max="999"
                  value={reminderValue}
                  onChange={(e) => setReminderValue(parseInt(e.target.value) || 1)}
                  className="w-16 h-8 rounded-md border border-slate-300 px-2 text-sm outline-none transition focus:border-slate-400 focus:bg-slate-50"
                />
                <select
                  value={reminderType}
                  onChange={(e) => setReminderType(e.target.value)}
                  className="h-8 rounded-md border border-slate-300 px-2 text-sm outline-none transition focus:border-slate-400 focus:bg-slate-50"
                >
                  <option value="minutes">minute(s) before</option>
                  <option value="hours">hour(s) before</option>
                  <option value="days">day(s) before</option>
                </select>
                <span className="text-sm text-slate-600">due date</span>
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
              className="h-10 min-w-[90px] rounded-md bg-slate-200 text-sm font-semibold text-slate-600 transition hover:bg-slate-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-10 min-w-[90px] rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-semibold text-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-400/40"
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
