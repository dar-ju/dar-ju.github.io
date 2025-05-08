<script setup>
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
  <div class="header container">
    <h1 class="header__title">todo</h1>
    <div class="header__user" v-show="userStore.user?.user">
      <span class="header__user">{{ `${userStore.user?.user}'s todos` }}</span>
      <!-- <form action="/logout" method="POST"> -->
      <button class="header__btn" @click="userStore.logoutUser()">(log out)</button>
      <!-- </form> -->
    </div>
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
  &__user {
    display: flex;
    gap: 10px;
  }
  &__btn {
    color: var(--white);
    text-decoration: underline;
  }
}
</style>
