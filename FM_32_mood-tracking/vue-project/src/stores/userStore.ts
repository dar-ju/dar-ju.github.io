import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User, RegisterData, SessionResponse, RegisterResponse } from '@/types/user'
import {
  getSessionApi,
  loginUserApi,
  registerUserApi,
  editUserApi,
  logoutUserApi,
} from '@/api/user.js'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const error = ref('')
  const isUserRegistered = ref(false)
  const isUserChecked = ref(false)
  const isUserLoading = ref(true)

  const registerData = ref<RegisterData>({
    email: '',
    password: '',
    username: '',
    img: '',
  })

  const getUser = async (): Promise<void> => {
    try {
      const response: SessionResponse | null = await getSessionApi()
      if (!response) return
      user.value = response.user
    } catch (err: any) {
      error.value = err.message
    } finally {
      isUserLoading.value = false
    }
  }

  const loginUser = async (email: string, password: string): Promise<void> => {
    try {
      const response: User = await loginUserApi(email, password)
      user.value = response
    } catch (err: any) {
      error.value = err.message
    }
  }

  const registerUser = async (userData: RegisterData): Promise<void> => {
    try {
      const response: RegisterResponse = await registerUserApi(userData)
      if (response.isUserRegistered) {
        isUserRegistered.value = true
      }
      if (response.email) {
        user.value = response as User
      }
    } catch (err: any) {
      error.value = err.message
    }
  }

  const editUser = async (email: string, username: string, img?: string): Promise<void> => {
    try {
      await editUserApi(email, username, img)
    } catch (err: any) {
      error.value = err.message
    }
  }

  const logoutUser = async (): Promise<void> => {
    try {
      await logoutUserApi()
      user.value = null
      isUserRegistered.value = false
      isUserChecked.value = false
    } catch (err: any) {
      error.value = err.message
    }
  }

  return {
    user,
    error,
    registerData,
    isUserRegistered,
    isUserChecked,
    isUserLoading,
    getUser,
    loginUser,
    registerUser,
    editUser,
    logoutUser,
  }
})
