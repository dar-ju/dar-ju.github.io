<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { useCountriesStore } from '../stores/countryStore.ts'
import type { Country } from '@/types'
import { ref, onMounted } from 'vue'

const countryStore = useCountriesStore()
const countryData = ref<Country | undefined>(undefined)
const isLoading = ref(true)
// countryStore.countries
// val.toLowerCase().replace(/\s+/g, '-')

const route = useRoute()
const region = route.params.region
const country = route.params.country

onMounted(async () => {
  if (countryStore.countries.length === 0) await countryStore.getCountries()
  // const formatedName = (country as string).replace(/-/g, ' ')
  countryData.value = countryStore.countries.find(
    (obj) => obj.name.toLowerCase() === formatUrl(country as string).toLowerCase(),
  )
  console.log(countryStore.currentRegion)
})

onBeforeRouteUpdate(async (to, from, next) => {
  countryData.value = countryStore.countries.find(
    (obj) => obj.name.toLowerCase() === formatUrl(to.params.country as string).toLowerCase(),
  )
  next()
})

// Population number format
const formatValue = (value: number) => {
  if (!value) return ''
  return new Intl.NumberFormat('en-US').format(value)
}

const formatUrl = (value: string) => {
  return value.replace(/-/g, ' ')
}

const listFormat = (arr: Array<string>, name?: string) => {
  // console.log(arr)
  // console.log(Array.isArray(arr))
  if (Array.isArray(arr)) {
    const hasObject =
      Array.isArray(arr) && arr.some((item) => typeof item === 'object' && item !== null)
    // console.log(hasObject)
    if (!hasObject) return arr.join()
    else return arr.map((obj) => obj[name]).join(', ')
  }
}

const countryFormat = (val: String) => {
  return val.toLowerCase().replace(/\s+/g, '-')
}

const borderFormat = (val: String) => {
  return countryStore.countries.find((item) => item.alpha3Code === val).name

  // return val.toLowerCase().replace(/\s+/g, '-')
}
</script>

<template>
  <main class="section country">
    <div class="container country__container">
      <router-link
        :to="`/${countryFormat(countryStore.currentRegion)}`"
        class="field country__back-btn"
      >
        <svg viewBox="0 0 16 9" width="17px" height="11px" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="15.699,3.854 1.914,3.854 5.061,0.707 4.354,0 0,4.354 4.354,8.707 5.061,8 1.914,4.854 15.699,4.854 "
          />
        </svg>
        Back
      </router-link>
      <div class="country__wrapper">
        <picture class="field country__img-wrapper" :class="{ loading: isLoading }">
          <source media="(max-width: 576px)" :srcset="countryData?.flags.png" />
          <img
            class="country__img"
            :class="{ loaded: !isLoading }"
            :src="countryData?.flags.svg"
            :alt="`Flag of ${countryData?.name}`"
            @load="isLoading = false"
            @error="isLoading = false"
            width="562"
            height="400"
          />
        </picture>
        <div class="country__block">
          <h2 class="country__title">{{ countryData?.name }}</h2>
          <div class="country__list-block">
            <ul class="country__list">
              <li class="country__item">
                <span>Native Name: </span> {{ countryData?.nativeName }}
              </li>
              <li class="country__item">
                <span>Population: </span> {{ formatValue(countryData?.population) }}
              </li>
              <li class="country__item"><span>Region: </span> {{ countryData?.region }}</li>
              <li class="country__item"><span>Sub Region: </span> {{ countryData?.subregion }}</li>
              <li class="country__item"><span>Capital: </span> {{ countryData?.capital }}</li>
            </ul>
            <ul class="country__list">
              <li class="country__item">
                <span>Top Level Domain: </span> {{ listFormat(countryData?.topLevelDomain) }}
              </li>
              <li class="country__item">
                <span>Currencies: </span> {{ listFormat(countryData?.currencies, 'name') }}
              </li>
              <li class="country__item">
                <span>Languages: </span> {{ listFormat(countryData?.languages, 'name') }}
              </li>
            </ul>
          </div>
          <div v-if="countryData?.borders" class="country__item country__border-block">
            <span>Border Countries:</span>
            <ul class="country__border-list">
              <li
                v-for="border in countryData?.borders"
                :key="border.index"
                class="field country__border-item"
              >
                <router-link :to="`/${region}/${countryFormat(borderFormat(border))}`">{{
                  borderFormat(border)
                }}</router-link>
              </li>
              <!-- <li class="country__border-item"></li> -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scope>
.country {
  padding-top: 80px;
  padding-bottom: 80px;
  &__back-btn {
    display: flex;
    max-width: 135px;
    min-height: 40px;
    margin-bottom: 80px;
    gap: 7px;
    align-items: center;
    justify-content: center;
  }
  &__wrapper {
    display: flex;
    // gap: clamp(5px, 9vw, 120px);
    gap: 50px;
    justify-content: space-between;
  }
  &__img-wrapper {
    position: relative;
    width: 44%;
    max-height: 400px;
    min-width: 400px;
    // min-width: 560px;
    // height: 402px;
  }
  &__img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__block {
    width: 100%;
    max-width: 600px;
    padding: 44px 0;
  }
  &__title {
    margin-bottom: 32px;
    font-size: 2rem;
  }
  &__list-block {
    display: flex;
    margin-bottom: 68px;
    gap: 20px;
    justify-content: space-between;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  &__item {
    span {
      font-weight: 700;
    }
  }
  &__border-block {
    span {
      display: block;
      min-width: 135px;
    }
    display: flex;
    gap: 18px;
    align-items: center;
  }
  &__border-list {
    display: flex;
    gap: 12px 6px;
    flex-wrap: wrap;
  }
  &__border-item {
    min-width: 100px;
    min-height: 0;
    text-align: center;
    font-size: 0.9rem;
    a {
      display: block;
      padding: 10px;
    }
  }
}
</style>
