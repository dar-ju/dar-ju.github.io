<script setup>
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
</script>

<template>
  <ul class="nav">
    <li class="nav__item"><router-link to="/" class="nav__link">Home</router-link></li>
    <li v-for="item in categoryStore.categories" :key="item.key" class="nav__item">
      <router-link :to="`/${item?.slug}`" class="nav__link">{{ item?.name }}</router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
.nav {
  display: flex;
  gap: 20px 38px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  &__item {
    font-size: 0.813rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--white);
  }
  &__link {
    transition:
      outline ease-in-out 0.3s,
      color ease-in-out 0.3s;
    &:focus-visible {
      outline: 1px solid var(--white);
      outline-offset: 6px;
    }
  }

  //MEDIA QUERIES
  @include media-query-sm {
    &__menu {
      flex-direction: column;
    }
  }
}

@media (hover: hover) {
  .nav {
    &__link {
      &:hover {
        color: var(--orange);
      }
    }
  }
}
</style>
