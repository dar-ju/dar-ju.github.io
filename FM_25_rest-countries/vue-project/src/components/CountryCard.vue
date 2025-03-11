<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { useCountriesStore } from '../stores/countryStore.ts'

const countryStore = useCountriesStore()
const isLoading = ref(true)

const props = defineProps({
  region: {
    type: String,
    required: false,
  },
  country: {
    type: Object,
    required: false,
  },
})

const countryFormat = (val: String) => {
  return val.toLowerCase().replace(/\s+/g, '-')
}
</script>

<template>
  <li class="country-card">
    <router-link
      @click="region ? countryStore.setCurrentRegion(region.toLowerCase()) : null"
      :to="`/${country?.region.toLowerCase()}/${countryFormat(country?.name)}`"
      class="country-card__wrapper"
    >
      <div class="country-card__image-wrapper" :class="{ loading: isLoading }">
        <img
          :class="{ 'country-card__image-loaded': !isLoading }"
          class="country-card__image"
          :src="country?.flags.svg"
          :alt="`Flag of ${country?.name}`"
          @load="isLoading = false"
          @error="isLoading = false"
          width="263"
          height="158"
        />
      </div>
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
    </router-link>
  </li>
</template>

<style lang="scss" scope>
.country-card {
  width: calc(100% / var(--columns) - (var(--gap) * (var(--columns) - 1)) / var(--columns));
  box-shadow: 0 0 10px -2px var(--veryLightGray-veryDarkBlue);
  transition: box-shadow ease-in-out 0.3s, outline ease-in-out 0.15s;
  &:hover {
    box-shadow: 0 0 20px 0px var(--veryLightGray-veryDarkBlue);
  }
  &:focus-within {
    outline: 2px solid var(--dark-gray);
    outline-offset: 1px;
  }
  &__wrapper {
  }
  &__image-wrapper {
    position: relative;
    width: 100%;
    height: 158px;
  }
  &__image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 0px 2px 10px -5px var(--veryLightGray-veryDarkBlue);
    opacity: 0;
    transition: opacity ease-in-out 0.3s, box-shadow ease-in-out 0.3s;
  }
  &__image-loaded {
    opacity: 1;
  }
  &__block {
    padding: 28px 23px;
    padding-bottom: 46px;
    background-color: var(--white-darkBlue);
    transition: background-color ease-in-out 0.3s;
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

@media (max-width: 960px) {
  .country-card {
    &__image-wrapper {
      height: 200px;
    }
  }
}

@media (max-width: 750px) {
  .country-card {
    border-radius: 15px;
    &__image-wrapper {
      height: 320px;
    }
    &__block {
      padding: 55px 48px;
      padding-bottom: 91px;
    }
    &__title {
      margin-bottom: 39px;
      font-size: 2.2rem;
    }
    &__prop-wrap {
      gap: 16px;
    }
    &__prop {
      font-size: 1.7rem;
    }
  }
}
</style>
