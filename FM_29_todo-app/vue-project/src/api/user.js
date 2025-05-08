export async function getSessionApi() {
  try {
    const response = await fetch('https://todo-backend-3ew1.onrender.com/api/me')
    if (!response.ok) throw new Error(`Error: ${response.status}`)
    const data = await response.json()
    return data
  } catch (err) {
    console.error('Session load error:', err)
  }
}

// export const createTodoApi = async (todo, user) => {
//   try {
//     const response = await fetch(`https://todo-backend-3ew1.onrender.com/api/todos`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ todo, user: 'test' })
//     })
//     if (!response.ok) throw new Error(`Error: ${response.status}`)
//   } catch (error) {
//     console.error('Error load todos:', error)
//   }
// }

// export const toggleTodoApi = async (id) => {
//   try {
//     const response = await fetch(`https://todo-backend-3ew1.onrender.com/api/todos/${id}/done`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     if (!response.ok) throw new Error(`Error: ${response.status}`)
//   } catch (error) {
//     console.error('Error load todos:', error)
//   }
// }

// export const deleteTodoApi = async (id) => {
//   try {
//     const response = await fetch(`https://todo-backend-3ew1.onrender.com/api/todos/${id}/delete`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     if (!response.ok) throw new Error(`Error: ${response.status}`)
//   } catch (error) {
//     console.error('Error delete todo:', error)
//   }
// }
