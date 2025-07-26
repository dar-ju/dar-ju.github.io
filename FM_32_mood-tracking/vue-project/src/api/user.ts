const baseUrl = import.meta.env.VITE_BASE_URL

export async function getSessionApi() {
  try {
    const response = await fetch(`${baseUrl}/api/me`, {
      method: 'GET',
      credentials: 'include',
    })
    if (response.status === 401) return null
    if (!response.ok) return null
    const data = await response.json()
    return data
  } catch (err) {
    console.error('Session load error:', err)
    return null
  }
}

export const loginUserApi = async (email, password) => {
  try {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
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

export const registerUserApi = async ({ email, password, username, img }) => {
  try {
    const response = await fetch(`${baseUrl}/api/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username, img }),
    })
    if (!response.ok) {
      const { error } = await response.json()
      throw new Error(error)
    }
    return await response.json()
  } catch (error) {
    console.error('Signup error:', error)
    throw error
  }
}

export async function editUserApi(email, username, img) {
  try {
    const response = await fetch(`${baseUrl}/api/userEdit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, img }),
    })
    if (!response.ok) {
      console.warn('User edit failed with status:', response.status)
      return null
    }
    const data = await response.json()
    return data
  } catch (err) {
    console.error('User edit error:', err)
    return null
  }
}

export const logoutUserApi = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/logout`, {
      method: 'POST',
      credentials: 'include',
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
