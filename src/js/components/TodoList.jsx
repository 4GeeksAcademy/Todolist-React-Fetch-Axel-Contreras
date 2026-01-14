import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  editingId,
  editingText,
  setEditingText,
  startEditing,
  saveEdit,
  handleToggle,
  handleDelete
}) {
  return (
    <ul className="list-group mt-4">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editingId={editingId}
          editingText={editingText}
          setEditingText={setEditingText}
          startEditing={startEditing}
          saveEdit={saveEdit}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
