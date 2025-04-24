<script setup>
import Header from '../components/headerBlock.vue'
import Hero from '../components/heroBlock.vue'
import About from '../components/aboutBlock.vue'
import Reviews from '../components/reviewsBlock.vue'
import Action from '../components/actionBlock.vue'
import Footer from '../components/footerBlock.vue'
</script>

<template>
  <div>
    <header>
      <Header />
    </header>
    <main class="main">
      <Hero />
      <About />
      <Reviews />
      <Action />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.main {
  background-image: url('/assets/images/bg-tablet-pattern.svg');
  background-repeat: no-repeat;
  background-position: left -504px bottom 454px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .main {
    background-position: right -189px top 404px;
    background-size: 86%;
  }
}
</style>
