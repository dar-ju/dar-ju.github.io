<script setup>
import router from '@/router'
</script>

<template>
  <section class="products">
    <div class="container products__container">
      <ul class="products__list">
        <li class="products__ZX9">
          <div class="products__ZX9-block">
            <picture class="products__ZX9-image">
              <source
                media="(min-width:1024px)"
                srcset="/assets/images/home-products-section/desktop/image-speaker-zx9.png"
              />
              <source
                media="(min-width:768px)"
                srcset="/assets/images/home-products-section/tablet/image-speaker-zx9.png"
              />
              <img
                src="/assets/images/home-products-section/mobile/image-speaker-zx9.png"
                alt="ZX9 speaker"
                width="378"
                height="459"
              />
            </picture>
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
                role="link"
                aria-label="go to ZX9 speaker page"
              />
            </div>
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
              role="link"
              aria-label="go to ZX7 speaker page"
            />
          </div>
        </li>
        <li class="products__YX1">
          <picture class="products__YX1-img">
            <source
              media="(min-width:1024px)"
              srcset="/assets/images/home-products-section/desktop/image-earphones-yx1.jpg"
            />
            <source
              media="(min-width:768px)"
              srcset="/assets/images/home-products-section/tablet/image-earphones-yx1.jpg"
            />
            <img
              src="/assets/images/home-products-section/mobile/image-earphones-yx1.jpg"
              alt="YX1 earphones"
              width="540"
              height="320"
            />
          </picture>
          <div class="products__YX1-block">
            <h2 class="title products__YX1-title">YX1 earphones</h2>
            <Button
              @click="router.push('/earphones/yx1-wireless-earphones')"
              class="btn"
              label="See product"
              severity="contrast"
              role="link"
              aria-label="go to YX1 earphones page"
            />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
.products {
  padding-top: 109px;
  padding-bottom: 100px;
  &__container {
    max-width: 1600px;
  }
  &__list {
    display: flex;
    gap: 47px;
    flex-direction: column;
  }
  &__ZX9 {
    background-color: var(--orange);
    border-radius: 8px;
    background-image: url('/assets/images/home-products-section/desktop/pattern-circles.svg');
    background-repeat: no-repeat;
    overflow: hidden;
  }
  &__ZX9-block {
    display: flex;
    width: 100%;
    min-height: 562px;
    padding-left: clamp(12.5%, 6rem, 139px);
    padding-right: 95px;
    gap: 60px;
    justify-content: space-between;
  }
  &__ZX9-image {
    max-width: 378px;
    min-width: 240px;
    margin-bottom: -10px;
    object-fit: contain;
    align-self: flex-end;
  }
  &__ZX9-wrapper {
    display: flex;
    min-width: 260px;
    max-width: 350px;
    padding-top: 40px;
    padding-bottom: 40px;
    gap: 24px;
    flex-direction: column;
    align-self: center;
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
    background-position: center;
    background-size: cover;
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
  &__YX1 {
    display: flex;
    gap: 30px;
  }
  &__YX1-img {
    width: 100%;
    min-width: 300px;
    max-width: 540px;
    border-radius: 8px;
    overflow: hidden;
    & img {
      height: 100%;
      object-fit: cover;
    }
  }
  &__YX1-block {
    display: flex;
    gap: 20px;
    padding: 40px 94px;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    background-color: var(--grey);
  }
  &__YX1-title {
    font-size: 1.867rem;
    letter-spacing: 0.133rem;
  }

  //MEDIA QUERIES
  @include media-query-lg {
    &__ZX9-block {
      padding-left: 60px;
      padding-right: 60px;
    }
  }

  @include media-query-l {
    padding-top: 44px;
    padding-bottom: 38px;
    &__list {
      gap: 31px;
    }
    &__ZX9 {
      background-image: url('/assets/images/home-products-section/tablet/pattern-circles.svg');
      background-position: top;
    }
    &__ZX9-block {
      padding: 60px;
      padding-bottom: 24px;
      gap: 30px;
      flex-direction: column;
      text-align: center;
    }
    &__ZX9-wrapper {
      align-items: center;
    }
    &__ZX9-image {
      max-width: 184px;
      min-width: 172px;
      margin-bottom: 0;
      align-self: center;
    }
    &__ZX7 {
      background-image: url('/assets/images/home-products-section/tablet/image-speaker-zx7.jpg');
      background-size: cover;
    }
    &__ZX7-wrapper {
      padding: 0 62px;
      gap: 23px;
    }
    &__YX1 {
      gap: 10px;
    }
    &__YX1-block {
      min-width: 338px;
      min-height: 321px;
      padding: 70px 40px;
    }
  }

  @include media-query-md {
    &__ZX7 {
      background-image: url('/assets/images/home-products-section/mobile/image-speaker-zx7.jpg');
    }
    &__YX1-img {
      min-width: 200px;
    }
    &__YX1-block {
      padding: 40px;
    }
  }

  @include media-query-sm {
    padding-top: 71px;
    padding-bottom: 60px;
    &__list {
      gap: 25px;
    }
    &__ZX9 {
      background-image: url('/assets/images/home-products-section/mobile/pattern-circles.svg');
    }
    &__ZX9-wrapper {
      padding-top: 10px;
      padding-bottom: 30px;
    }
    &__ZX9-image {
      max-width: 160px;
      min-width: 147px;
    }
    &__ZX9-title {
      font-size: 2.42rem;
      line-height: 2.7rem;
    }
    &__ZX9-descr {
      margin-bottom: 0px;
    }
    &__ZX7-wrapper {
      padding: 0 24px;
    }
    &__YX1 {
      gap: 22px;
      flex-direction: column;
    }
    &__YX1-block {
      min-width: 327px;
      min-height: 200px;
      padding: 33px 25px;
      justify-content: flex-start;
    }
  }
}
</style>
