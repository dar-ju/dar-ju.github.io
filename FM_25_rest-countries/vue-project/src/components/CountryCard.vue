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
        <ul class="country-card__prop-wrap">
          <li class="country-card__prop">
            <span class="country-card__prop-name">Population:</span>
            {{ country?.population.toLocaleString('en-US') }}
          </li>
          <li class="country-card__prop">
            <span class="country-card__prop-name">Region:</span> {{ country?.region }}
          </li>
          <li class="country-card__prop">
            <span class="country-card__prop-name">Capital:</span> {{ country?.capital }}
          </li>
        </ul>
      </div>
    </a>
  </li>
</template>

<style lang="scss" scope>
.country-card {
  width: 100%;
  max-width: 263px;
  box-shadow: 0 0 10px -2px var(--very-light-gray-shadow);
  &__wrapper {
  }
  &__image {
    position: relative;
    width: 100%;
    height: 158px;
    object-fit: cover;
    object-position: left center;
    box-shadow: 0px 2px 10px -5px var(--very-light-gray-shadow);
    z-index: 1;
  }
  &__block {
    padding: 28px 23px;
    padding-bottom: 46px;
    background-color: var(--white);
  }
  &__title {
    margin-bottom: 18px;
    font-size: 1.14rem;
  }
  &__prop-wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  &__prop {
    font-size: 0.88rem;
  }
  &__prop-name {
    font-weight: 600;
  }
}
</style>
