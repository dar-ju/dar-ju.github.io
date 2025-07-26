import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getSessionApi,
  loginUserApi,
  registerUserApi,
  editUserApi,
  logoutUserApi,
} from '@/api/user.js'

export const useUserStore = defineStore('user', () => {
  const user = ref('')
  const error = ref('')
  const isUserRegistered = ref(false)
  const isUserChecked = ref(false)
  const isUserLoading = ref(true)

  const registerData = ref({
    email: '',
    password: '',
    username: '',
    img: '',
  })

  const getUser = async () => {
    try {
      const response = await getSessionApi()
      if (!response) {
        return null
      }
      user.value = response.user
    } catch (err) {
      error.value = err.message
    } finally {
      isUserLoading.value = false
    }
  }

  const loginUser = async (email, password) => {
    try {
      const response = await loginUserApi(email, password)
      user.value = response
    } catch (err) {
      error.value = err.message
    }
  }

  const registerUser = async (userData) => {
    try {
      const response = await registerUserApi(userData)
      if (response.isUserRegistered) {
        isUserRegistered.value = true
        return
      }
      user.value = response
    } catch (err) {
      error.value = err.message
    }
  }

  const editUser = async (email, username, img) => {
    try {
      await editUserApi(email, username, img)
      // await getUser()
    } catch (err) {
      error.value = err.message
    }
  }

  const logoutUser = async () => {
    try {
      await logoutUserApi()
      user.value = ''
      isUserRegistered.value = false
      isUserChecked.value = false
    } catch (err) {
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
