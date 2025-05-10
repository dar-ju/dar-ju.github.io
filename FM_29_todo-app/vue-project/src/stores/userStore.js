import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getSessionApi, loginUserApi, registerUserApi, logoutUserApi } from '@/api/user.js'

export const useUserStore = defineStore('user', () => {
  const user = ref('')
  const error = ref('')

  const getUser = async () => {
    try {
      const response = await getSessionApi()
      user.value = response
    } catch (err) {
      error.value = err.message
    }
  }

  const loginUser = async (username, password) => {
    try {
      const response = await loginUserApi(username, password)
      user.value = response
    } catch (err) {
      error.value = err.message
    }
  }

  const registerUser = async (username, password) => {
    try {
      const response = await registerUserApi(username, password)
      user.value = response
    } catch (err) {
      error.value = err.message
    }
  }

  const logoutUser = async () => {
    try {
      await logoutUserApi()
      user.value = ''
    } catch (err) {
      error.value = err.message
    }
  }

  return { user, error, getUser, loginUser, registerUser, logoutUser }
})
