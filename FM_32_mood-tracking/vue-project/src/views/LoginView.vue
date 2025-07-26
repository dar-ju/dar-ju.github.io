<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from '@/components/forms/LoginForm.vue'
import RegisterForm from '@/components/forms/RegisterForm.vue'
const isLoginForm = ref(true)

const handleToggleForm = (val: boolean) => {
  isLoginForm.value = val
}
</script>

<template>
  <div class="section login">
    <div class="container login__container">
      <img
        class="login__logo"
        src="/assets/images/logo.svg"
        alt="Mood app logo"
        width="178"
        height="40"
      />
      <Transition name="fade" mode="out-in">
        <LoginForm v-if="isLoginForm" @isLoginForm="handleToggleForm" />
        <RegisterForm v-else @isLoginForm="handleToggleForm" />
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &__container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  &__logo {
    margin: 0 auto;
    margin-bottom: 48px;
  }
}
</style>
