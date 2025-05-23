export async function getSessionApi() {
  try {
    const response = await fetch('https://todo-backend-3ew1.onrender.com/api/me', {
      method: 'GET',
      credentials: 'include'
    })
    if (response.status === 401) return null
    if (!response.ok) throw new Error(`Error: ${response.status}`)
    const data = await response.json()
    return data
  } catch (err) {
    console.error('Session load error:', err)
  }
}

export const loginUserApi = async (username, password) => {
  try {
    const response = await fetch(`https://todo-backend-3ew1.onrender.com/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    })
    if (!response.ok) {
      const { error } = await response.json()
      throw new Error(error)
    }
    return await response.json()
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('No connection to server')
    }
    throw error
  }
}

export const registerUserApi = async (username, password) => {
  try {
    const response = await fetch(`https://todo-backend-3ew1.onrender.com/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    })
    if (!response.ok) {
      const { error } = await response.json()
      throw new Error(error)
    }
    return await response.json()
  } catch (error) {
    console.error('Signup error:', error)
  }
}

export const logoutUserApi = async () => {
  try {
    const response = await fetch(`https://todo-backend-3ew1.onrender.com/logout`, {
      method: 'POST',
      credentials: 'include'
    })
    if (!response.ok) {
      const { error } = await response.json()
      throw new Error(error)
    }
    return await response.json()
  } catch (error) {
    console.error('Logout error:', error)
  }
}
