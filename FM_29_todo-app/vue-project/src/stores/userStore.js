import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getSessionApi, loginUserApi, registerUserApi, logoutUserApi } from '@/api/user.js'

export const useUserStore = defineStore('user', () => {
  const user = ref('')
  const error = ref('')

  const getUser = async () => {
    const response = await getSessionApi()
    user.value = response
  }

  const loginUser = async (username, password) => {
    try {
      const response = await loginUserApi(username, password)
      user.value = response
      console.log(response);

    } catch (err) {
      error.value = err.message
    }
  }

  const registerUser = async (username, password) => {
    const response = await registerUserApi(username, password)
    user.value = response
  }

  const logoutUser = async () => {
    await logoutUserApi()
    user.value = ''
  }

  return { user, error, getUser, loginUser, registerUser, logoutUser }
})
