<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  active: Number,
})

// const screenWidth = ref(window.innerWidth)
</script>

<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item">
        <span class="nav__number" :class="props.active === 1 ? 'nav__active' : ''">1</span>
        <div class="nav__block">
          <span class="nav__step">Step 1</span>
          <span class="nav__step-name">Your info</span>
        </div>
      </li>
      <li class="nav__item">
        <span class="nav__number" :class="props.active === 2 ? 'nav__active' : ''">2</span>
        <div class="nav__block">
          <span class="nav__step">Step 2</span>
          <span class="nav__step-name">Select plan</span>
        </div>
      </li>
      <li class="nav__item">
        <span class="nav__number" :class="props.active === 3 ? 'nav__active' : ''">3</span>
        <div class="nav__block">
          <span class="nav__step">Step 3</span>
          <span class="nav__step-name">Add-ons</span>
        </div>
      </li>
      <li class="nav__item">
        <span
          class="nav__number"
          :class="props.active === 4 || props.active === 5 ? 'nav__active' : ''"
          >4</span
        >
        <div class="nav__block">
          <span class="nav__step">Step 4</span>
          <span class="nav__step-name">Summary</span>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  width: 274px;
  min-width: 218px;
  min-height: 568px;
  padding: 40px 32px;
  background: url('./src/assets/images/bg-sidebar-desktop.svg') no-repeat;
  text-transform: uppercase;
  color: var(--white);
  border-radius: 10px;
  &__list {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  &__item {
    display: flex;
    gap: 16px;
  }
  &__number {
    display: flex;
    width: 33px;
    height: 33px;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--white);
    border-radius: 50%;
    font-size: 0.9rem;
    font-weight: 500;
  }
  &__block {
    display: flex;
    gap: 2px;
    flex-direction: column;
  }
  &__step {
    font-size: 0.75rem;
    color: var(--cool-gray);
  }
  &__step-name {
    font-size: 0.92rem;
    font-weight: 500;
    letter-spacing: 1px;
  }
  &__active {
    background-color: var(--light-blue);
    color: initial;
    border: 1px solid var(--light-blue);
  }
}

@media (max-width: 768px) {
  .nav {
    width: 100%;
    min-height: 172px;
    padding: 32px;
    background: top/cover no-repeat url('./src/assets/images/bg-sidebar-mobile.svg');
    border-radius: initial;
    &__block {
      display: none;
    }
    &__list {
      gap: 16px;
      flex-direction: row;
      justify-content: center;
    }
  }
}
</style>
