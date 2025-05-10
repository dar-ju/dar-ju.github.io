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

  // const createTodo = async (todo, user) => {
  //   await createTodoApi(todo, user)
  //   await getTodos()
  // }

  // const toggleTodo = async (id) => {
  //   await toggleTodoApi(id)
  //   await getTodos()
  // }

  // const deleteTodo = async (id) => {
  //   await deleteTodoApi(id)
  //   await getTodos()
  // }

  return { user, error, getUser, loginUser, registerUser, logoutUser }
})
