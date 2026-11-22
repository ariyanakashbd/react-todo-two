import { useState } from "react";

const PRIORITIES = ["Low", "Medium", "High"];
const STATUSES = ["Pending", "In Progress", "Completed"];

const priorityStyles = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
};

const statusStyles = {
  Pending: "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
};

const Todo = () => {
  const [todos, setTodos] = useState([]);

  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setDescription("");
    setPriority("Medium");
    setStatus("Pending");
    setEditingId(null);
  };

  // Todo create / update
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = description.trim();
    if (!text) return;

    if (editingId) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId
            ? { ...todo, description: text, priority, status }
            : todo
        )
      );
    } else {
      setTodos((prev) => [
        ...prev,
        { id: Date.now(), description: text, priority, status },
      ]);
    }

    resetForm();
  };

  // Edit-এ click করলে form-এ load হয়
  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setDescription(todo.description);
    setPriority(todo.priority);
    setStatus(todo.status);
  };

  // Todo delete
  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container-1320">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          My Todos
        </h1>
        <p className="text-gray-500 mt-2">
          Create, update and delete your tasks.
        </p>

        {/* Create / Update form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 grid gap-4 md:grid-cols-4"
        >
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="md:col-span-4 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          >
            {PRIORITIES.map((item) => (
              <option key={item} value={item}>
                {item} priority
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          >
            {STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-semibold transition"
          >
            {editingId ? "Update Todo" : "Add Todo"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="border border-gray-200 rounded-lg px-6 py-3 font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          )}
        </form>

        {/* Todo list */}
        <div className="mt-8 space-y-4">
          {todos.length === 0 && (
            <p className="text-center text-gray-400 py-10">
              No todos yet. Add one above.
            </p>
          )}

          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-wrap items-center gap-4"
            >
              <p className="flex-1 min-w-[200px] font-medium text-gray-800 break-words">
                {todo.description}
              </p>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityStyles[todo.priority]}`}
              >
                {todo.priority}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[todo.status]}`}
              >
                {todo.status}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(todo)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(todo.id)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Todo;
