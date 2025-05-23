<script setup>
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
</script>

<template>
  <section class="product-preview">
    <div class="container product-preview__container">
      <picture
        class="product-preview__img-wrapper"
        :class="{ 'product-preview__img-wrapper--reverse': index % 2 !== 0 }"
      >
        <img
          class="product-preview__img"
          v-lazy="{ src: product.acf.category_images.desktop_image }"
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
    </div>
  </section>
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
  @include media-query-lg {
    &__container {
      gap: 60px;
    }
  }
  @include media-query-md {
    &__container {
      flex-direction: column;
    }
  }
}
</style>
