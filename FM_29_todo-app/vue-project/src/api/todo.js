export async function getTodosApi() {
  try {
    const response = await fetch('https://todo-backend-3ew1.onrender.com/api/todos', {
      method: 'GET',
      credentials: 'include'
    })
    if (!response.ok) throw new Error(`Error: ${response.status}`)
    const data = await response.json()
    return data
  } catch (err) {
    console.error('Todos load error:', err)
  }
}

export const createTodoApi = async (todo, user) => {
  try {
    const response = await fetch(`https://todo-backend-3ew1.onrender.com/api/todos`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todo, user })
    })
    if (!response.ok) throw new Error(`Error: ${response.status}`)
  } catch (error) {
    console.error('Error load todos:', error)
  }
}

export const toggleTodoApi = async (id) => {
  try {
    const response = await fetch(`https://todo-backend-3ew1.onrender.com/api/todos/${id}/done`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) throw new Error(`Error: ${response.status}`)
  } catch (error) {
    console.error('Error load todos:', error)
  }
}

export const updateTodoOrderApi = async (todoId, newOrder) => {
  try {
    const response = await fetch(`https://todo-backend-3ew1.onrender.com/api/todos/${todoId}/update-order`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order: newOrder }),
    });
    if (!response.ok) {
      console.error(`Failed to update todo ${todoId} order:`, await response.text());
    }
  } catch (error) {
    console.error(`Error updating todo ${todoId} order:`, error);
  }
};

export const deleteTodoApi = async (id) => {
  try {
    const response = await fetch(`https://todo-backend-3ew1.onrender.com/api/todos/${id}/delete`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) throw new Error(`Error: ${response.status}`)
  } catch (error) {
    console.error('Error delete todo:', error)
  }
}
