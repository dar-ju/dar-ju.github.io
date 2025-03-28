<script setup lang="ts">
// @ts-ignore
import CountryList from '../components/CountryList.vue'
import { useCountriesStore } from '../stores/countryStore'
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Country } from '../types'

const countryStore = useCountriesStore()
const route = useRoute()
const showMenu = ref(false)

const selectedRegion = ref('')
const regionInMenu = ref('Filter by Region')

const ONPAGE = 20
const loadedCountries = ref<Country[][]>([])
const page = ref(1)
const isPages = ref(true)

const searchText = ref('')
const searchSendText = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  await countryStore.getCountries()
  const regionId = route.params.id as string
  if (regionId) setRegion(regionId)
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
    setRegion(newId as string)
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
)

const setRegion = (val: string) => {
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
          <button @click="menuToggle()" class="field home__filter-btn" aria-label="Select region">
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
      <CountryList :region="selectedRegion" :country="searchSendText" />
    </div>
  </main>
</template>

<style lang="scss" scope>
.home {
  padding-top: 49px;
  padding-bottom: 49px;
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
}

@media (max-width: 750px) {
  .home {
    &__wrapper {
      margin-bottom: 55px;
      gap: 80px 30px;
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
    &__filter-btn {
      width: 400px;
      margin-bottom: 9px;
      padding: 34px 48px;
      padding-right: 36px;
      gap: 10px;
      span {
        font-size: 1.5rem;
      }
      svg {
        width: 25px;
        height: 25px;
      }
    }
    &__filter-list {
      padding: 34px 47px;
      gap: 20px;
      font-size: 1.5rem;
    }
  }
}

@media (max-width: 568px) {
  .home {
    &__search {
      padding-left: 20px;
    }
    &__search-icon {
      right: 20px;
      left: initial;
    }
    &__filter {
      width: 100%;
    }
    &__filter-btn {
      width: 100%;
    }
  }
}
</style>
