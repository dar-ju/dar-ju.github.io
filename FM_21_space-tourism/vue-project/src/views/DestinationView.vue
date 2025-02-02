<script setup>
import HeaderSection from '@/components/HeaderSection.vue'
import DestinationComponent from '@/components/DestinationComponent.vue'
</script>

<template>
  <div class="section destination">
    <HeaderSection />
    <DestinationComponent />
  </div>
</template>

<style scoped>
.destination {
  background-image: url('@/assets/images/destination/background-destination-desktop.jpg');
}
</style>
