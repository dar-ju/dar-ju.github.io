<script setup>
import { useUserStore } from '@/stores/userStore'
import { useThemeStore } from '@/stores/themeStore'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()
const themeStore = useThemeStore()

// const isDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

const themeChange = () => {
  themeStore.themeToggle()
}

// onMounted(() => {
//   isDark ?

//   // const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
//   // updateTheme()
//   // mediaQuery.addEventListener('change', updateTheme)
// })
</script>

<template>
  <div class="header container">
    <h1 class="header__title">todo</h1>
    <div class="header__user" v-show="userStore.user?.user">
      <span class="header__user-name">{{ `${userStore.user?.user}'s todos` }}</span>
      <!-- <form action="/logout" method="POST"> -->
      <button class="header__btn" @click="userStore.logoutUser()">(log out)</button>
      <!-- </form> -->
    </div>
    <button
      class="header__theme-toggle"
      :class="themeStore.isDark ? 'header__theme-toggle_dark' : 'header__theme-toggle_light'"
      @click="themeChange()"
    ></button>
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
  &__theme-toggle {
    width: 26px;
    height: 26px;
    background-repeat: no-repeat;
    &_light {
      background-image: url('/assets/images/icon-moon.svg');
    }
    &_dark {
      background-image: url('/assets/images/icon-sun.svg');
    }
  }
}

@media (max-width: 660px) {
  .header {
    margin-bottom: 30px;
    gap: 20px 120px;
    flex-wrap: wrap;
    &__user {
      order: 1;
    }
  }
}

@media (max-width: 520px) {
  .header {
    &__title {
      letter-spacing: 10px;
      font-size: 1.5rem;
    }
    &__theme-toggle {
      scale: 0.8;
    }
  }
}
</style>
