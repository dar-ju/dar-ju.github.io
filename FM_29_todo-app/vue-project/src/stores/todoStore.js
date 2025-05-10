import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getTodosApi, createTodoApi, toggleTodoApi, updateTodoOrderApi, deleteTodoApi } from '@/api/todo.js'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])
  const todosActive = ref([])
  const todosCompleted = ref([])
  const todosLength = ref(0)

  const getTodos = async () => {
    const response = await getTodosApi()
    const sortList = response.sort((a, b) => a.order - b.order);
    todos.value = sortList
    // todosLength.value = todos.value.filter((item) => item.done === false).length
    todosActive.value = todos.value.filter((item) => item.done === false)
    todosCompleted.value = todos.value.filter((item) => item.done === true)
    todosLength.value = todosActive.value.length
  }

  const getActiveTodos = () => {
    todos.value = todosActive.value
  }

  const getCompletedTodos = () => {
    todos.value = todosCompleted.value
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
    // await getTodos()
  }

  const deleteTodo = async (id) => {
    await deleteTodoApi(id)
    await getTodos()
  }

  return { todos, todosLength, getActiveTodos, getCompletedTodos, getTodos, createTodo, toggleTodo, orderTodo, deleteTodo }
})
