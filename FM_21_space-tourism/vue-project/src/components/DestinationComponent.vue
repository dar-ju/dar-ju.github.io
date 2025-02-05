<script setup>
import { onMounted, ref } from 'vue'
import { data } from '../data/data.js'

const destinations = ref({})
const planet = ref({})
const titleBlock = ref('')
const titleParentBlock = ref('')
destinations.value = data.destinations

onMounted(() => {
  titleParentBlock.value.style.height = `${titleBlock.value.offsetHeight}px`
  // titleParentBlock.value.style.width = `${titleBlock.value.offsetWidth}px`
})

const getImageUrl = (path) => {
  return new URL(path, import.meta.url).href
}

const toggleNav = (value) => {
  const index = destinations.value.findIndex((el) => el.name === value)
  planet.value = destinations.value[index]
  if (titleParentBlock.value)
    titleParentBlock.value.style.height = `${titleBlock.value.offsetHeight}px`
}
toggleNav('Moon')
</script>

<template>
  <div class="destination__wrapper">
    <div class="container destination__container">
      <h1 class="text-1 destination__title">
        <span class="destination__title-number">01</span>Pick your destination
      </h1>
      <div class="destination__block">
        <div class="destination__animation-image-wrapper">
          <Transition name="fade-block" mode="default">
            <div :key="planet.name" class="destination__animation-image-block">
              <img class="destination__image" :src="getImageUrl(planet.images.webp)" alt="" />
            </div>
          </Transition>
        </div>
        <div class="destination__text-block">
          <nav class="destination__nav">
            <ul class="destination__nav-list">
              <li
                class="text-3 nav-item destination__nav-item"
                :class="{ 'destination__nav-item_active': planet.name === 'Moon' }"
              >
                <a @click="toggleNav('Moon')" class="link" href="#">Moon</a>
              </li>
              <li
                class="text-3 nav-item destination__nav-item"
                :class="{ 'destination__nav-item_active': planet.name === 'Mars' }"
              >
                <a @click="toggleNav('Mars')" class="link" href="#">Mars</a>
              </li>
              <li
                class="text-3 nav-item destination__nav-item"
                :class="{ 'destination__nav-item_active': planet.name === 'Europa' }"
              >
                <a @click="toggleNav('Europa')" class="link" href="#">Europa</a>
              </li>
              <li
                class="text-3 nav-item destination__nav-item"
                :class="{ 'destination__nav-item_active': planet.name === 'Titan' }"
              >
                <a @click="toggleNav('Titan')" class="link" href="#">Titan</a>
              </li>
            </ul>
          </nav>
          <div class="destination__animation-wrapper" ref="titleParentBlock">
            <Transition name="fade-block" mode="in-out">
              <div :key="planet.name" class="destination__animation-block" ref="titleBlock">
                <h2 class="title title-2 destination__sutitle">{{ planet.name }}</h2>
                <p class="paragraph-2 destination__description">{{ planet.description }}</p>

                <div class="destination__data">
                  <div class="destination__data-block">
                    <span class="text-2 destination__distance-title">Avg. distance</span>
                    <span class="title title-5 destination__distance-value">{{
                      planet.distance
                    }}</span>
                  </div>
                  <div class="destination__data-block">
                    <span class="text-2 destination__time-title">Est. travel time</span>
                    <span class="title title-5 destination__time-value">{{ planet.travel }}</span>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.destination__wrapper {
  padding-top: 49px;
  padding-bottom: 48px;
}

.destination__container {
  /* display: flex; */
  /* position: relative; */
  padding-right: clamp(5px, 12vw, 165px);
  padding-left: clamp(5px, 12vw, 165px);
  /* padding-bottom: 760px; */
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
  position: relative;
  /* min-height: 760px; */
  padding: 127px 30px;
  gap: 60px;
  justify-content: space-between;
}
.destination__image {
  position: absolute;
  width: clamp(5px, 34vw, 480px);
  min-width: 350px;
  object-fit: contain;
}
.destination__text-block {
  /* position: relative; */
  max-width: clamp(5px, 31vw, 445px);
  padding: 7px 0;
}
.destination__nav {
  margin-bottom: 48px;
}
.destination__nav-list {
  display: flex;
  gap: 32px;
}
.destination__nav-item::after {
  bottom: -13px;
}
.destination__nav-item_active {
  color: var(--color-white);
}
.destination__nav-item_active::after {
  opacity: 1;
  background-color: var(--color-white);
}
.destination__sutitle {
  margin-bottom: 20px;
}
.destination__description {
  margin-bottom: 40px;
  padding-bottom: 40px;
  /* font-size: 1.3rem;
  line-height: 1.75rem; */
  border-bottom: 1px solid var(--gray25);
}
.destination__data {
  display: flex;
  justify-content: space-between;
}
.destination__data-block {
  display: flex;
  width: 227px;
  gap: 12px;
  flex-direction: column;
}

.destination__animation-image-wrapper {
  width: 480px;
}

.destination__animation-wrapper {
  display: flex;
  position: relative;
  width: 445px;
  align-items: center;
}

.destination__animation-block {
  position: absolute;
  width: 445px;
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

@media (max-width: 1200px) {
  .destination__wrapper {
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .destination__container {
    padding-right: 40px;
    padding-left: 40px;
  }
  .destination__block {
    display: flex;
    position: relative;
    /* min-height: 760px; */
    padding: 44px 0;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .destination__animation-image-wrapper {
    width: 300px;
    min-height: 318px;
  }
  .destination__animation-wrapper {
    min-height: 281px;
  }
  .destination__animation-block {
    width: 514px;
  }
  .destination__image {
    width: 300px;
    min-width: 300px;
  }
  .destination__text-block {
    width: 514px;
    max-width: 514px;
    /* padding: 7px 0; */
  }
  .destination__nav {
    margin-bottom: 39px;
  }
  .destination__nav-list {
    justify-content: center;
  }
  .destination__sutitle {
    margin-bottom: 15px;
  }
  .destination__description {
    margin-bottom: 24px;
    padding-bottom: 24px;
  }
  .destination__data-block {
    width: 245px;
  }
}
</style>
