<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import PersonalizeForm from '@/components/forms/PersonalizeForm.vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const spinnerLoading = ref(false)
// to personalize form
// const toPersonalize = ref(false)

const emit = defineEmits<{
  (e: 'isLoginForm', value: boolean): void
}>()

const toggleLogin = () => {
  emit('isLoginForm', true)
  userStore.isUserRegistered = false
  userStore.isUserChecked = false
}

// form check
const form = ref<HTMLFormElement | null>(null)
const handleSubmit = async (event: Event) => {
  const currentForm = form.value
  if (!currentForm) return
  if (!currentForm.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
    currentForm.classList.add('was-validated')
  } else {
    const formData = new FormData(currentForm)
    const email = formData.get('email')?.toString() || ''
    const password = formData.get('password')?.toString() || ''
    userStore.registerData.email = email
    userStore.registerData.password = password
    spinnerLoading.value = true
    await userStore.registerUser(userStore.registerData)
    spinnerLoading.value = false
    userStore.isUserChecked = true
    if (!userStore.isUserRegistered) {
      // userStore.isUserRegistered = false
    }
  }
  // currentForm.classList.add('was-validated')
}
</script>

<template>
  <Transition name="fade" mode="out-in">
    <PersonalizeForm v-if="!userStore.isUserRegistered && userStore.isUserChecked" />

    <div v-else class="login__wrapper">
      <h1 class="title login__title">Create an&nbsp;account</h1>
      <p class="login__descr">Join to track your daily mood and sleep with ease.</p>
      <form class="login__form" ref="form" novalidate @submit.prevent="handleSubmit">
        <div class="login__email-wrapper">
          <label for="email" class="form-label login__email-label">Email address</label>
          <input
            type="email"
            class="form-control login__input"
            id="email"
            name="email"
            placeholder="name@mail.com"
            aria-describedby="emailHelp"
            required
            @input="[(userStore.isUserRegistered = false), (userStore.isUserChecked = false)]"
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
          <div v-if="userStore.isUserRegistered" class="login__invalid-wrapper">
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
            <span>User with this email already exists</span>
          </div>
        </div>
        <div class="login__password-wrapper">
          <label for="password" class="form-label login__password-label">Password</label>
          <input
            type="password"
            class="form-control login__input"
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary login__btn">
          Sign Up
          <div
            v-if="spinnerLoading"
            class="spinner-border spinner-border-sm ms-auto"
            role="status"
            aria-hidden="true"
          ></div>
        </button>
      </form>
      <p class="login__toggle">
        Already got an account? <a @click="toggleLogin()" class="login__login">Log&nbsp;in.</a>
      </p>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/_typography' as *;
.login {
  &__container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
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
    color: var(--red-700);
    @include text-preset(preset9);
  }
}
</style>
