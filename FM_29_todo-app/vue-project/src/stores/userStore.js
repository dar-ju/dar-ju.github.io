import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getSessionApi, loginUserApi, registerUserApi } from '@/api/user.js'

export const useUserStore = defineStore('user', () => {
  const user = ref('')

  const getUser = async () => {
    const response = await getSessionApi()
    user.value = response
  }

  const loginUser = async (username, password) => {
    const response = await loginUserApi(username, password)
    return response
  }

  const registerUser = async (username, password) => {
    const response = await registerUserApi(username, password)
    return response
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

  return { user, getUser, loginUser, registerUser }
})
