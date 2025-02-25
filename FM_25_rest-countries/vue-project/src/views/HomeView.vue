<script setup lang="ts">
import CountryCard from './components/CountryCard.vue'
</script>

<template>
  <main class="section home">
    <div class="container home__container">
      <div class="home__wrapper">
        <div class="home__search-wrapper">
          <input
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
          <button class="field home__filter-btn">
            <span>Filter by Region</span>
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
          <ul class="field home__filter-list">
            <li class="home__filter-item"><a href="#">Africa</a></li>
            <li class="home__filter-item"><a href="#">America</a></li>
            <li class="home__filter-item"><a href="#">Asia</a></li>
            <li class="home__filter-item"><a href="#">Europe</a></li>
            <li class="home__filter-item"><a href="#">Oceania</a></li>
          </ul>
        </div>
      </div>
      <!-- <h1>home</h1> -->
    </div>
  </main>
</template>

<style lang="scss" scope>
.home {
  padding-top: 49px;
  background-color: var(--very-light-gray-light);
  &__container {
  }
  &__wrapper {
    display: flex;
    position: relative;
    margin-bottom: 40px;
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
    }
  }
  &__search-icon {
    position: absolute;
    top: 15px;
    left: 29px;
    fill: var(--dark-gray-light-light);
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
    font-weight: 600;
  }
  &__filter-list {
    display: flex;
    position: absolute;
    width: 100%;
    padding: 22px 20px;
    gap: 12px;
    flex-direction: column;
    font-size: 0.85rem;
    font-weight: 600;
  }
}
</style>
