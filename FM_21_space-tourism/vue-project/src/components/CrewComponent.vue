<script setup>
import { onMounted, ref } from 'vue'
import { data } from '../data/data.js'

const crew = ref({})
const member = ref({})
const titleBlock = ref('')
const titleParentBlock = ref('')
crew.value = data.crew

onMounted(() => {
  // titleParentBlock.value.style.height = `${titleBlock.value.offsetHeight}px`
  // titleParentBlock.value.style.width = `${titleBlock.value.offsetWidth}px`
})

const getImageUrl = (path) => {
  return new URL(path, import.meta.url).href
}

const toggleNav = (value) => {
  const index = crew.value.findIndex((el) => el.name === value)
  member.value = crew.value[index]
  // if (titleParentBlock.value)
  //   titleParentBlock.value.style.height = `${titleBlock.value.offsetHeight}px`
}
toggleNav('Douglas Hurley')
</script>

<template>
  <div class="crew__wrapper">
    <div class="container crew__container">
      <h1 class="text-1 crew__title"><span class="crew__title-number">02</span>Meet your crew</h1>
      <div class="crew__block">
        <div class="crew__text-block">
          <div class="crew__info">
            <h2 class="title title-4 crew__subtitle">{{ member.role }}</h2>
            <h3 class="title title-3">{{ member.name }}</h3>
            <p class="paragraph-2 crew__description">{{ member.bio }}</p>
          </div>
          <nav class="crew__nav">
            <ul class="crew__nav-list">
              <li
                @click="toggleNav('Douglas Hurley')"
                class="crew__nav-item"
                :class="{ 'crew__nav-item_active': member.name === 'Douglas Hurley' }"
              >
                <a class="link" href="#"></a>
              </li>
              <li
                @click="toggleNav('Mark Shuttleworth')"
                class="crew__nav-item"
                :class="{ 'crew__nav-item_active': member.name === 'Mark Shuttleworth' }"
              >
                <a class="link" href="#"></a>
              </li>
              <li
                @click="toggleNav('Victor Glover')"
                class="crew__nav-item"
                :class="{ 'crew__nav-item_active': member.name === 'Victor Glover' }"
              >
                <a class="link" href="#"></a>
              </li>
              <li
                @click="toggleNav('Anousheh Ansari')"
                class="crew__nav-item"
                :class="{ 'crew__nav-item_active': member.name === 'Anousheh Ansari' }"
              >
                <a class="link" href="#"></a>
              </li>
            </ul>
          </nav>
        </div>
        <img class="crew__image" :src="getImageUrl(member.images.webp)" alt="" />
      </div>
      <!-- <a class="title title-4 crew__btn" href="#">Explore</a> -->
    </div>
  </div>
</template>

<style scoped>
.crew__wrapper {
  padding-top: 49px;
  padding-bottom: 49px;
}

.crew__container {
  /* display: flex; */
  padding-right: 165px;
  padding-left: 165px;
  /* align-items: center;
  justify-content: space-between; */
}

.crew__title {
  margin-bottom: 10px;
  font-weight: 400;
  color: var(--color-white);
}

.crew__title-number {
  margin-right: 22px;
  font-weight: 600;
  color: var(--color-white25);
}
.crew__subtitle {
  color: var(--color-white50);
}
.crew__block {
  display: flex;
  padding: 45px 0;
  gap: 80px;
  justify-content: space-between;
}
.crew__image {
  width: 539px;
  height: 676px;
  object-fit: contain;
  mask-image: linear-gradient(var(--gray) 77%, transparent);
}
.crew__text-block {
  display: flex;
  max-width: 539px;
  flex-direction: column;
  justify-content: space-between;
}
.crew__info {
  display: flex;
  height: 84%;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
}
.crew__nav {
  display: flex;
  min-height: 60px;
  /* padding-top: 57px;
  padding-bottom: 18px; */
  align-items: center;
}
.crew__nav-list {
  display: flex;
  gap: 40px;
  list-style: none;
}

.crew__nav-item {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  cursor: pointer;
  background-color: var(--color-white25);
}
.crew__nav-item_active {
  background-color: var(--color-white);
}

/* .crew__nav-item::after {
  content: '';
  display: block;
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: var(--color-white);
} */
/* .crew__nav-item::after {
  bottom: -23px;
} */
/* .crew__nav-item_active::after {
  opacity: 1;
  background-color: var(--color-white);
} */
/* .crew__sutitle {
  margin-bottom: 20px;
} */
.crew__description {
}
</style>
