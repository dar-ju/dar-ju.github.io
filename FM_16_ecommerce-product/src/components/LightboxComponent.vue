<script setup>
import { useProductStore } from '@/stores/productStore'
import { nextTick, onMounted, ref } from 'vue'

const productStore = useProductStore()
// const thumbs = ref([{ active: true }, { active: false }, { active: false }, { active: false }])
const activeThumbs = ref([])
const activeElement = ref(0)
const focusOnElement = ref(null)

const { images } = defineProps({
  images: {
    type: Object,
    required: false,
  },
})

onMounted(() => {
  for (let i = 0; i < Object.keys(images.images).length; i++) {
    i === productStore.activeImage
      ? activeThumbs.value.push({ active: true })
      : activeThumbs.value.push({ active: false })
  }
  activeElement.value = productStore.activeImage
})

const thumbToggle = (index) => {
  if (index >= activeThumbs.value.length || index < 0) return
  activeThumbs.value.forEach((element) => {
    element.active = false
  })
  activeThumbs.value[index].active = true
  activeElement.value = index
}

const closeLightbox = () => {
  productStore.showLightbox = false
}

const setFocus = () => {
  nextTick(() => {
    focusOnElement.value?.focus()
  })
}
setFocus()
</script>

<template>
  <div class="lightbox" role="dialog">
    <div class="lightbox__wrapper">
      <img
        class="lightbox__image"
        :src="productStore.product.images[`imageProduct${activeElement + 1}`]"
        :alt="`${images.name} main foto`"
      />
      <ul class="lightbox__thumbnails">
        <li
          v-for="(thumb, index) in activeThumbs"
          :key="index"
          @click="thumbToggle(index)"
          :class="{ 'lightbox-selected': activeThumbs[index].active }"
          class="lightbox__thumbnail"
        >
          <button>
            <img
              class="lightbox__thumbnail-image"
              :class="{ 'lightbox-selected-image': activeThumbs[index].active }"
              :src="productStore.product.thumbnails[`thumbnailProduct${index + 1}`]"
              :alt="`${productStore.product.name} thumbnail ${index + 1}`"
            />
          </button>
        </li>
      </ul>
      <button
        @click="thumbToggle(activeElement - 1)"
        class="lightbox__image-arrow lightbox__image-arrow_prev"
        ref="focusOnElement"
      >
        <svg class="lightbox__nav-icon" width="12" height="18" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 1 3 9l8 8" stroke-width="3" fill="none" fill-rule="evenodd" />
        </svg>
      </button>
      <button
        @click="thumbToggle(activeElement + 1)"
        class="lightbox__image-arrow lightbox__image-arrow_next"
      >
        <svg class="lightbox__nav-icon" width="13" height="18" xmlns="http://www.w3.org/2000/svg">
          <path d="m2 1 8 8-8 8" stroke-width="3" fill="none" fill-rule="evenodd" />
        </svg>
      </button>
      <button @click="closeLightbox()" class="lightbox__image-close">
        <svg class="lightbox__close-icon" width="25" height="25" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
            fill-rule="evenodd"
            transform="scale(1.5)"
          />
        </svg>
      </button>
    </div>
    <div @click="closeLightbox()" class="lightbox__overlay"></div>
  </div>
</template>

<style scope>
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.75);
}

.lightbox__overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.lightbox__wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -62%);
  z-index: 10;
}

.lightbox__image {
  width: 550px;
  margin-bottom: 40px;
  border-radius: 16px;
}

.lightbox__thumbnails {
  display: flex;
  gap: 29px;
  justify-content: center;
  flex-wrap: wrap;
}

.lightbox__thumbnail {
  width: 90px;
  border-radius: 10px;
  background-color: var(--color-white);
  transition: outline ease-in-out 0.1s;
}

.lightbox__thumbnail:focus .lightbox__thumbnail:active {
  outline: 2px solid var(--color-orange);
}

.lightbox__thumbnail-image {
  border-radius: 8px;
  transition: filter ease-in-out 0.3s;
}

.lightbox__thumbnail-image:hover {
  filter: opacity(30%);
}

.lightbox-selected {
  background-color: var(--color-white);
  outline: 2px solid var(--color-orange);
}

.lightbox-selected-image {
  filter: opacity(30%);
}

.lightbox__image-arrow {
  position: absolute;
  width: 55px;
  height: 55px;
  top: 35%;
  background-color: var(--color-white);
  border-radius: 50%;
  stroke: var(--color-very-dark-blue);
  transition: stroke ease-in-out 0.3s;
}

.lightbox__image-arrow:hover {
  stroke: var(--color-orange);
}

.lightbox__image-arrow_prev {
  left: -27px;
}

.lightbox__image-arrow_next {
  right: -27px;
}

.lightbox__nav-icon {
  vertical-align: middle;
}

.lightbox__image-close {
  position: absolute;
  top: -43px;
  right: -4px;
  fill: var(--color-white);
}

.lightbox__close-icon {
  transition: fill ease-in-out 0.3s;
}

.lightbox__close-icon:hover {
  fill: var(--color-orange);
}
</style>
