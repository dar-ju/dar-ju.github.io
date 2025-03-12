<script setup lang="ts">
import CountryCard from '../components/CountryCard.vue'
import { useCountriesStore } from '../stores/countryStore'
import { onMounted, ref, watch } from 'vue'

const countryStore = useCountriesStore()
const countryList = ref([])

const props = defineProps({
  region: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
})

const ONPAGE = 20

const loadedCountries = ref([])
const page = ref(1)
const isPages = ref(true)

onMounted(async () => {
  await countryStore.getCountries()
  countryList.value = countryStore.countries
  loadMore()
})

const loadMore = () => {
  const firstElement = page.value * ONPAGE - ONPAGE
  loadedCountries.value[0] = countryList.value.slice(0, firstElement + ONPAGE)
  if (page.value * ONPAGE >= countryList.value.length) isPages.value = false
  page.value++
}

watch(
  () => props.region,
  () => {
    regionFilter()
  }
)
watch(
  () => props.country,
  () => {
    regionFilter()
  }
)

const regionFilter = () => {
  if (props.region) {
    countryList.value = countryStore.countries.filter((obj) => obj.region === props.region)
  } else countryList.value = countryStore.countries
  if (props.country) {
    countryList.value = countryList.value.filter((obj) =>
      obj.name?.toLowerCase().includes(props.country)
    )
  }
  page.value = 1
  if (page.value * ONPAGE < countryList.value.length) isPages.value = true
  loadMore()
}
</script>

<template>
  <div class="countries-block">
    <ul class="countries-block__list">
      <CountryCard
        v-for="country in loadedCountries[0]"
        :key="country.numericCode"
        :country="country"
        :region="region"
      />
    </ul>
    <button @click="loadMore()" v-show="isPages" class="field countries-block__more-btn">
      Load More
    </button>
  </div>
</template>

<style lang="scss" scope>
.countries-block {
  &__list {
    display: flex;
    margin-bottom: 75px;
    gap: var(--gap);
    flex-wrap: wrap;
  }
  &__more-btn {
    display: block;
    width: 180px;
    margin: 0 auto;
    padding: 20px;
    font-weight: 600;
    color: var(--darkBlue-white);
  }
}

@media (max-width: 750px) {
  .countries-block {
    max-width: 525px;
    margin: 0 auto;
  }
}
</style>
