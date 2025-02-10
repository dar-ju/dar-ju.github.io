<script setup>
import { ref } from 'vue'
import { data } from '../data/data.js'

const crew = ref({})
const member = ref({})
crew.value = data.crew

const getImageUrl = (path) => {
  return new URL(path, import.meta.url).href
}

const toggleNav = (value) => {
  const index = crew.value.findIndex((el) => el.name === value)
  member.value = crew.value[index]
}
toggleNav('Douglas Hurley')
</script>

<template>
  <main class="crew__wrapper">
    <section class="container crew__container">
      <h1 class="text-1 crew__title"><span class="crew__title-number">02</span>Meet your crew</h1>
      <div class="crew__animation-wrapper">
        <transition name="fade-block" mode="in-out">
          <div :key="member.name" class="crew__block">
            <div class="crew__text-block">
              <div class="crew__info">
                <h2 class="title title-4 crew__subtitle">{{ member.role }}</h2>
                <h3 class="title title-3 crew__subtitle-2">{{ member.name }}</h3>
                <p class="paragraph-2 crew__description">{{ member.bio }}</p>
              </div>
              <div class="crew__nav">
                <ul class="crew__nav-list" role="menu">
                  <li
                    @click="toggleNav('Douglas Hurley')"
                    class="crew__nav-item"
                    :class="{ 'crew__nav-item_active': member.name === 'Douglas Hurley' }"
                    role="menuitem"
                  >
                    <a class="link" href="#"></a>
                  </li>
                  <li
                    @click="toggleNav('Mark Shuttleworth')"
                    class="crew__nav-item"
                    :class="{ 'crew__nav-item_active': member.name === 'Mark Shuttleworth' }"
                    role="menuitem"
                  >
                    <a class="link" href="#"></a>
                  </li>
                  <li
                    @click="toggleNav('Victor Glover')"
                    class="crew__nav-item"
                    :class="{ 'crew__nav-item_active': member.name === 'Victor Glover' }"
                    role="menuitem"
                  >
                    <a class="link" href="#"></a>
                  </li>
                  <li
                    @click="toggleNav('Anousheh Ansari')"
                    class="crew__nav-item"
                    :class="{ 'crew__nav-item_active': member.name === 'Anousheh Ansari' }"
                    role="menuitem"
                  >
                    <a class="link" href="#"></a>
                  </li>
                </ul>
              </div>
            </div>
            <img class="crew__image" :src="getImageUrl(member.images.webp)" alt="" />
          </div>
        </transition>
      </div>
    </section>
  </main>
</template>

<style scoped>
.crew__wrapper {
  padding-top: 49px;
  padding-bottom: 49px;
}
.crew__container {
  padding-right: 165px;
  padding-left: 165px;
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
  position: absolute;
  padding: 45px 0;
  gap: 75px;
  justify-content: space-between;
}
.crew__image {
  width: 539px;
  height: 676px;
  object-fit: contain;
  object-position: bottom;
  mask-image: linear-gradient(var(--gray) 77%, transparent);
}
.crew__text-block {
  display: flex;
  max-width: 539px;
  gap: 20px;
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
  transition: background-color ease-in-out 0.3s;
}
.crew__nav-item:hover,
.crew__nav-item:has(.link:focus) {
  background-color: var(--gray);
}
.crew__nav-item_active {
  background-color: var(--color-white);
}
.crew__animation-wrapper {
  position: relative;
  min-height: 745px;
}

@media (max-width: 1200px) {
  .crew__wrapper {
    padding-top: 40px;
    padding-bottom: 40px;
    overflow-y: hidden;
  }
  .crew__container {
    padding-right: 40px;
    padding-left: 40px;
  }
  .crew__block {
    gap: 30px;
    flex-direction: column;
    text-align: center;
  }
  .crew__animation-wrapper {
    display: flex;
    position: relative;
    min-height: 804px;
    justify-content: center;
  }
  .crew__title {
    margin-bottom: 20px;
  }
  .crew__description {
    min-height: 87px;
  }
  .crew__text-block {
    max-width: 540px;
    min-height: 265px;
    justify-content: space-between;
  }
  .crew__nav {
    min-height: 0;
    justify-content: center;
  }
  .crew__nav-list {
    gap: 16px;
  }
  .crew__nav-item {
    width: 10px;
    height: 10px;
  }
  .crew__image {
    width: 447px;
    height: 560px;
    margin: auto;
    object-position: right;
  }
}

@media (max-width: 580px) {
  .crew__wrapper {
    padding-top: 24px;
    padding-bottom: 24px;
  }
  .crew__container {
    padding-right: 24px;
    padding-left: 24px;
  }
  .crew__title {
    margin-bottom: 0;
    text-align: center;
  }
  .crew__block {
    padding: 63px 0;
    padding-bottom: 0;
  }
  .crew__text-block {
    width: initial;
  }
  .crew__subtitle-2 {
    margin-bottom: 18px;
  }
  .crew__info {
    margin-bottom: 0;
    gap: 8px;
  }
  .crew__description {
    min-height: 187px;
  }
  .crew__animation-wrapper {
    min-height: 725px;
  }
  .crew__image {
    width: 327px;
    height: 350px;
    object-fit: contain;
    object-position: top;
  }
}

@media (max-width: 350px) {
  .crew__description {
    min-height: 210px;
  }
}
</style>
