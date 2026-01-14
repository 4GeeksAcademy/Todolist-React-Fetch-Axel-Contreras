export default function TodoItem({
  todo,
  editingId,
  editingText,
  setEditingText,
  startEditing,
  saveEdit,
  handleToggle,
  handleDelete
}) {
  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      {editingId === todo.id ? (
        <input
          type="text"
          className="form-control"
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit(todo);
          }}
        />
      ) : (
        <span
          onClick={() => handleToggle(todo)}
          style={{
            cursor: "pointer",
            textDecoration: todo.is_done ? "line-through" : "none"
          }}
        >
          {todo.label}
        </span>
      )}

      <div className="d-flex gap-2">
        {editingId === todo.id ? (
          <button
            className="btn btn-success btn-sm"
            onClick={() => saveEdit(todo)}
          >
            Guardar
          </button>
        ) : (
          <button
            className="btn btn-warning btn-sm"
            onClick={() => startEditing(todo)}
          >
            Editar
          </button>
        )}

        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(todo.id)}
        >
          X
        </button>
      </div>
    </li>
  );
}
