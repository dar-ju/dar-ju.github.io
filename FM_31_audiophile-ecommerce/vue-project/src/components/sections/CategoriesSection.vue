<script setup></script>

<template>
  <section class="section categories">
    <div class="container categories__container">
      <ul class="categories__list">
        <li class="categories__item">
          <router-link to="/headphones" class="categories__block">
            <span class="categories__title">Headphones</span>
            <span class="categories__shop">Shop</span>
            <img
              class="categories__image categories__image--headphones"
              src="/assets/images/category-section/image-category-thumbnail-headphones.png"
              alt="XX99 Mark I Headphones"
            />
          </router-link>
        </li>
        <li class="categories__item">
          <router-link to="/speakers" class="categories__block">
            <span class="categories__title">Speakers</span>
            <span class="categories__shop">Shop</span>
            <img
              class="categories__image categories__image--speakers"
              src="/assets/images/category-section/image-category-thumbnail-speakers.png"
              alt="ZX9 SPEAKER"
            />
          </router-link>
        </li>
        <li class="categories__item">
          <router-link to="/earphones" class="categories__block">
            <span class="categories__title">Earphones</span>
            <span class="categories__shop">Shop</span>
            <img
              class="categories__image categories__image--earphones"
              src="/assets/images/category-section/image-category-thumbnail-earphones.png"
              alt="YX1 WIRELESS EARPHONES"
            />
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/breakpoints';
.categories {
  padding-top: 160px;
  padding-bottom: 60px;
  &__container {
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 80px var(--catBlocksGap);
  }
  &__item {
    width: calc((100% - var(--catBlocksGap) * (var(--catBlocksInRow) - 1)) / var(--catBlocksInRow));
  }
  &__block {
    display: flex;
    position: relative;
    min-height: 204px;
    padding: 33px;
    gap: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    background-color: var(--grey);
    border-radius: 8px;
    text-transform: uppercase;
    font-weight: 700;
  }
  &__image {
    position: absolute;
    width: 217px;
    height: 203px;
    top: -61px;
    object-fit: cover;
    &--headphones {
      width: 222px;
      height: 212px;
      top: -81px;
    }
    &--speakers {
      top: -74px;
    }
    &--earphones {
      width: 220px;
      height: 194px;
    }
  }
  &__title {
    font-size: 1.2rem;

    letter-spacing: 0.1rem;
  }
  &__shop {
    display: flex;
    gap: 13px;
    align-items: center;
    font-size: 0.867rem;
    color: var(--black50);
    transition: outline ease-in-out 0.3s;
    &::after {
      content: '';
      width: 7px;
      height: 12px;
      background-image: url('/assets/images/category-section/category-arrow.svg');
    }
    &:focus-visible {
      outline: 1px solid var(--black50);
      outline-offset: 6px;
    }
  }

  //MEDIA QUERIES
  @include media-query-l {
    padding-top: 100px;
    &__block {
      min-height: 165px;
      padding: 22px;
    }
    &__image {
      width: 140px;
      &--headphones {
        height: 137px;
        top: -51px;
      }
      &--speakers {
        height: 141px;
        top: -52px;
      }
      &--earphones {
        height: 157px;
        top: -53px;
      }
    }
    &__title {
      font-size: 0.95rem;
    }
  }

  @include media-query-md {
    &__list {
      flex-direction: column;
      align-items: center;
    }
    &__item {
      width: 100%;
    }
  }

  @include media-query-sm {
    padding-top: 52px;
    &__list {
      gap: 69px var(--catBlocksGap);
    }
  }
  // @include media-query-l {
  //   &__image {
  // width: 191px;
  // top: -70px;
  // }
  // }
}

@media (hover: hover) {
  .categories {
    &__shop {
      transition: color ease-in-out 0.3s;
    }
    &__block {
      &:hover .categories__shop {
        color: var(--orange);
      }
    }
  }
}
</style>
