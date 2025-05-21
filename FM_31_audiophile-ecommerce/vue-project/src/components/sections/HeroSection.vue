<script setup></script>

<template>
  <section class="section hero">
    <div class="container hero__container">
      <div class="hero__wrapper">
        <div class="hero__info-block">
          <span class="hero__new">New product</span>
          <h1 class="title hero__title">XX99 Mark II Headphones</h1>
          <p class="hero__description">
            Experience natural, lifelike audio and exceptional build quality made for the passionate
            music enthusiast.
          </p>
          <Button class="btn" label="See product" />
        </div>
        <img
          class="hero__image"
          src="/assets/images/hero-section/desktop/image-hero.jpg"
          alt="XX99 Mark II Headphones"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.hero {
  padding-bottom: 24px;
  color: var(--white);
  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__wrapper {
    display: flex;
    position: relative;
    width: 100%;
  }
  &__info-block {
    display: flex;
    position: relative;
    width: 100%;
    max-width: 400px;
    padding-top: 132px;
    padding-bottom: 132px;
    gap: 29px;
    flex-direction: column;
  }
  &__new {
    font-size: 0.875rem;
    color: var(--white50);
    text-transform: uppercase;
    letter-spacing: 0.7rem;
  }
  &__title {
  }
  &__description {
    max-width: 350px;
    margin-bottom: 12px;
    color: var(--white75);
    line-height: 1.563rem;
  }
  &__image {
    position: absolute;
    width: 710px;
    height: 729px;
    top: -96px;
    right: -46px;
    z-index: -1;
  }
}
</style>
