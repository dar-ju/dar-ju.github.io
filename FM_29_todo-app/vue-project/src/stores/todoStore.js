import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getTodosApi, createTodoApi, toggleTodoApi, updateTodoOrderApi, deleteTodoApi } from '@/api/todo.js'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])

  const getTodos = async () => {
    const response = await getTodosApi()
    todos.value = response
  }

  const createTodo = async (todo, user) => {
    await createTodoApi(todo, user)
    await getTodos()
  }

  const toggleTodo = async (id) => {
    await toggleTodoApi(id)
    await getTodos()
  }

  const orderTodo = async (todoId, newOrder) => {
    await updateTodoOrderApi(todoId, newOrder)
    await getTodos()
  }

  const deleteTodo = async (id) => {
    await deleteTodoApi(id)
    await getTodos()
  }

  return { todos, getTodos, createTodo, toggleTodo, orderTodo, deleteTodo }
})
