<script setup></script>

<template>
  <li class="todo-item">
    <button class="check-circle todo-item__check"></button>
    <span class="todo-item__task-name">Complete online JavaScript course</span>
  </li>
  <li class="todo-item">
    <button class="check-circle todo-item__check"></button>
    <span class="todo-item__task-name">Jog around the park 3x</span>
  </li>
  <li class="todo-item">
    <button class="check-circle todo-item__check"></button>
    <span class="todo-item__task-name">Complete online JavaScript course</span>
  </li>
  <li class="todo-item">
    <button class="check-circle todo-item__check"></button>
    <span class="todo-item__task-name">Jog around the park 3x</span>
  </li>
  <li class="todo-item">
    <button class="check-circle todo-item__check"></button>
    <span class="todo-item__task-name">Complete online JavaScript course</span>
  </li>
  <li class="todo-item">
    <button class="check-circle todo-item__check"></button>
    <span class="todo-item__task-name">Jog around the park 3x</span>
  </li>
</template>

<style lang="scss" scoped>
.todo-item {
  position: relative;
  display: flex;
  min-height: 65px;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--very-light-grayish-blue);
  // background-color: var(--white);
  &__check {
    width: 60px;
    // margin-right: 40px;
    &::before {
      left: 24px;
    }
  }
  &__task-name {
    // display: block;
    font-size: 0.97rem;
    color: var(--very-dark-grayish-blue);
  }
}
</style>
