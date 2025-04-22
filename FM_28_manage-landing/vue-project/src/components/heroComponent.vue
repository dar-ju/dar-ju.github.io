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
      <picture class="hero__img">
        <img src="/assets/images/illustration-intro.svg" alt="Manage intro illustration" />
      </picture>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  padding-top: 53px;
  padding-bottom: 53px;
  &__container {
    display: flex;
    padding-right: 146px;
    gap: 20px;
    justify-content: space-between;
  }
  &__wrapper {
    display: flex;
    max-width: 530px;
    padding: 64px 0;
    flex-direction: column;
  }
  &__title {
    margin-bottom: 28px;
    font-size: 2.85rem;
    line-height: 3.6rem;
    color: var(--dark-blue);
  }
  &__descr {
    margin-bottom: 36px;
    max-width: 340px;
    font-size: 0.87rem;
    line-height: 1.5rem;
  }
  &__img {
    align-self: center;
    min-width: 450px;
  }
}
</style>
