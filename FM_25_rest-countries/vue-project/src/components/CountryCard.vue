<script setup lang="ts">
import { defineProps } from 'vue'
import { useCountriesStore } from '../stores/countryStore'

const countryStore = useCountriesStore()

const props = defineProps({
  country: {
    type: Object,
    required: false,
  },
})
</script>

<template>
  <li class="country-card">
    <a class="country-card__wrapper" href="#">
      <img
        class="country-card__image"
        :src="country?.flags.svg"
        :alt="`Flag of ${country?.name}`"
      />
      <div class="country-card__block">
        <h2 class="country-card__title">{{ country?.name }}</h2>
        <p class="country-card__description"></p>
        <p class="country-card__description"></p>
        <p class="country-card__description"></p>
      </div>
    </a>
  </li>
</template>

<style lang="scss" scope>
.country-card {
  max-width: 263px;
  &__wrapper {
  }
  &__image {
  }
  &__block {
  }
  &__title {
  }
  &__description {
  }
}
</style>
