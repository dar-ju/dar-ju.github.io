<script setup lang="ts">
import { defineEmits, ref } from 'vue'

const emit = defineEmits<{
  (e: 'isLoginForm', value: boolean): void
}>()

const toggleLogin = () => {
  emit('isLoginForm', false)
}

// form check
const form = ref<HTMLFormElement | null>(null)
const handleSubmit = (event: Event) => {
  const currentForm = form.value
  if (!currentForm) return
  if (!currentForm.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  }
  currentForm.classList.add('was-validated')
}
</script>

<template>
  <div class="login__wrapper">
    <h1 class="title login__title">Welcome back!</h1>
    <p class="login__descr">Log in to continue tracking your mood and sleep.</p>
    <form class="login__form" ref="form" novalidate @submit.prevent="(e) => handleSubmit(e)">
      <div class="login__email-wrapper">
        <label for="email" class="form-label login__email-label">Email address</label>
        <input
          type="email"
          class="form-control login__input"
          id="email"
          placeholder="name@mail.com"
          aria-describedby="emailHelp"
        />
        <div class="invalid-feedback">
          <div class="login__invalid-wrapper">
            <svg
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.8125 0.6875C9 0.6875 11.625 3.3125 11.625 6.5C11.625 9.71094 9 12.3125 5.8125 12.3125C2.60156 12.3125 0 9.71094 0 6.5C0 3.3125 2.60156 0.6875 5.8125 0.6875ZM5.8125 3.26562C5.25 3.26562 4.82812 3.71094 4.82812 4.25C4.82812 4.8125 5.25 5.23438 5.8125 5.23438C6.35156 5.23438 6.79688 4.8125 6.79688 4.25C6.79688 3.71094 6.35156 3.26562 5.8125 3.26562ZM7.125 9.21875V8.65625C7.125 8.51562 6.98438 8.375 6.84375 8.375H6.5625V6.03125C6.5625 5.89062 6.42188 5.75 6.28125 5.75H4.78125C4.61719 5.75 4.5 5.89062 4.5 6.03125V6.59375C4.5 6.75781 4.61719 6.875 4.78125 6.875H5.0625V8.375H4.78125C4.61719 8.375 4.5 8.51562 4.5 8.65625V9.21875C4.5 9.38281 4.61719 9.5 4.78125 9.5H6.84375C6.98438 9.5 7.125 9.38281 7.125 9.21875Z"
                fill="#E60013"
              />
            </svg>
            <span>Invalid email format.</span>
          </div>
        </div>
      </div>
      <div class="login__password-wrapper">
        <label for="password" class="form-label login__password-label">Password</label>
        <input type="password" class="form-control login__input" id="password" />
      </div>
      <button type="submit" class="btn btn-primary login__btn">Log In</button>
    </form>
    <p class="login__toggle">
      Haven't got an account? <a @click="toggleLogin()" class="login__login">Sign&nbsp;up.</a>
    </p>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/_typography' as *;
.login {
  &__wrapper {
    width: 100%;
    max-width: 530px;
    padding: 40px 32px;
    background-color: var(--white);
    border-radius: 16px;
    box-shadow: 0px 8px 16px 0px var(--shadow);
  }
  &__title {
    @include text-preset(preset3);
    color: var(--neutral-900);
    margin-bottom: 8px;
  }
  &__descr {
    @include text-preset(preset6reg);
    margin-bottom: 32px;
  }

  &__form {
    margin-bottom: 20px;
  }
  &__input {
    border-radius: 10px;
  }
  &__email-wrapper {
    margin-bottom: 20px;
  }
  &__password-wrapper {
    margin-bottom: 32px;
  }
  &__btn {
    width: 100%;
  }

  &__toggle {
    text-align: center;
    @include text-preset(preset6reg);
  }
  &__login {
    color: var(--blue-600);
    cursor: pointer;
  }
  &__invalid-wrapper {
    display: flex;
    padding-top: 6px;
    gap: 6px;
    @include text-preset(preset9);
  }
}
</style>
