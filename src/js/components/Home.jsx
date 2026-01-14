import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import {
  getUserWithTodos,
  addTodo,
  deleteTodo,
  updateTodo
} from "../services/TodoServices";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const data = await getUserWithTodos();
    setTodos(data.todos);
  }

  async function handleAddTodo(e) {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      await addTodo(inputValue);
      setInputValue("");
      loadUser();
    }
  }

  async function handleDelete(id) {
    await deleteTodo(id);
    loadUser();
  }

  async function handleToggle(todo) {
    await updateTodo(todo.id, todo.label, !todo.is_done);
    loadUser();
  }

  function startEditing(todo) {
    setEditingId(todo.id);
    setEditingText(todo.label);
  }

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

      <TodoList
        todos={todos}
        editingId={editingId}
        editingText={editingText}
        setEditingText={setEditingText}
        startEditing={startEditing}
        saveEdit={saveEdit}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
      />
    </div>
  );
}
