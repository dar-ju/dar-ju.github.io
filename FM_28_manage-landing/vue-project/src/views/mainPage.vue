<script setup>
import Header from '../components/headerComponent.vue'
import Hero from '../components/heroComponent.vue'
import About from '../components/aboutComponent.vue'
import Reviews from '../components/reviewsComponent.vue'
import Action from '../components/actionComponent.vue'
import Footer from '../components/footerComponent.vue'
</script>

<template>
  <div>
    <Header />
    <main class="main">
      <Hero />
      <About />
      <Reviews />
      <Action />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.main {
  background-image: url('/assets/images/bg-tablet-pattern.svg');
  background-repeat: no-repeat;
  background-position: left -504px bottom 542px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .main {
    background-position: right -189px top 404px;
    background-size: 86%;
  }
}
</style>
