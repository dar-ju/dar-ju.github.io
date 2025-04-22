<script setup></script>

<template>
  <section class="section hero">
    <div class="container hero__container">
      <div class="hero__wrapper">
        <h1 class="hero__title">Bring everyone together to build better products.</h1>
        <p class="hero__descr">
          Manage makes it simple for software teams to plan day-to-day tasks while keeping the
          larger team goals in view.
        </p>
        <Button class="main-btn" label="Get Started" />
      </div>
      <img
        class="hero__img"
        src="/assets/images/illustration-intro.svg"
        alt="Manage intro illustration"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  &__container {
    display: flex;
    align-items: center;
  }
  &__wrapper {
    display: flex;
    gap: 30px;
    flex-direction: column;
  }
  &__title {
    font-size: 2.85rem;
    color: var(--dark-blue);
  }
  &__descr {
    max-width: 340px;
    font-size: 0.87rem;
    line-height: 1.5rem;
  }
  &__img {
  }
}
</style>
