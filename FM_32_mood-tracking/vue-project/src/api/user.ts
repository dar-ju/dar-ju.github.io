const baseUrl = 'https://darju.ru/moods'
import type { User, RegisterData, SessionResponse, RegisterResponse } from '@/types/user'

function getAuthHeader(): Record<string, string> | {} {
  const token = localStorage.getItem('token')
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
  return {}
}

export async function getSessionApi(): Promise<SessionResponse | null> {
  try {
    const response = await fetch(`${baseUrl}/api/me`, {
      method: 'GET',
      headers: {
        ...getAuthHeader(),
      },
    })
    if (response.status === 401) return null
    if (!response.ok) return null
    const data: SessionResponse = await response.json()
    return data
  } catch (err) {
    console.error('Session load error:', err)
    return null
  }
}

export const loginUserApi = async (email: string, password: string): Promise<User> => {
  try {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    if (!response.ok) {
      const { error } = await response.json()
      throw new Error(error)
    }
    const data = await response.json()

    if (data.token) {
      localStorage.setItem('jwtToken', data.token) // сохраняем токен
    }

    return data.user || data // зависит от структуры ответа
  } catch (error: any) {
    if (error.message === 'Failed to fetch') {
      throw new Error('No connection to server')
    }
    throw error
  }
}

export const registerUserApi = async (userData: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${baseUrl}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      const { error } = await response.json()
      throw new Error(error)
    }
    const data: RegisterResponse = await response.json()
    return data
  } catch (error) {
    console.error('Signup error:', error)
    throw error
  }
}

export async function editUserApi(
  email: string,
  username: string,
  img?: string,
): Promise<User | null> {
  try {
    const response = await fetch(`${baseUrl}/api/userEdit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ email, username, img }),
    })
    if (!response.ok) {
      console.warn('User edit failed with status:', response.status)
      return null
    }
    const data: User = await response.json()
    return data
  } catch (err) {
    console.error('User edit error:', err)
    return null
  }
}

export const logoutUserApi = async (): Promise<{ success?: boolean }> => {
  try {
    localStorage.removeItem('jwtToken')
    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    return {}
  }
}
