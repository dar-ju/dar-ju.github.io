<script setup>
import HeaderSection from '@/components/HeaderSection.vue'
import TechnologyComponent from '@/components/TechnologyComponent.vue'
</script>

<template>
  <div class="section technology">
    <HeaderSection />
    <TechnologyComponent />
  </div>
</template>

<style scoped>
.technology {
  background-image: url('@/assets/images/technology/background-technology-desktop.jpg');
}

@media (max-width: 1200px) {
  .technology {
    background-image: url('@/assets/images/technology/background-technology-tablet.jpg');
  }
}
</style>
