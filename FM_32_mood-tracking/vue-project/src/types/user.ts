export interface User {
  email: string
  username: string
  img?: string
  authorized?: boolean
}

export interface RegisterData {
  email: string
  password: string
  username: string
  img?: string
}

export interface SessionResponse {
  user: User
}

export interface RegisterResponse {
  isUserRegistered?: boolean
  email?: string
  username?: string
  img?: string
}
