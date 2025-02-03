<script setup></script>

<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="in-out">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.app {
  position: relative;
}
</style>
