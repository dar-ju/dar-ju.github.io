<script setup>
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
  <div class="header container">
    <h1 class="header__title">todo</h1>
    <span class="header__user">{{ `${userStore.user}'s todos` }}</span>
    <button>
      <img src="/images/icon-moon.svg" alt="" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  margin-bottom: 37px;
  align-items: center;
  justify-content: space-between;
  &__title {
    text-transform: uppercase;
    letter-spacing: 14px;
    font-size: 2.28rem;
    font-weight: 700;
  }
}
</style>
