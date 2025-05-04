<script setup>
import TodoList from './todoItem.vue'
</script>

<template>
  <div class="todo container">
    <form class="check-circle todo__form">
      <input class="todo__input" type="text" placeholder="Create a new todo..." />
    </form>
    <div class="todo__wrapper">
      <ul class="todo__list">
        <TodoList />
      </ul>
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
    margin-bottom: 24px;
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
}
</style>
