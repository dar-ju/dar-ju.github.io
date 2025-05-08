<script setup>
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'

const userStore = useUserStore()

const loginForm = ref(true)
const name = ref('')
const password = ref('')

const formToggle = () => {
  loginForm.value = !loginForm.value
}

const login = async (username, password) => {
  await userStore.loginUser(username, password)
}

const register = async (username, password) => {
  await userStore.registerUser(username, password)
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
          <button class="auth__btn" type="submit">Login</button>
        </form>
        <div class="auth__rigester-block">
          <span>Don't have an account?</span>
          <button type="button" aria-label="Register for a new account" @click="formToggle">
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
          <button class="auth__btn" type="submit">Register</button>
        </form>
        <div class="auth__rigester-block">
          <span>Have an account?</span>
          <button type="button" aria-label="Register for a new account" @click="formToggle">
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
  padding: 40px 0;
  flex-direction: column;
  align-items: center;
  &__title {
    margin-bottom: 70px;
    text-align: center;
  }
  &__block {
    padding: 50px;
    border-radius: 5px;
    border: 1px solid var(--very-light-grayish-blue);
    box-shadow: 0 25px 40px -10px var(--very-light-grayish-blue);
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
    border: 1px solid var(--light-grayish-blue);
  }
  &__btn {
    min-width: 100px;
    padding: 7px;
    border-radius: 5px;
    border: 1px solid var(--light-grayish-blue);
  }
  &__rigester-block {
    display: flex;
    gap: 15px;
    color: var(--light-grayish-blue);
  }
}
</style>
