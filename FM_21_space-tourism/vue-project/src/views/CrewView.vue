<script setup>
import HeaderSection from '@/components/HeaderSection.vue'
import CrewComponent from '@/components/CrewComponent.vue'
</script>

<template>
  <div class="section crew">
    <HeaderSection />
    <CrewComponent />
  </div>
</template>

<style scoped>
.crew {
  background-image: url('@/assets/images/crew/background-crew-desktop.jpg');
}
</style>
