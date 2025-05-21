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
      <img
        class="invite__img"
        src="/assets/images/invite-section/desktop/image-best-gear.jpg"
        alt="customer in the audiophile store"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.invite {
  padding-top: 100px;
  padding-bottom: 160px;
  &__container {
    display: flex;
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
    border-radius: 8px;
  }
}
</style>
