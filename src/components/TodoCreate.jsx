import { useState } from "react";

const PRIORITIES = ["None", "High", "Medium", "Low"];
const STATUSES = ["Pending", "Completed"];

const emptyForm = {
  task: "",
  description: "",
  priority: "None",
  status: "Pending",
};

const TodoCreate = ({ onAdd }) => {
  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.task.trim()) return;

    onAdd(form);
    setForm(emptyForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 grid gap-4 md:grid-cols-2"
    >
      <input
        type="text"
        name="task"
        value={form.task}
        onChange={handleChange}
        placeholder="Task"
        className="md:col-span-2 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows={2}
        className="md:col-span-2 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none"
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
      >
        {PRIORITIES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
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
        className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-semibold transition"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoCreate;
