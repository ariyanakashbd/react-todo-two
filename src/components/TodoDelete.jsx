const TodoDelete = ({ onDelete }) => {
  return (
    <button
      onClick={onDelete}
      className="px-4 py-2 rounded-lg text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition"
    >
      Delete
    </button>
  );
};

export default TodoDelete;
