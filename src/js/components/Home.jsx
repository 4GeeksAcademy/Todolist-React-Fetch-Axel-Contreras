import { useEffect, useState } from "react";
import {
  getUserWithTodos,
  addTodo,
  deleteTodo,
  updateTodo
} from "../services/TodoServices";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Estados para edición
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Cargar usuario y tareas al iniciar
  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const data = await getUserWithTodos();
    setTodos(data.todos);
  }

  // Agregar tarea con Enter
  async function handleAddTodo(e) {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      await addTodo(inputValue);
      setInputValue("");
      loadUser();
    }
  }

  // Borrar tarea
  async function handleDelete(id) {
    await deleteTodo(id);
    loadUser();
  }

  // Marcar como hecha/no hecha
  async function handleToggle(todo) {
    await updateTodo(todo.id, todo.label, !todo.is_done);
    loadUser();
  }

  // Activar modo edición
  function startEditing(todo) {
    setEditingId(todo.id);
    setEditingText(todo.label);
  }

  // Guardar cambios de edición
  async function saveEdit(todo) {
    if (editingText.trim() === "") return;
    await updateTodo(todo.id, editingText, todo.is_done);
    setEditingId(null);
    setEditingText("");
    loadUser();
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Lista de Axel</h1>

      <input
        type="text"
        className="form-control"
        placeholder="Escribe una tarea y presiona Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddTodo}
      />

      <ul className="list-group mt-4">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {/* Si estamos editando esta tarea */}
            {editingId === todo.id ? (
              <input
                type="text"
                className="form-control"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(todo);/*  */
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
        ))}
      </ul>
    </div>
  );
}
