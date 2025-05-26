<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const props = defineProps({
  category: {
    type: Object,
    required: false,
  },
})

const mobileMenuCheck = () => {
  if (cartStore.isMobileMenuOpened) cartStore.isMobileMenuOpened = false
}
</script>

<template>
  <li class="categories__item">
    <router-link
      :to="`/${props.category.slug}`"
      @click="mobileMenuCheck()"
      class="categories__block"
      :aria-label="`go to ${props.category.name} category page`"
    >
      <span class="categories__title">{{ props.category.name }}</span>
      <span class="categories__shop">Shop</span>
      <img
        class="categories__image categories__image--headphones"
        :src="props.category.acf.category_preview"
        :alt="`preview image for ${props.category.name}`"
        width="205"
        height="205"
      />
    </router-link>
  </li>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
.categories {
  &__item {
    width: calc((100% - var(--catBlocksGap) * (var(--catBlocksInRow) - 1)) / var(--catBlocksInRow));
  }
  &__block {
    display: flex;
    position: relative;
    height: 100%;
    min-height: 204px;
    padding: 33px;
    padding-top: 90px;
    gap: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    background-color: var(--grey);
    border-radius: 8px;
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
    &:focus-visible .categories__shop {
      outline: 1px solid var(--black);
      outline-offset: 6px;
    }
  }
  &__image {
    position: absolute;
    width: 205px;
    height: 205px;
    top: -67px;
    object-fit: cover;
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
      min-height: 174px;
      padding: 22px;
      padding-top: 75px;
    }
    &__image {
      width: 140px;
      height: 151px;
      top: -55px;
    }
    &__title {
      font-size: 0.95rem;
    }
  }

  @include media-query-md {
    &__item {
      width: 100%;
    }
  }

  @include media-query-sm {
    &__list {
      gap: 69px var(--catBlocksGap);
    }
    &__image {
      top: -50px;
    }
    &__block {
      min-height: 165px;
    }
  }
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
