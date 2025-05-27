<script setup>
import router from '@/router'
</script>

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
          <Button
            @click="router.push('/headphones/xx99-mark-ii-headphones')"
            class="btn"
            label="See product"
            role="link"
          />
        </div>
        <picture class="hero__image">
          <source
            media="(min-width:1025px)"
            srcset="/assets/images/hero-section/desktop/image-hero.jpg"
          />
          <source
            media="(min-width:768px)"
            srcset="/assets/images/hero-section/tablet/image-hero.jpg"
          />
          <img
            src="/assets/images/hero-section/mobile/image-hero.jpg"
            alt="XX99 Mark II Headphones"
            width="704"
            height="729"
          />
        </picture>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use '@/assets/styles/breakpoints' as *;
.hero {
  padding-bottom: 21px;
  color: var(--white);
  &__container {
    display: flex;
    max-width: 1440px;
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
    padding-top: 129px;
    padding-bottom: 135px;
    gap: 29px;
    flex-direction: column;
  }
  &__new {
    font-size: 0.875rem;
    color: var(--white50);
    text-transform: uppercase;
    letter-spacing: 0.7rem;
  }
  &__description {
    max-width: 350px;
    margin-bottom: 12px;
    color: var(--white75);
    line-height: 1.563rem;
  }
  &__image {
    display: flex;
    position: absolute;
    width: clamp(20%, 48rem, 64%);
    height: 729px;
    top: -96px;
    right: -46px;
    z-index: -1;
    align-items: center;
    object-fit: cover;
  }

  // MEDIA QUERY
  @include media-query-lg {
    padding-bottom: 31px;
    &__wrapper {
      justify-content: center;
      text-align: center;
    }
    &__info-block {
      align-items: center;
    }
    &__image {
      width: 100%;
      right: 50%;
      transform: translateX(50%);
      justify-content: center;
    }
  }

  @include media-query-l {
    &__info-block {
      padding-top: 119px;
      gap: 31px;
    }
    &__image {
      max-width: 843px;
    }
  }

  @include media-query-md {
    &__image {
      max-width: 513px;
    }
  }

  @include media-query-sm {
    padding-bottom: 33px;
    &__wrapper {
      position: initial;
    }
    &__info-block {
      padding-top: 103px;
      padding-bottom: 80px;
      gap: 21px;
    }
    &__title {
      font-size: 2.15rem;
      line-height: 2.7rem;
      letter-spacing: 0.23rem;
    }
    &__image {
      max-width: 410px;
      top: -65px;
      right: initial;
      transform: initial;
    }
  }
}
</style>
