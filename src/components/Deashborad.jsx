import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TodoCreate from "./TodoCreate";
import TodoUpdate from "./TodoUpdate";
import TodoDelete from "./TodoDelete";

// backend API (D:\todo full backend — port 5000 এ চলছে)
const API_URL = "http://localhost:5000";
const AUTH = "12345678"; // backend-এর midllerware/security.js এর value

const priorityStyles = {
  None: "bg-gray-100 text-gray-600",
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
};

const Deashborad = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // logout → login page-এ চলে যাবে
  const handleLogout = () => {
    navigate("/login");
  };

  // backend থেকে সব todo আনা (GET /data-read)
  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/data-read`, {
        headers: { authorization: AUTH },
      });
      const data = res.data;

      if (!data.success) {
        setError(data.message);
        return;
      }

      setTodos(data.message);
      setError("");
    } catch {
      setError("Backend-এ connect করা যাচ্ছে না। server চালু আছে কি?");
    }
  };

  // page load হলে একবার চালু হবে
  useEffect(() => {
    fetchTodos();
  }, []);

  // নতুন todo তৈরি (POST /todo-create)
  const handleAdd = async (todo) => {
    await axios.post(`${API_URL}/todo-create`, todo);

    fetchTodos();
  };

  // todo update (POST /update/:id)
  const handleUpdate = async (form) => {
    await axios.post(`${API_URL}/update/${form._id}`, {
      task: form.task,
      description: form.description,
      priority: form.priority,
      status: form.status,
    });

    setEditingTodo(null);
    fetchTodos();
  };

  // todo delete (DELETE /delete/:id)
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);

    if (editingTodo && editingTodo._id === id) {
      setEditingTodo(null);
    }

    fetchTodos();
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container-1320">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Create, update and delete your tasks.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-lg font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>

        {error && (
          <p className="mt-6 bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 text-sm">
            {error}
          </p>
        )}

        <div className="mt-8">
          {editingTodo ? (
            <TodoUpdate
              key={editingTodo._id}
              todo={editingTodo}
              onUpdate={handleUpdate}
              onCancel={() => setEditingTodo(null)}
            />
          ) : (
            <TodoCreate onAdd={handleAdd} />
          )}
        </div>

     
        <div className="mt-8 space-y-4">
          {todos.length === 0 && (
            <p className="text-center text-gray-400 py-10">
              No todos yet. Add one above.
            </p>
          )}

          {todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-wrap items-center gap-4"
            >
              <div className="flex-1 min-w-[200px]">
                <p className="font-semibold text-gray-800 break-words">
                  {todo.task}
                </p>

                {todo.description && (
                  <p className="text-sm text-gray-500 mt-1 break-words">
                    {todo.description}
                  </p>
                )}
              </div>

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
                  onClick={() => setEditingTodo(todo)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 transition"
                >
                  Edit
                </button>

                <TodoDelete onDelete={() => handleDelete(todo._id)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Deashborad;
