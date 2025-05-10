import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getTodosApi, createTodoApi, toggleTodoApi, updateTodoOrderApi, deleteTodoApi } from '@/api/todo.js'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])
  const todosActive = ref([])
  const todosCompleted = ref([])
  const todosLength = ref(0)
  const error = ref('')

  const clearErrorMessage = () => {
    setTimeout(() => {
      error.value = ''
    }, 4000);
  }

  const getTodos = async () => {
    try {
      const response = await getTodosApi()
      const sortList = response.sort((a, b) => a.order - b.order);
      todos.value = sortList
      todosActive.value = todos.value.filter((item) => item.done === false)
      todosCompleted.value = todos.value.filter((item) => item.done === true)
      todosLength.value = todosActive.value.length
    } catch (err) {
      error.value = err.message
      clearErrorMessage()
    }
  }

  const getActiveTodos = () => {
    todos.value = todosActive.value
  }

  const getCompletedTodos = () => {
    todos.value = todosCompleted.value
  }

  const createTodo = async (todo, user) => {
    try {
      await createTodoApi(todo, user)
    } catch (err) {
      error.value = err.message
      clearErrorMessage()
    }
    await getTodos()
  }

  const toggleTodo = async (id) => {
    try {
      await toggleTodoApi(id)
    } catch (err) {
      error.value = err.message
      clearErrorMessage()
    }
    await getTodos()
  }

  const orderTodo = async (todoId, newOrder) => {
    await updateTodoOrderApi(todoId, newOrder)
  }

  const deleteTodo = async (id) => {
    try {
      await deleteTodoApi(id)
    } catch (err) {
      error.value = err.message
      clearErrorMessage()
    }
    await getTodos()
  }

  return { todos, todosLength, error, getActiveTodos, getCompletedTodos, getTodos, createTodo, toggleTodo, orderTodo, deleteTodo }
})
