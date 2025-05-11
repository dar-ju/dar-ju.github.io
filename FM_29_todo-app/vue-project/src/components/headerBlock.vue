<script setup>
import { useUserStore } from '@/stores/userStore'
import { useThemeStore } from '@/stores/themeStore'
import { ref } from 'vue'

const userStore = useUserStore()
const themeStore = useThemeStore()
const loading = ref(false)

const themeChange = () => {
  themeStore.themeToggle()
}

const logout = async () => {
  loading.value = true
  await userStore.logoutUser()
  loading.value = false
}
</script>

<template>
  <div class="header container">
    <h1 class="header__title">todo</h1>
    <div class="header__user" v-show="userStore.user?.username">
      <span class="header__user-name">{{ `${userStore.user?.username}'s todos` }}</span>
      <button class="header__logout-btn" @click="logout()">(log out)</button>
      <div class="loading header__loading" v-show="loading">
        <div class="loading-circles"></div>
      </div>
    </div>
    <button
      class="header__theme-toggle"
      :class="themeStore.isDark ? 'header__theme-toggle_dark' : 'header__theme-toggle_light'"
      @click="themeChange()"
      aria-label="Toggle theme mode"
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
    position: relative;
    margin-right: 20px;
    gap: 10px;
  }
  &__logout-btn {
    color: var(--white);
    text-decoration: underline;
    &:focus-visible {
      outline: 1px solid var(--gray);
      outline-offset: 3px;
    }
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
    &:focus-visible {
      outline: 1px solid var(--gray);
      outline-offset: 3px;
    }
  }
  &__loading {
    right: -37px;
    transform: translate(0, -50%);
    & div {
      border-color: transparent var(--white) var(--gray);
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
