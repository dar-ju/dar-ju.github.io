<script setup></script>

<template>
  <section class="invite">
    <div class="container invite__container">
      <div class="invite__wrapper">
        <h2 class="title invite__title">Bringing you the <span>best</span> audio gear</h2>
        <p class="invite__description">
          Located at the heart of New York City, Audiophile is the premier store for high end
          headphones, earphones, speakers, and audio accessories. We have a large showroom and
          luxury demonstration rooms available for you to browse and experience a wide range of our
          products. Stop by our store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <picture class="invite__img">
        <source
          media="(min-width:1024px)"
          srcset="/assets/images/invite-section/desktop/image-best-gear.jpg"
        />
        <source
          media="(min-width:768px)"
          srcset="/assets/images/invite-section/tablet/image-best-gear.jpg"
        />
        <img
          src="/assets/images/invite-section/mobile/image-best-gear.jpg"
          alt="customer in the audiophile store"
        />
      </picture>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/breakpoints';
.invite {
  padding-top: 100px;
  padding-bottom: 160px;
  &__container {
    display: flex;
    gap: 50px;
    align-items: center;
    justify-content: space-between;
  }
  &__wrapper {
    max-width: 440px;
  }
  &__title {
    margin-bottom: 30px;
    font-size: 2.667rem;
    line-height: 2.933rem;
    letter-spacing: 0.1rem;
    & span {
      color: var(--orange);
    }
  }
  &__description {
    color: var(--black50);
    line-height: 1.667rem;
  }
  &__img {
    max-width: 540px;
    min-width: 350px;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
  }

  //MEDIA QUERIES
  @include media-query-l {
    padding-top: 60px;
    padding-bottom: 60px;
    &__container {
      gap: 60px;
      flex-direction: column;
      text-align: center;
    }
    &__img {
      width: 100%;
      max-width: initial;
    }
    &__wrapper {
      max-width: 573px;
      order: 1;
    }
  }

  @include media-query-sm {
    padding-bottom: 82px;
    &__container {
      gap: 41px;
    }
    &__img {
      min-width: initial;
    }
    &__title {
      font-size: 1.8rem;
      line-height: 2.5rem;
    }
  }
}
</style>
