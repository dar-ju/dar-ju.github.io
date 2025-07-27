<script setup lang="ts">
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(() => {
  try {
    userStore.getUser()
  } catch (err) {
    console.log('User not authorized')
  }
})
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div class="loading" v-if="userStore.isUserLoading">
      <div class="loading__wrapper">
        <img
          class="loading__logo"
          src="/assets/images/logo.svg"
          alt="Mood app logo"
          width="178"
          height="40"
        />
        <span>Loading...</span>
      </div>
    </div>
    <DashboardView v-else-if="userStore.user?.email" />
    <LoginView v-else />
  </Transition>
</template>

<style lang="scss" scoped>
.loading {
  position: relative;
  height: 100vh;
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    max-height: 80px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
  &__logo {
    animation: logoPulse 1s ease-in-out infinite;
  }
}
</style>
