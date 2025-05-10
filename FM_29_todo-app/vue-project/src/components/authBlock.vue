<script setup>
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'

const userStore = useUserStore()

const loginForm = ref(true)
const name = ref('')
const password = ref('')
const loading = ref(false)

const formToggle = () => {
  loginForm.value = !loginForm.value
}

const login = async (username, password) => {
  loading.value = true
  await userStore.loginUser(username, password)
  loading.value = false
}

const register = async (username, password) => {
  loading.value = true
  await userStore.registerUser(username, password)
  loading.value = false
}
</script>

<template>
  <div class="auth container">
    <div class="auth__login" v-show="loginForm">
      <h1 id="auth-title" class="auth__title">Log Into Your Account</h1>
      <div class="auth__block">
        <form
          class="auth__form"
          method="post"
          aria-labelledby="auth-title"
          @submit.prevent="login(name, password)"
        >
          <input
            class="auth__input"
            type="text"
            name="username"
            placeholder="User"
            aria-label="Username"
            maxlength="20"
            required
            v-model="name"
          />
          <input
            class="auth__input"
            type="password"
            name="password"
            placeholder="Password"
            maxlength="20"
            required
            v-model="password"
          />
          <button class="auth__btn" type="submit">
            <span>Login</span>
            <span class="loading auth__loading" v-show="loading">
              <div class="loading-circles"></div>
            </span>
          </button>
          <span class="auth__message" v-show="userStore.error">{{ userStore.error }}</span>
        </form>
        <div class="auth__rigester-block">
          <span class="auth__note">Don't have an account?</span>
          <button
            class="auth__toggle"
            type="button"
            aria-label="Register for a new account"
            @click="formToggle"
          >
            Register
          </button>
        </div>
      </div>
    </div>

    <div class="auth__register" v-show="!loginForm">
      <h1 id="auth-title" class="auth__title">Register Account</h1>
      <div class="auth__block">
        <form
          class="auth__form"
          method="post"
          aria-labelledby="auth-title"
          @submit.prevent="register(name, password)"
        >
          <input
            class="auth__input"
            type="text"
            name="username"
            placeholder="User"
            aria-label="Username"
            maxlength="20"
            required
            v-model="name"
          />
          <input
            class="auth__input"
            type="password"
            name="password"
            placeholder="Password"
            maxlength="20"
            required
            v-model="password"
          />
          <button class="auth__btn" type="submit">
            <span>Register</span>
            <span class="loading auth__loading" v-show="loading">
              <div class="loading-circles"></div>
            </span>
          </button>
        </form>
        <div class="auth__rigester-block">
          <span class="auth__note">Have an account?</span>
          <button
            class="auth__toggle"
            type="button"
            aria-label="Register for a new account"
            @click="formToggle"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  display: flex;
  padding: 20px 0;
  flex-direction: column;
  align-items: center;
  &__title {
    margin-bottom: 40px;
    text-align: center;
  }
  &__block {
    padding: 50px;
    border-radius: 5px;
    border: 1px solid var(--item-border);
    background-color: var(--block-background);
    box-shadow: 0 25px 40px -10px var(--box-shadow);
  }
  &__form {
    display: flex;
    width: 300px;
    margin-bottom: 30px;
    gap: 20px;
    flex-direction: column;
    align-items: flex-start;
  }
  &__input {
    width: 100%;
    min-height: 40px;
    padding: 0 20px;
    border-radius: 5px;
    border: 1px solid var(--item-border);
    color: var(--body-color);
    background-color: var(--block-background);
    &:focus-visible {
      outline: 1px solid var(--gray);
    }
  }
  &__btn {
    position: relative;
    min-width: 100px;
    padding: 7px;
    border-radius: 5px;
    border: 1px solid var(--item-border);
    color: var(--body-color);
    &:hover {
      color: var(--block-background);
      background-color: var(--bottom-menu-color-hover);
    }
    &:focus-visible {
      outline: 1px solid var(--gray);
    }
  }
  &__message {
    font-size: 0.7rem;
    color: var(--red);
    font-style: italic;
  }
  &__rigester-block {
    display: flex;
    gap: 15px;
    justify-content: space-between;
    color: var(--item-border);
  }
  &__note {
    color: var(--bottom-menu-color);
  }
  &__toggle {
    color: var(--body-color);
    &:hover {
      color: var(--bottom-menu-color-hover);
    }
    &:focus-visible {
      outline: 1px solid var(--gray);
      outline-offset: 3px;
    }
  }
  &__loading {
    right: -45px;
  }
}

@media (max-width: 520px) {
  .auth {
    &__form {
      width: initial;
    }
  }
}
</style>
