<script setup>
import { onMounted, ref, watch, nextTick } from 'vue'
import { data } from '../data/data.js'

const technology = ref({})
const type = ref({})
const titleBlock = ref('')
const titleParentBlock = ref('')
technology.value = data.technology

// adjust the height of the block to the text
onMounted(() => {
  titleParentBlock.value.style.height = `${titleBlock.value.offsetHeight + 234}px`
})

// watch the submenu change to set the block height
watch(
  () => type.value.name,
  async (newName) => {
    if (newName) {
      await nextTick()
      titleParentBlock.value.style.height = `${titleBlock.value.offsetHeight + 234}px`
    }
  },
)

const getImageUrl = (path) => {
  return new URL(path, import.meta.url).href
}

const toggleNav = (value) => {
  const index = technology.value.findIndex((el) => el.name === value)
  type.value = technology.value[index]
}
toggleNav('Launch vehicle')
</script>

<template>
  <main class="technology__wrapper">
    <section class="container technology__container">
      <h1 class="text-1 technology__title">
        <span class="technology__title-number">03</span>Space launch 101
      </h1>
      <div class="technology__animation-wrapper" ref="titleParentBlock">
        <transition name="fade-block" mode="in-out">
          <div :key="type.name" class="technology__block" ref="titleBlock">
            <div class="technology__nav">
              <ul class="technology__nav-list" role="menu">
                <li class="title title-4 technology__nav-item" role="menuitem" tabindex="0">
                  <a
                    class="technology__nav-item-link"
                    @click="toggleNav('Launch vehicle')"
                    :class="{ 'technology__nav-item_active': type.name === 'Launch vehicle' }"
                    >1</a
                  >
                </li>
                <li class="title title-4 technology__nav-item" role="menuitem" tabindex="0">
                  <a
                    class="technology__nav-item-link"
                    @click="toggleNav('Spaceport')"
                    :class="{ 'technology__nav-item_active': type.name === 'Spaceport' }"
                    >2</a
                  >
                </li>
                <li class="title title-4 technology__nav-item" role="menuitem" tabindex="0">
                  <a
                    class="technology__nav-item-link"
                    @click="toggleNav('Space capsule')"
                    :class="{ 'technology__nav-item_active': type.name === 'Space capsule' }"
                    >3</a
                  >
                </li>
              </ul>
            </div>
            <div class="technology__text-block">
              <span class="title title-4 technology__sutitle">The terminology...</span>
              <h3 class="title title-3">{{ type.name }}</h3>
              <p class="paragraph-2">{{ type.description }}</p>
            </div>
            <picture class="technology__image-wrapper">
              <source
                media="(max-width: 580px)"
                :srcset="getImageUrl(type.images.landscape_mobile)"
              />
              <source media="(max-width: 1200px)" :srcset="getImageUrl(type.images.landscape)" />
              <img class="technology__image" :src="getImageUrl(type.images.portrait)" alt="" />
            </picture>
          </div>
        </transition>
      </div>
    </section>
  </main>
</template>

<style scoped>
.technology__wrapper {
  padding-top: 49px;
  padding-bottom: 48px;
}
.technology__container {
  padding-right: 0;
  padding-left: clamp(5px, 12vw, 165px);
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
.technology__nav-item {
  border-radius: 50%;
  cursor: pointer;
  transition: outline ease-in-out 0.1s;
}
.technology__nav-item:focus {
  outline: 1px solid var(--color-white25);
}
.technology__nav-item-link {
  display: flex;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  outline: 1px solid var(--color-white25);
  align-items: center;
  justify-content: center;
}
.technology__nav-item:hover {
  outline: 1px solid var(--color-white);
}
.technology__nav-item_active {
  color: var(--color-blue900);
  background-color: var(--color-white);
}
.technology__text-block {
  display: flex;
  margin-right: 34px;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
}
.technology__sutitle {
  display: block;
  color: var(--color-white50);
}
.technology__image {
  min-width: clamp(100px, 42vw, 608px);
  min-height: 619px;
  object-fit: contain;
}
.technology__animation-wrapper {
  position: relative;
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
  .technology__nav-item-link {
    width: 55px;
    height: 55px;
  }
  .technology__sutitle {
    margin-bottom: 0;
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
  .technology__title {
    margin-bottom: 50px;
    text-align: center;
  }
  .technology__text-block {
    width: initial;
    padding-right: 24px;
    padding-left: 24px;
  }
  .technology__image-wrapper {
    width: 100%;
  }
  .technology__image {
    width: 100vw;
    min-height: 258px;
  }
  .technology__nav-list {
    gap: 16px;
  }
  .technology__nav-item-link {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 350px) {
  .technology__image {
    width: 100%;
  }
}
</style>
