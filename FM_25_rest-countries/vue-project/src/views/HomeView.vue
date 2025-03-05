<script setup>
import CountryList from '../components/CountryList.vue'
import CountryCard from '../components/CountryCard.vue'
import { useCountriesStore } from '../stores/countryStore.ts'
import { onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const countryStore = useCountriesStore()
const route = useRoute()
const showMenu = ref(false)

const selectedRegion = ref('')
const regionInMenu = ref('Filter by Region')

const ONPAGE = 20
const loadedCountries = ref([])
const page = ref(1)
const isPages = ref(true)

const searchText = ref('')
const searchSendText = ref('')
const searchInput = (ref < HTMLInputElement) | (null > null)

onMounted(async () => {
  await countryStore.getCountries()
  if (route.params.id) setRegion(route.params.id)
  loadMore()
})

const loadMore = () => {
  const firstElement = page.value * ONPAGE - ONPAGE
  loadedCountries.value[0] = countryStore.countries.slice(0, firstElement + ONPAGE)
  page.value++
  if (page.value * ONPAGE >= countryStore.countries.length) isPages.value = false
}

const menuToggle = () => {
  showMenu.value = !showMenu.value
}

const selectRegion = (value) => {
  selectedRegion.value = value
  menuToggle()
}

watch(
  () => route.params.id,
  (newId) => {
    setRegion(newId)
  },
  () => {
    nextTick(() => {
      searchInput.value?.focus()
    })
  },
)

const setRegion = (val) => {
  if (val) {
    selectedRegion.value = val[0].toUpperCase() + val.slice(1)
    val === 'americas'
      ? (regionInMenu.value = 'America')
      : (regionInMenu.value = selectedRegion.value)
  } else regionInMenu.value = 'All regions'
}

let debounceTimeout
watch(searchText, (newValue) => {
  if (newValue.length > 2) {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      searchSendText.value = newValue
    }, 1000)
  } else searchSendText.value = ''
})
</script>

<template>
  <main class="section home">
    <div class="container home__container">
      <div class="home__wrapper">
        <div class="home__search-wrapper">
          <input
            v-model="searchText"
            type="text"
            id="search"
            class="field home__search"
            placeholder="Search for a country..."
          />
          <svg
            class="home__search-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M 10 2 C 5.5935644 2 2 5.5935677 2 10 C 2 14.406432 5.5935644 18 10 18 C 11.844022 18 13.540969 17.365427 14.896484 16.310547 L 20.292969 21.707031 A 1.0001 1.0001 0 1 0 21.707031 20.292969 L 16.310547 14.896484 C 17.365427 13.540969 18 11.844021 18 10 C 18 5.5935677 14.406436 2 10 2 z M 10 4 C 13.325556 4 16 6.674446 16 10 C 16 13.325554 13.325556 16 10 16 C 6.6744439 16 4 13.325554 4 10 C 4 6.674446 6.6744439 4 10 4 z"
            ></path>
          </svg>
        </div>
        <div class="home__filter">
          <button @click="menuToggle()" class="field home__filter-btn">
            <span>{{ regionInMenu }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <Transition name="appear">
            <ul v-show="showMenu" class="field home__filter-list">
              <li class="home__filter-item">
                <router-link to="/africa" @click="selectRegion('Africa')">Africa</router-link>
              </li>
              <li class="home__filter-item">
                <router-link to="/americas" @click="selectRegion('Americas')">America</router-link>
              </li>
              <li class="home__filter-item">
                <router-link to="/asia" @click="selectRegion('Asia')">Asia</router-link>
              </li>
              <li class="home__filter-item">
                <router-link to="/europe" @click="selectRegion('Europe')">Europe</router-link>
              </li>
              <li class="home__filter-item">
                <router-link to="/oceania" @click="selectRegion('Oceania')">Oceania</router-link>
              </li>
              <li class="home__filter-item">
                <router-link to="/" @click="selectRegion('')">All regions</router-link>
              </li>
            </ul>
          </Transition>
        </div>
      </div>
      <!-- <ul class="home__country-list">
        <CountryCard
          v-for="country in loadedCountries[0]"
          :key="country.numericCode"
          :country="country"
        />
      </ul>
      <button @click="loadMore()" v-show="isPages" class="field home__more-btn">Load More</button> -->
      <CountryList :region="selectedRegion" :country="searchSendText" />
    </div>
  </main>
</template>

<style lang="scss" scope>
.home {
  padding-top: 49px;
  padding-bottom: 49px;
  // background-color: var(--white-veryDarkBlue);
  &__container {
  }
  &__wrapper {
    display: flex;
    position: relative;
    margin-bottom: 42px;
    gap: 30px;
    justify-content: space-between;
  }
  &__search-wrapper {
    width: 478px;
  }
  &__search {
    width: 100%;
    padding: 10px;
    padding-left: 72px;
    &::placeholder {
      font-size: 0.88rem;
      font-weight: 300;
      color: var(--dark-gray);
      transition: color ease-in-out 0.3s;
    }
    &:focus-visible {
      box-shadow: 0 0 20px 0px var(--veryLightGray-veryDarkBlue);
    }
  }
  &__search-icon {
    position: absolute;
    top: 15px;
    left: 29px;
    fill: var(--dark-gray);
  }
  &__filter {
    position: relative;
  }
  &__filter-btn {
    display: flex;
    min-width: 195px;
    margin-bottom: 6px;
    padding: 20px;
    padding-right: 15px;
    justify-content: space-between;
    text-align: left;
    font-size: 0.85rem;
    color: var(--darkBlue-white);
    // transition: background-color ease-in-out 0.3s, color ease-in-out 0.3s;
    svg {
      stroke: var(--darkBlue-white);
    }
  }
  &__filter-list {
    display: flex;
    position: absolute;
    width: 100%;
    padding: 17px 20px;
    gap: 12px;
    flex-direction: column;
    font-size: 0.85rem;
    font-weight: 600;
    z-index: 2;
  }
  // &__country-list {
  //   display: flex;
  //   margin-bottom: 75px;
  //   gap: 75px;
  //   flex-wrap: wrap;
  // }
  // &__more-btn {
  //   display: block;
  //   width: 180px;
  //   margin: 0 auto;
  //   padding: 20px;
  //   font-weight: 600;
  // }
}

@media (max-width: 750px) {
  .home {
    &__wrapper {
      flex-wrap: wrap;
    }
    &__search-wrapper {
      width: 100%;
    }
    &__search {
      min-height: 95px;
      padding-left: 149px;
      font-size: 1.5rem;
      &::placeholder {
        font-size: 1.5rem;
      }
    }
    &__search-icon {
      width: 34px;
      height: 34px;
      top: 29px;
      left: 62px;
    }
  }
}
</style>
