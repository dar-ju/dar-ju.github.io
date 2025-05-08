<script setup>
import HeaderBlock from '../components/headerBlock.vue'
import TodoBlock from '../components/todoBlock.vue'
import AuthBlock from '../components/authBlock.vue'
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()

const isSession = ref(false)

onMounted(async () => {
  await userStore.getUser()
  isSession.value = userStore.user ? true : false
})
</script>

<template>
  <div class="section">
    <header>
      <HeaderBlock />
    </header>
    <main>
      <TodoBlock v-if="isSession" />
      <AuthBlock v-if="!isSession" />
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
