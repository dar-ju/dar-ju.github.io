<script setup>
import { onMounted, ref } from 'vue'
import { data } from '../data/data.js'

const technology = ref({})
const type = ref({})
const titleBlock = ref('')
const titleParentBlock = ref('')
technology.value = data.technology

onMounted(() => {
  // titleParentBlock.value.style.height = `${titleBlock.value.offsetHeight}px`
  // titleParentBlock.value.style.width = `${titleBlock.value.offsetWidth}px`
})

const getImageUrl = (path) => {
  return new URL(path, import.meta.url).href
}

const toggleNav = (value) => {
  const index = technology.value.findIndex((el) => el.name === value)
  type.value = technology.value[index]
  // if (titleParentBlock.value)
  //   titleParentBlock.value.style.height = `${titleBlock.value.offsetHeight}px`
}
toggleNav('Launch vehicle')
</script>

<template>
  <div class="technology__wrapper">
    <div class="container technology__container">
      <h1 class="text-1 technology__title">
        <span class="technology__title-number">03</span>Space launch 101
      </h1>
      <div class="technology__animation-wrapper">
        <transition name="fade-block" mode="in-out">
          <div :key="type.name" class="technology__block">
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
            <img class="technology__image" :src="getImageUrl(type.images.portrait)" alt="" />
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
  min-height: 665px;
}
</style>
