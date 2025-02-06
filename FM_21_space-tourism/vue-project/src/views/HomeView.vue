<script setup>
import HeaderSection from '@/components/HeaderSection.vue'
import HomeComponent from '@/components/HomeComponent.vue'
</script>

<template>
  <div class="section home">
    <HeaderSection />
    <HomeComponent />
  </div>
</template>

<style scoped>
.home {
  background-image: url('@/assets/images/home/background-home-desktop.jpg');
}
@media (max-width: 1200px) {
  .home {
    background-image: url('@/assets/images/home/background-home-tablet.jpg');
  }
}
</style>
