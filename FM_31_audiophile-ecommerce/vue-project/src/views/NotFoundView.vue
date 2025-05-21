<script setup></script>

<template>
  <section class="notfound">
    <div class="container notfound__container">
      <h1 class="nofound__title">404 - Page Not Found</h1>
      <p class="notfound__descr">
        We're sorry, the page you're looking for doesn't exist or has been moved.
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.notfound {
  padding-top: 80px;
  padding-bottom: 80px;
  &__container {
    text-align: center;
    color: var(--white);
  }
  &__title {
    margin-bottom: 50px;
    font-size: 3rem;
  }
  &__descr {
    margin-bottom: 20px;
    font-size: 1.5rem;
  }
}
</style>
