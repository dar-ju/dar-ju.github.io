<script setup></script>

<template>
  <ul class="nav">
    <li class="nav__item"><router-link to="/" class="nav__link">Home</router-link></li>
    <li class="nav__item">
      <router-link to="/headphones" class="nav__link">Headphones</router-link>
    </li>
    <li class="nav__item"><router-link to="/speakers" class="nav__link">Speakers</router-link></li>
    <li class="nav__item">
      <router-link to="/earphones" class="nav__link">Earphones</router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/breakpoints';
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
