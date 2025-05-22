<script setup>
import router from '@/router'
</script>

<template>
  <section class="products">
    <div class="container products__container">
      <ul class="products__list">
        <li class="products__ZX9">
          <img
            class="products__ZX9-image"
            src="/assets/images/home-products-section/desktop/image-speaker-zx9.png"
            alt="ZX9 speaker"
          />
          <div class="products__ZX9-wrapper">
            <h2 class="title products__ZX9-title">ZX9 speaker</h2>
            <p class="products__ZX9-descr">
              Upgrade to premium speakers that are phenomenally built to deliver truly remarkable
              sound.
            </p>
            <Button
              @click="router.push('/speakers/zx9-speaker')"
              class="btn"
              label="See product"
              severity="secondary"
              aria-role="link"
            />
          </div>
        </li>
        <li class="products__ZX7">
          <div class="products__ZX7-wrapper">
            <h2 class="title products__ZX7-title">ZX7 speaker</h2>
            <Button
              @click="router.push('/speakers/zx7-speaker')"
              class="btn"
              label="See product"
              severity="contrast"
              aria-role="link"
            />
          </div>
        </li>
        <li class="products__YX1">
          <!-- <div class="products__YX1-wrapper"> -->
          <img
            class="products__YX1-img"
            src="/assets/images/home-products-section/desktop/image-earphones-yx1.jpg"
            alt="YX1 earphones"
          />
          <div class="products__YX1-block">
            <h2 class="title products__YX1-title">YX1 earphones</h2>
            <Button
              @click="router.push('/earphones/yx1-wireless-earphones')"
              class="btn"
              label="See product"
              severity="contrast"
              aria-role="link"
            />
          </div>
          <!-- </div> -->
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.products {
  padding-top: 84px;
  padding-bottom: 100px;
  &__container {
  }
  &__list {
    display: flex;
    gap: 48px;
    flex-direction: column;
  }
  // &__item {
  //   // grid-column: 2;
  // }
  &__ZX9 {
    display: flex;
    width: 100%;
    padding-left: clamp(12.5%, 6rem, 139px);
    padding-right: 95px;
    gap: 60px;
    justify-content: space-between;
    background-color: var(--orange);
    border-radius: 8px;
    overflow-y: hidden;
  }
  &__ZX9-image {
    max-width: 378px;
    margin-bottom: -10px;
    object-fit: contain;
    align-self: flex-end;
    // position: absolute;
  }
  &__ZX9-wrapper {
    display: flex;
    min-width: 260px;
    max-width: 350px;
    padding-top: 132px;
    padding-bottom: 125px;
    gap: 24px;
    flex-direction: column;
  }
  &__ZX9-title {
    color: var(--white);
    font-size: 3.733rem;
    line-height: 3.867rem;
    letter-spacing: 0.133rem;
  }
  &__ZX9-descr {
    margin-bottom: 16px;
    color: var(--white75);
    line-height: 1.667rem;
  }
  &__ZX7 {
    display: flex;
    height: 320px;
    align-items: center;
    background: url('/assets/images/home-products-section/desktop/image-speaker-zx7.jpg') no-repeat
      100%;
    border-radius: 8px;
  }
  &__ZX7-wrapper {
    display: flex;
    flex-direction: column;
    padding: 0 95px;
    gap: 20px;
  }
  &__ZX7-title {
    font-size: 1.867rem;
    letter-spacing: 0.133rem;
  }
  &__ZX7-image {
  }
  &__YX1 {
    display: flex;
    gap: 30px;
  }
  // &__YX1-wrapper {
  // }
  &__YX1-img {
    border-radius: 8px;
  }
  &__YX1-block {
    display: flex;
    width: 100%;
    gap: 20px;
    padding: 0 94px;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    background-color: var(--grey);
  }
  &__YX1-title {
    font-size: 1.867rem;
    letter-spacing: 0.133rem;
  }
}

// @media (hover: hover) {
//   .products {
//     &__secondary-btn {
//       &:hover {
//         color: var(--white);
//         background-color: var(--grey-dark);
//       }
//     }
//   }
// }
</style>
