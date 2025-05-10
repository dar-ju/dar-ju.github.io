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
const selectedList = ref('All')

onMounted(async () => {
  await todoStore.getTodos()
})

const addNewTodo = async (todo, user) => {
  loadingDone.value = true
  await todoStore.createTodo(todo, user)
  todoText.value = ''
  loadingDone.value = false
}

const onOrderChange = async (event) => {
  if (event.oldIndex !== undefined && event.newIndex !== undefined) {
    const movedElement = todoStore.todos[event.newIndex]
    const oldIndex = event.oldIndex
    const movedItemId = movedElement._id
    const targetItemId = todoStore.todos[oldIndex]._id
    const movedItemOrder = movedElement.order
    const targetItemOrder = todoStore.todos[oldIndex].order
    movedElement.order = targetItemOrder
    todoStore.todos[oldIndex].order = movedItemOrder

    await todoStore.orderTodo(movedItemId, targetItemOrder)
    await todoStore.orderTodo(targetItemId, movedItemOrder)
  } else {
    console.log('No movement info')
  }
}

const selectAllList = async () => {
  loadingDone.value = true
  await todoStore.getTodos()
  loadingDone.value = false
  selectedList.value = 'All'
}

const clearComplited = () => {
  todoStore.todos.forEach(async (element) => {
    if (element.done) {
      const id = element._id
      loadingDone.value = true
      await todoStore.deleteTodo(id)
      loadingDone.value = false
    }
  })
}
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
        <span class="todo__left">{{ todoStore.todosLength }} items left</span>
        <ul class="todo__select">
          <li>
            <button
              class="todo__select-item"
              @click="selectAllList()"
              :class="{ 'todo__select-item_active': selectedList === 'All' }"
            >
              All
            </button>
          </li>
          <li>
            <button
              class="todo__select-item"
              @click="
                () => {
                  todoStore.getActiveTodos()
                  selectedList = 'Active'
                }
              "
              :class="{ 'todo__select-item_active': selectedList === 'Active' }"
            >
              Active
            </button>
          </li>
          <li>
            <button
              class="todo__select-item"
              @click="
                () => {
                  todoStore.getCompletedTodos()
                  selectedList = 'Completed'
                }
              "
              :class="{ 'todo__select-item_active': selectedList === 'Completed' }"
            >
              Completed
            </button>
          </li>
        </ul>
        <button class="todo__clear" @click="clearComplited">Clear Completed</button>
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
      border: 1px solid var(--item-border);
    }
  }
  &__wrapper {
    margin-bottom: 50px;
    box-shadow: 0 25px 40px -10px var(--box-shadow);
  }
  &__input {
    height: 64px;
    width: 100%;
    padding-right: 25px;
    padding-left: 72px;
    font-size: 0.97rem;
    border-radius: 5px;
    color: var(--item-color);
    background-color: var(--block-background);
    &::placeholder {
      color: var(--input-placeholder);
    }
  }
  &__list {
    width: 100%;
    border-radius: 5px;
    background-color: var(--block-background);
  }
  &__operate {
    display: flex;
    padding: 17px 23px;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    font-size: 0.77rem;
    color: var(--bottom-menu-color);
    background-color: var(--block-background);
  }
  &__select {
    display: flex;
    padding-left: 40px;
    gap: 20px;
  }
  &__select-item {
    font-weight: 700;
    color: var(--bottom-menu-color);
    &_active {
      color: var(--blue);
    }
    &:hover {
      color: var(--bottom-menu-color-hover);
    }
  }
  &__clear {
    color: var(--bottom-menu-color);
    &:hover {
      color: var(--bottom-menu-color-hover);
    }
  }
  &__notice {
    text-align: center;
    font-size: 0.76rem;
    color: var(--bottom-menu-color);
  }
  &__loading {
    top: 32px;
    left: 126px;
  }
}

@media (max-width: 660px) {
  .todo {
    &__form {
      // margin-bottom: 0;
      &::before {
        width: 25px;
        height: 25px;
        top: 20px;
        left: 50px;
      }
    }
    &__loading {
      top: 32px;
      left: 50px;
    }
  }
}

@media (max-width: 520px) {
  .todo {
    &__input {
      height: 49px;
      padding-left: 52px;
      font-size: 0.65rem;
    }
    &__form {
      margin-bottom: 0;
      &::before {
        width: 20px;
        height: 20px;
        top: 15px;
        left: 44px;
      }
    }
    &__operate {
      position: relative;
      padding: 18px 20px;
      font-size: 0.65rem;
    }
    &__select {
      position: absolute;
      top: 66px;
      background-color: var(--block-background);
      padding: 17px;
      width: 100%;
      left: 0;
      display: flex;
      justify-content: center;
      border-radius: 5px;
      font-size: 0.75rem;
    }
    &__wrapper {
      margin-bottom: 108px;
    }
    &__loading {
      top: 23px;
      left: 41px;
      scale: 0.85;
    }
  }
}
</style>
