<script setup>
import { onMounted, ref } from 'vue'
import { data } from '../data/data.js'

const technology = ref({})
const type = ref({})
const titleBlock = ref('')
const titleParentBlock = ref('')
technology.value = data.technology

onMounted(() => {
  titleParentBlock.value.style.height = `${titleBlock.value.offsetHeight}px`
  // titleParentBlock.value.style.width = `${titleBlock.value.offsetWidth}px`
})

const getImageUrl = (path) => {
  return new URL(path, import.meta.url).href
}

const toggleNav = (value) => {
  const index = technology.value.findIndex((el) => el.name === value)
  type.value = technology.value[index]
  if (titleParentBlock.value)
    titleParentBlock.value.style.height = `${titleBlock.value.offsetHeight + 28}px`
}
toggleNav('Launch vehicle')
</script>

<template>
  <div class="technology__wrapper">
    <div class="container technology__container">
      <h1 class="text-1 technology__title">
        <span class="technology__title-number">03</span>Space launch 101
      </h1>
      <div class="technology__animation-wrapper" ref="titleParentBlock">
        <transition name="fade-block" mode="in-out">
          <div :key="type.name" class="technology__block" ref="titleBlock">
            <!-- <div class="technology__block"> -->
            <nav class="technology__nav">
              <ul class="technology__nav-list">
                <li class="title title-4">
                  <a
                    class="link technology__nav-item"
                    href="#"
                    @click="toggleNav('Launch vehicle')"
                    :class="{ 'technology__nav-item_active': type.name === 'Launch vehicle' }"
                    >1</a
                  >
                </li>
                <li class="title title-4">
                  <a
                    class="link technology__nav-item"
                    href="#"
                    @click="toggleNav('Spaceport')"
                    :class="{ 'technology__nav-item_active': type.name === 'Spaceport' }"
                    >2</a
                  >
                </li>
                <li class="title title-4">
                  <a
                    class="link technology__nav-item"
                    href="#"
                    @click="toggleNav('Space capsule')"
                    :class="{ 'technology__nav-item_active': type.name === 'Space capsule' }"
                    >3</a
                  >
                </li>
              </ul>
            </nav>
            <div class="technology__text-block">
              <span class="title title-4 technology__sutitle">The terminology...</span>
              <h3 class="title title-3">{{ type.name }}</h3>
              <p class="paragraph-2 technology__description">{{ type.description }}</p>
            </div>
            <picture class="technology__image-wrapper">
              <source media="(max-width: 1200px)" :srcset="getImageUrl(type.images.landscape)" />
              <img class="technology__image" :src="getImageUrl(type.images.portrait)" alt="" />
            </picture>
            <!-- </div> -->
          </div>
        </transition>
      </div>
      <!-- <a class="title title-4 technology__btn" href="#">Explore</a> -->
    </div>
  </div>
</template>

<style scoped>
.technology__wrapper {
  padding-top: 49px;
  padding-bottom: 48px;
}

.technology__container {
  /* display: flex; */
  padding-right: 0;
  padding-left: clamp(5px, 12vw, 165px);
  /* align-items: center;
  justify-content: space-between; */
}

.technology__title {
  margin-bottom: 92px;
  font-weight: 400;
  color: var(--color-white);
}

.technology__title-number {
  margin-right: 22px;
  font-weight: 600;
  color: var(--color-white25);
}

.technology__block {
  display: flex;
  position: absolute;
}
.technology__nav {
  display: flex;
  margin-right: 64px;
  flex-direction: column;
  justify-content: center;
}
.technology__nav-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.text-3 {
}
.nav-item {
}
.technology__nav-item {
  display: flex;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  outline: 1px solid var(--color-white25);
  align-items: center;
  justify-content: center;
}
.technology__nav-item_active {
  color: var(--color-blue900);
  background-color: var(--color-white);
}
.link {
}
.technology__text-block {
  display: flex;
  margin-right: 34px;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
}
.title {
}
.title-4 {
}
.technology__sutitle {
  display: block;
  color: var(--color-white50);
}
.title-3 {
}
.paragraph-1 {
}
.technology__description {
}
.technology__image {
  min-width: clamp(100px, 42vw, 608px);
  min-height: 619px;
  object-fit: contain;
}

.technology__animation-wrapper {
  position: relative;
  /* min-height: 665px; */
}

@media (max-width: 1200px) {
  .technology__wrapper {
    padding-top: 40px;
    padding-bottom: 0;
  }
  .technology__container {
    padding-right: 0;
    padding-left: 0;
  }
  .technology__block {
    display: flex;
    /* position: relative; */
    /* min-height: 760px; */
    padding: 37px 0;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  .technology__title {
    margin-bottom: 52px;
    padding-right: 40px;
    padding-left: 40px;
  }

  .technology__animation-image-wrapper {
    width: 300px;
    min-height: 318px;
  }
  .technology__animation-wrapper {
    /* min-height: 814px; */
  }
  .technology__animation-block {
    width: 514px;
  }
  .technology__image-wrapper {
    width: 100vw;
    margin-bottom: 32px;
    order: -1;
  }
  .technology__image {
    object-fit: cover;
    width: 100%;
    min-height: 355px;
  }
  .technology__text-block {
    width: 514px;
    max-width: 514px;
    margin-right: 0;
    gap: 18px;
    /* padding: 7px 0; */
  }
  .technology__nav {
    margin-right: 0;
    margin-bottom: 39px;
  }
  .technology__nav-list {
    gap: 18px;
    flex-direction: row;
    justify-content: center;
  }
  .technology__nav-item {
    width: 55px;
    height: 55px;
  }
  .technology__sutitle {
    margin-bottom: 0;
  }
  .technology__description {
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .technology__data-block {
    width: 245px;
  }
}

@media (max-width: 580px) {
  .technology__wrapper {
    padding-top: 24px;
    padding-bottom: 24px;
  }
  .technology__container {
    /* padding-right: 24px;
    padding-left: 24px; */
  }
  .technology__title {
    margin-bottom: 50px;
    text-align: center;
  }
  .technology__block {
    /* padding: 50px 0;
    padding-bottom: 0; */
  }
  .technology__text-block {
    /* width: initial; */
  }

  .technology__animation-block {
    /* max-width: 327px; */
  }
  .technology__animation-wrapper {
    /* width: initial;
    height: 412px;
    margin: auto;
    justify-content: center; */
  }
  .technology__animation-image-wrapper {
    /* width: 150px;
    min-height: 142px; */
  }
  .technology__image-wrapper {
    width: 100%;
    /* width: 150px;
    min-width: initial; */
  }
  .technology__image {
    min-height: 258px;
    /* width: 150px;
    min-width: initial; */
  }
  .technology__nav {
    /* margin-bottom: 40px; */
  }
  .technology__nav-item {
  }
  .technology__nav-item::after {
    /* bottom: -15px; */
  }
  .technology__data {
    /* gap: 25px;
    flex-direction: column;
    align-items: center; */
  }
}
</style>
