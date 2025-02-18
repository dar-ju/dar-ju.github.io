<script setup>
import { onMounted, ref, watch, nextTick } from 'vue'
import { data } from '../data/data.js'

const destinations = ref({})
const planet = ref({})
const titleBlock = ref('')
const titleParentBlock = ref('')
destinations.value = data.destinations

// adjust the height of the block to the text
onMounted(() => {
  titleParentBlock.value.style.height = `${titleBlock.value.offsetHeight}px`
  destinations.value.forEach((dest) => (new Image().src = getImageUrl(dest.images.webp)))
})

// watch the submenu change to set the block height
watch(
  () => planet.value.name,
  async (newName) => {
    if (newName) {
      await nextTick()
      titleParentBlock.value.style.height = `${titleBlock.value.offsetHeight}px`
    }
  },
)

const getImageUrl = (path) => {
  return new URL(path, import.meta.url).href
}

const toggleNav = (value) => {
  const index = destinations.value.findIndex((el) => el.name === value)
  planet.value = destinations.value[index]
}
toggleNav('Moon')
</script>

<template>
  <main class="destination__wrapper">
    <section class="container destination__container">
      <h1 class="text-1 destination__title">
        <span class="destination__title-number">01</span>Pick your destination
      </h1>
      <div class="destination__block">
        <div class="destination__animation-image-wrapper">
          <Transition name="fade-block" mode="default">
            <div :key="planet.name" class="destination__animation-image-block">
              <img
                class="destination__image"
                :src="getImageUrl(planet.images.webp)"
                :alt="`${planet.name} image`"
              />
            </div>
          </Transition>
        </div>
        <div class="destination__text-block">
          <ul class="destination__nav-list" role="menu">
            <li
              class="text-3 nav-item destination__nav-item"
              :class="{ 'destination__nav-item_active': planet.name === 'Moon' }"
              role="menuitem"
              tabindex="0"
            >
              <a @click="toggleNav('Moon')">Moon</a>
            </li>
            <li
              class="text-3 nav-item destination__nav-item"
              :class="{ 'destination__nav-item_active': planet.name === 'Mars' }"
              role="menuitem"
              tabindex="0"
            >
              <a @click="toggleNav('Mars')">Mars</a>
            </li>
            <li
              class="text-3 nav-item destination__nav-item"
              :class="{ 'destination__nav-item_active': planet.name === 'Europa' }"
              role="menuitem"
              tabindex="0"
            >
              <a @click="toggleNav('Europa')">Europa</a>
            </li>
            <li
              class="text-3 nav-item destination__nav-item"
              :class="{ 'destination__nav-item_active': planet.name === 'Titan' }"
              role="menuitem"
              tabindex="0"
            >
              <a @click="toggleNav('Titan')">Titan</a>
            </li>
          </ul>
          <div class="destination__animation-wrapper" ref="titleParentBlock">
            <Transition name="fade-block" mode="in-out">
              <div :key="planet.name" class="destination__animation-block" ref="titleBlock">
                <h2 class="title title-2 destination__sutitle">{{ planet.name }}</h2>
                <p class="paragraph-2 destination__description">{{ planet.description }}</p>

                <div class="destination__data">
                  <div class="destination__data-block">
                    <span class="text-2">Avg. distance</span>
                    <span class="title title-5">{{ planet.distance }}</span>
                  </div>
                  <div class="destination__data-block">
                    <span class="text-2">Est. travel time</span>
                    <span class="title title-5">{{ planet.travel }}</span>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.destination__wrapper {
  padding-top: 49px;
  padding-bottom: 48px;
}
.destination__container {
  padding-right: clamp(5px, 12vw, 165px);
  padding-left: clamp(5px, 12vw, 165px);
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
  max-width: clamp(5px, 31vw, 445px);
  padding: 7px 0;
}
.destination__nav-list {
  display: flex;
  margin-bottom: 48px;
  flex-wrap: wrap;
  gap: 32px;
}
.destination__nav-item {
  cursor: pointer;
}
.destination__nav-item::after {
  bottom: -13px;
}
.destination__nav-item_active {
  color: var(--color-white);
}
.destination__nav-item:focus::after {
  opacity: 1;
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
  align-items: flex-start;
}
.destination__animation-block {
  position: absolute;
  width: 445px;
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
  }
  .destination__nav-list {
    margin-bottom: 39px;
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

@media (max-width: 580px) {
  .destination__wrapper {
    padding-top: 24px;
    padding-bottom: 24px;
  }
  .destination__container {
    padding-right: 24px;
    padding-left: 24px;
  }
  .destination__title {
    margin-bottom: 0;
    text-align: center;
  }
  .destination__block {
    padding: 50px 0;
    padding-bottom: 0;
  }
  .destination__text-block {
    width: initial;
  }
  .destination__animation-block {
    max-width: 327px;
  }
  .destination__animation-wrapper {
    width: initial;
    height: 412px;
    margin: auto;
    justify-content: center;
  }
  .destination__animation-image-wrapper {
    width: 150px;
    min-height: 142px;
  }
  .destination__image {
    width: 150px;
    min-width: initial;
  }
  .destination__nav-list {
    margin-bottom: 40px;
  }
  .destination__nav-item::after {
    bottom: -15px;
  }
  .destination__data {
    gap: 25px;
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 350px) {
  .destination__description {
    padding-right: 24px;
    padding-left: 24px;
  }
}
</style>
