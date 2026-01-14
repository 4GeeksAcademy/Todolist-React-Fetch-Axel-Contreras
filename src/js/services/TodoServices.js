// TodoServices.js

const BASE_URL = "https://playground.4geeks.com/todo";

// Crear usuario si no existe
export async function createUser() {
    const response = await fetch(`${BASE_URL}/users/Axel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([]) // la API requiere un array vacío
    });

    const data = await response.json();
    return data;
}

// Obtener usuario + todos
export async function getUserWithTodos() {
    const response = await fetch(`${BASE_URL}/users/Axel`, {
        method: "GET"
    });

    if (!response.ok) {
        // Si no existe, lo creamos
        return await createUser();
    }

    const data = await response.json();
    return data;
}

// Agregar una nueva tarea
export async function addTodo(label) {
    const response = await fetch(`${BASE_URL}/todos/Axel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            label: label,
            is_done: false
        })
    });

    const data = await response.json();
    return data;
}

// Eliminar una tarea por ID
export async function deleteTodo(id) {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE"
    });

    return response.ok; // true si se borró correctamente
}

// Actualizar una tarea (texto o estado)
export async function updateTodo(id, newLabel, isDone) {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            label: newLabel,
            is_done: isDone
        })
    });

    const data = await response.json();
    return data;
}
