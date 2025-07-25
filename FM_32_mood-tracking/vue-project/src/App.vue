<script setup lang="ts">
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(async () => {
  try {
    await userStore.getUser()
  } catch (err) {
    console.log('Пользователь не авторизован')
  }
})
</script>

<template>
  <Transition name="fade" mode="out-in">
    <DashboardView v-if="userStore.user?.email" />
    <LoginView v-else />
  </Transition>
</template>

<style scoped></style>
