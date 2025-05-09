<script setup>
import { onMounted, ref } from 'vue'
import TodoItem from './todoItem.vue'
import { useTodoStore } from '@/stores/todoStore'
import { useUserStore } from '@/stores/userStore'
import { VueDraggable } from 'vue-draggable-plus'

const todoStore = useTodoStore()
const userStore = useUserStore()
const todoText = ref('')
const loadingDone = ref(false)
// const todos = ref([])

onMounted(async () => {
  await todoStore.getTodos()
  // todos.value = todoStore.todos
})

const addNewTodo = async (todo, user) => {
  loadingDone.value = true
  await todoStore.createTodo(todo, user)
  todoText.value = ''
  loadingDone.value = false
}

const onOrderChange = async (event) => {
  // console.log('onOrderChange triggered')
  // console.log('event:', event)
  if (event.oldIndex !== undefined && event.newIndex !== undefined) {
    const movedElement = todoStore.todos[event.newIndex]
    const oldIndex = event.oldIndex
    const newIndex = event.newIndex

    console.log(`Элемент "${movedElement.todo}" перемещен с индекса ${oldIndex} на ${newIndex}`)

    // Получаем ID перемещенного элемента
    const movedItemId = movedElement._id

    // Определяем ID элемента, с которым произошел обмен позиции
    const targetItemId = todoStore.todos[oldIndex]._id

    // Получаем текущие order обоих элементов
    const movedItemOrder = movedElement.order
    const targetItemOrder = todoStore.todos[oldIndex].order

    // Обновляем order в локальном массиве (это необходимо для UI)
    movedElement.order = targetItemOrder
    todoStore.todos[oldIndex].order = movedItemOrder

    // Отправляем на сервер запрос на обновление order только для этих двух элементов
    await todoStore.orderTodo(movedItemId, targetItemOrder)
    await todoStore.orderTodo(targetItemId, movedItemOrder)
  } else {
    console.log('Информация о перемещении отсутствует в событии.')
  }
}
// const onOrderChange = async (event) => {
//   console.log('onOrderChange triggered')
//   console.log('event:', event)
//   if (event.moved) {
//     const movedElement = todoStore.todos[event.moved.newIndex]
//     const oldIndex = event.moved.oldIndex
//     const newIndex = event.moved.newIndex

//     console.log(`Элемент "${movedElement.todo}" перемещен с индекса ${oldIndex} на ${newIndex}`)

//     // Получаем ID перемещенного элемента
//     const movedItemId = movedElement._id

//     // Определяем ID элемента, с которым произошел обмен позиции
//     const targetItemId = todoStore.todos[oldIndex]._id

//     // Получаем текущие order обоих элементов
//     const movedItemOrder = movedElement.order
//     const targetItemOrder = todoStore.todos[oldIndex].order

//     // Обновляем order в локальном массиве (это необходимо для UI)
//     movedElement.order = targetItemOrder
//     todoStore.todos[oldIndex].order = movedItemOrder

//     // Отправляем на сервер запрос на обновление order только для этих двух элементов
//     await todoStore.orderTodo(movedItemId, targetItemOrder)
//     await todoStore.orderTodo(targetItemId, movedItemOrder)
//   }
// }

// const fetchTodosWithOrder = async () => {
//   await todoStore.getTodos({ sortBy: 'order', sortDirection: 'asc' }); // Запрашиваем с сортировкой по полю order
// };
</script>

<template>
  <div class="todo container">
    <form class="todo__form" @submit.prevent="addNewTodo(todoText, userStore.user.user)">
      <div class="loading todo__loading" v-show="loadingDone">
        <div class="loading-circles"></div>
      </div>
      <input
        class="todo__input"
        type="text"
        placeholder="Create a new todo..."
        v-model="todoText"
      />
    </form>
    <div class="todo__wrapper">
      <VueDraggable class="todo__list" ref="el" v-model="todoStore.todos" @change="onOrderChange">
        <TodoItem v-for="todo in todoStore.todos" :key="todo._id" :todo="todo" />
      </VueDraggable>
      <div class="todo__operate">
        <span class="left">5 items left</span>
        <ul class="todo__select">
          <li><button class="todo__select-item">All</button></li>
          <li><button class="todo__select-item">Active</button></li>
          <li><button class="todo__select-item">Completed</button></li>
        </ul>
        <button class="todo__clear">Clear Completed</button>
      </div>
    </div>
    <p class="todo__notice">Drag and drop to reorder list</p>
  </div>
</template>

<style lang="scss" scoped>
.todo {
  position: relative;
  &__form {
    width: 100%;
    height: 64px;
    margin-bottom: 24px;
    &::before {
      content: '';
      position: absolute;
      width: 25px;
      height: 25px;
      top: 20px;
      left: 126px;
      border-radius: 50%;
      border: 1px solid var(--very-light-grayish-blue);
    }
  }
  &__wrapper {
    margin-bottom: 50px;
    box-shadow: 0 25px 40px -10px var(--very-light-grayish-blue);
  }
  &__input {
    height: 64px;
    width: 100%;
    padding-left: 72px;
    font-size: 0.97rem;
    border-radius: 5px;
    ::placeholder {
      color: var(--very-light-grayish-blue);
    }
  }
  &__list {
    width: 100%;
    border-radius: 5px;
    background-color: var(--white);
  }
  &__operate {
    display: flex;
    padding: 17px 23px;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    font-size: 0.77rem;
    color: var(--light-grayish-blue);
    background-color: var(--white);
  }
  &__select {
    display: flex;
    padding-left: 40px;
    gap: 20px;
  }
  &__select-item {
    font-weight: 700;
    color: var(--light-grayish-blue);
  }
  &__clear {
    color: var(--light-grayish-blue);
  }
  &__notice {
    text-align: center;
    font-size: 0.76rem;
    color: var(--light-grayish-blue);
  }
  &__loading {
    top: 32px;
    left: 126px;
  }
}
</style>
