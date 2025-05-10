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
      <div class="loading todo-item__loading" v-show="loadingDone">
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
</template>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  min-height: 64px;
  padding: 19px 25px;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  border-bottom: 1px solid var(--item-border);
  &:hover button {
    opacity: 1;
    pointer-events: initial;
  }
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
          background-color: var(--block-background);
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
    border: 1px solid var(--item-border);
    transition: border ease-in-out 0.3s;
    &:focus-visible {
      outline: 1px solid var(--gray);
      outline-offset: 3px;
    }
  }
  &__task-name {
    font-size: 0.97rem;
    line-height: 1.2rem;
    color: var(--item-color);
  }
  &__delete {
    opacity: 0;
    pointer-events: none;
    line-height: 0;
    transition: opacity ease-in-out 0.3s;
    &:focus-visible {
      opacity: 1;
      outline: 1px solid var(--gray);
      outline-offset: 3px;
    }
  }
}

.checked-btn {
  background:
    url('/assets/images/icon-check.svg') no-repeat center,
    var(--check-background);
}

.checked-task-name {
  color: var(--item-color-checked);
  text-decoration: line-through;
}

@media (max-width: 768px) {
  .todo-item {
    &__delete {
      opacity: 1;
      scale: 0.75;
    }
  }
}

@media (max-width: 520px) {
  .todo-item {
    min-height: 53px;
    padding: 15px 19px;
    &__wrapper {
      gap: 10px;
    }
    &__check {
      min-width: 22px;
      height: 22px;
    }
    &__task-name {
      font-size: 0.65rem;
    }
    &__loading {
      top: 9px;
      left: -2px;
      scale: 0.85;
    }
    &__wrapper {
      &_hover {
        &:hover button:not(.checked-btn) {
          &:not(.checked-btn)::before {
            width: 18px;
            height: 18px;
            top: 1px;
            left: 1px;
          }
        }
      }
    }
  }
}
</style>
