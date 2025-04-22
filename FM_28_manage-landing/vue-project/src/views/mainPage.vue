<script setup>
import Header from '../components/headerComponent.vue'
import Hero from '../components/heroComponent.vue'
import About from '../components/aboutComponent.vue'
</script>

<template>
  <div>
    <Header />
    <main class="main">
      <Hero />
      <About />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main {
  background-image: url('/assets/images/bg-tablet-pattern.svg');
  background-repeat: no-repeat;
  background-position: bottom left;
}
</style>
