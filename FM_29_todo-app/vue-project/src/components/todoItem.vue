<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()

// const item = ref(false)
const loadingDone = ref(false)

const props = defineProps({
  todo: {
    type: Object,
    required: false,
  },
})

const toggleItem = async (id) => {
  loadingDone.value = true
  await todoStore.toggleTodo(id)
  loadingDone.value = false
  // item.value = !item.value
  // item.value = todoStore.todos.done
}

const deleteItem = async (id) => {
  loadingDone.value = true
  await todoStore.deleteTodo(id)
  loadingDone.value = false
}
</script>

<template>
  <li class="todo-item">
    <div
      class="todo-item__wrapper"
      @click="toggleItem(props.todo._id)"
      :class="{ 'todo-item__wrapper_hover': !loadingDone }"
    >
      <div class="loading" v-show="loadingDone">
        <div class="loading-circles"></div>
      </div>
      <button class="todo-item__check" :class="{ 'checked-btn': props.todo.done }"></button>
      <span class="todo-item__task-name" :class="{ 'checked-task-name': props.todo.done }">{{
        props.todo.todo
      }}</span>
    </div>
    <button class="todo-item__delete" @click="deleteItem(props.todo._id)">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path
          fill="#494C6B"
          fill-rule="evenodd"
          d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
        />
      </svg>
    </button>
  </li>
  <!-- <li class="todo-item">
    <div class="todo-item__wrapper">
      <button
        class="todo-item__check"
        @click="toggleItem"
        :class="{ 'checked-btn': item }"
      ></button>
      <span class="todo-item__task-name" :class="{ 'checked-task-name': item }"
        >Complete online JavaScript course</span
      >
    </div>
    <button class="todo-item__delete">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path
          fill="#494C6B"
          fill-rule="evenodd"
          d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
        />
      </svg>
    </button>
  </li>
  <li class="todo-item">
    <button class="todo-item__check"></button>
    <span class="todo-item__task-name">Complete online JavaScript course</span>
  </li>
  <li class="todo-item">
    <button class="todo-item__check"></button>
    <span class="todo-item__task-name">Jog around the park 3x</span>
  </li>
  <li class="todo-item">
    <button class="todo-item__check"></button>
    <span class="todo-item__task-name">Complete online JavaScript course</span>
  </li>
  <li class="todo-item">
    <button class="todo-item__check"></button>
    <span class="todo-item__task-name">Jog around the park 3x</span>
  </li> -->
</template>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  min-height: 64px;
  padding: 19px 25px;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  border-bottom: 1px solid var(--very-light-grayish-blue);
  &__wrapper {
    position: relative;
    display: flex;
    align-items: flex-end;
    gap: 20px;
    cursor: pointer;
    &_hover {
      &:hover button:not(.checked-btn) {
        background: var(--check-background);
        &:not(.checked-btn)::before {
          content: '';
          position: absolute;
          width: 21px;
          height: 21px;
          top: 1px;
          left: 1px;
          border-radius: 50%;
          background-color: var(--white);
        }
      }
    }
  }
  &__check {
    position: relative;
    min-width: 25px;
    height: 25px;
    align-self: center;
    border-radius: 50%;
    border: 1px solid var(--very-light-grayish-blue);
    transition: border ease-in-out 0.3s;
  }
  &__task-name {
    font-size: 0.97rem;
    line-height: 1.2rem;
    color: var(--very-dark-grayish-blue);
  }
  &__delete {
    line-height: 0;
  }
}

.checked-btn {
  background:
    url('/images/icon-check.svg') no-repeat center,
    var(--check-background);
}

.checked-task-name {
  color: var(--light-grayish-blue);
  text-decoration: line-through;
}
</style>
