<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: false,
  },
  index: {
    type: Number,
    required: false,
  },
})

const isMobileScreen = ref(false)

onMounted(() => {
  const mediaQuery = window.matchMedia('(max-width: 1024px)')
  isMobileScreen.value = mediaQuery.matches
  mediaQuery.addEventListener('change', (e) => {
    isMobileScreen.value = e.matches
  })
})
</script>

<template>
  <li class="product-preview">
    <article class="container product-preview__container">
      <picture
        class="product-preview__img-wrapper"
        :class="{ 'product-preview__img-wrapper--reverse': index % 2 !== 0 && !isMobileScreen }"
      >
        <source media="(min-width:1024px)" :srcset="product.acf.category_images.desktop_image" />
        <source media="(min-width:768px)" :srcset="product.acf.category_images.tablet_image" />
        <img
          class="product-preview__img"
          v-lazy="{ src: product.acf.category_images.mobile_image }"
          alt=""
          width="540"
          height="560"
        />
      </picture>
      <div class="product-preview__info-block">
        <div class="product-preview__title-block">
          <span class="product-preview__new" v-show="product.acf.new_product">New product</span>
          <h2 class="product-preview__title">{{ product.title.rendered }}</h2>
        </div>
        <p class="product-preview__description">{{ product.acf.short_description }}</p>
        <Button asChild v-slot="slotProps">
          <RouterLink
            :to="`/${product.acf.category.slug}/${product.slug}`"
            class="btn product-preview__btn"
            :class="slotProps.class"
            >See product</RouterLink
          >
        </Button>
        <!-- <Button class="btn" label="See product" /> -->
      </div>
    </article>
  </li>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/breakpoints';
.product-preview {
  padding-top: 80px;
  padding-bottom: 80px;
  &__container {
    display: flex;
    gap: 125px;
  }
  &__img-wrapper {
    display: flex;
    width: 100%;
    align-items: center;
    border-radius: 8px;
    overflow: hidden;
    &--reverse {
      order: 1;
    }
  }
  &__img {
    // max-width: 540px;
  }
  &__info-block {
    display: flex;
    width: 82%;
    gap: 34px;
    flex-direction: column;
    justify-content: center;
  }
  &__new {
    display: block;
    margin-bottom: 16px;
    font-size: 0.933rem;
    letter-spacing: 0.667rem;
    color: var(--orange);
    text-transform: uppercase;
  }
  &__title {
    max-width: 350px;
    font-size: 2.667rem;
    line-height: 2.933rem;
    letter-spacing: 0.095rem;
    text-transform: uppercase;
  }
  &__description {
    line-height: 1.667rem;
    color: var(--black50);
  }
  &__btn {
    font-weight: 700;
  }

  //MEDIA QUERIES
  @include media-query-lg {
    &__container {
      gap: 60px;
    }
  }
  @include media-query-l {
    padding-top: 40px;
    padding-bottom: 75px;
    &__container {
      gap: 55px;
      flex-direction: column;
      align-items: center;
    }
    &__img {
      width: 100%;
    }
    &__info-block {
      width: 100%;
      max-width: 570px;
      gap: 29px;
      align-items: center;
      text-align: center;
    }
  }
  @include media-query-md {
    // &__container {
    //   flex-direction: column;
    // }
  }
  @include media-query-sm {
    padding: 0;
    &__container {
      gap: 33px;
    }
    &__list {
      gap: 25px;
    }
    &__info-block {
      gap: 24px;
    }
    &__new {
      margin-bottom: 24px;
    }
    &__title {
      max-width: 270px;
      font-size: 1.867rem;
      line-height: 2.6rem;
    }

    &__ZX9-wrapper {
      padding-top: 10px;
      padding-bottom: 30px;
    }
    &__ZX9-image {
      max-width: 160px;
      min-width: 147px;
    }
    &__ZX9-title {
      font-size: 2.42rem;
      line-height: 2.7rem;
    }
    &__ZX9-descr {
      margin-bottom: 0px;
    }
  }
}
</style>
