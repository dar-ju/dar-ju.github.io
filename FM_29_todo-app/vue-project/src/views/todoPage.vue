<script setup>
import HeaderBlock from '../components/headerBlock.vue'
import TodoBlock from '../components/todoBlock.vue'
import AuthBlock from '../components/authBlock.vue'
import { useUserStore } from '@/stores/userStore'
</script>

<template>
  <div class="section">
    <header>
      <HeaderBlock />
    </header>
    <main>
      <TodoBlock />
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
