<script setup>
import { useDataStore } from '@/stores/store'

const dataStore = useDataStore()
dataStore.getData()
console.log(dataStore.data)

// import { ref } from 'vue'

// const planet = ref({})
// const toggleNav = (value) => {
//   planet.value.image =
// }
</script>

<template>
  <div class="destination__wrapper">
    <div class="container destination__container">
      <h1 class="text-1 destination__title">
        <span class="destination__title-number">01</span>Pick your destination
      </h1>
      <div class="destination__block">
        <img class="destination__image" src="@/assets/images/destination/image-moon.webp" alt="" />
        <div class="destination__text-block">
          <nav class="destination__nav">
            <ul class="destination__nav-list">
              <li class="text-3 nav-item destination__nav-item destination__nav-item_active">
                <a class="link" href="#">Moon</a>
              </li>
              <li class="text-3 nav-item destination__nav-item">
                <a class="link" href="#">Mars</a>
              </li>
              <li class="text-3 nav-item destination__nav-item">
                <a class="link" href="#">Europa</a>
              </li>
              <li class="text-3 nav-item destination__nav-item">
                <a class="link" href="#">Titan</a>
              </li>
            </ul>
          </nav>
          <h2 class="title title-2 destination__sutitle">Moon</h2>
          <p class="paragraph-1 destination__description">
            See our planet as you’ve never seen it before. A perfect relaxing trip away to help
            regain perspective and come back refreshed. While you’re there, take in some history by
            visiting the Luna 2 and Apollo 11 landing sites.
          </p>
          <div class="destination__data">
            <div class="destination__data-block">
              <span class="text-2 destination__distance-title">Avg. distance</span>
              <span class="title title-5 destination__distance-value">384,400 km</span>
            </div>
            <div class="destination__data-block">
              <span class="text-2 destination__time-title">Est. travel time</span>
              <span class="title title-5 destination__time-value">3 days</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <a class="title title-4 destination__btn" href="#">Explore</a> -->
    </div>
  </div>
</template>

<style scoped>
.destination__wrapper {
  padding-top: 60px;
  padding-bottom: 48px;
}

.destination__container {
  /* display: flex; */
  padding-right: 165px;
  padding-left: 165px;
  /* align-items: center;
  justify-content: space-between; */
}

.destination__title {
  margin-bottom: 24px;
  font-weight: 400;
  color: var(--color-white);
}

.destination__title-number {
  margin-right: 22px;
  font-weight: 600;
  color: var(--color-white25);
}
.destination__block {
  display: flex;
  padding: 140px 30px;
  gap: 30px;
  justify-content: space-between;
}
.destination__image {
  width: 480px;
}
.destination__text-block {
  max-width: 462px;
  padding: 12px 0;
}
.destination__nav {
  margin-bottom: 60px;
}
.destination__nav-list {
  display: flex;
  gap: 32px;
}
.destination__nav-item::after {
  bottom: -23px;
}
.destination__nav-item_active::after {
  opacity: 1;
  background-color: var(--color-white);
}
.destination__sutitle {
  margin-bottom: 20px;
}
.destination__description {
  margin-bottom: 47px;
  padding-bottom: 42px;
  border-bottom: 1px solid var(--gray25);
}
.destination__data {
  display: flex;
  justify-content: space-between;
}
.destination__data-block {
  display: flex;
  width: 227px;
  gap: 31px;
  flex-direction: column;
}
.destination__distance-title {
}
.destination__distance-value {
}
.destination__time-block {
}
.destination__time-title {
}
.destination__time-value {
}
</style>
