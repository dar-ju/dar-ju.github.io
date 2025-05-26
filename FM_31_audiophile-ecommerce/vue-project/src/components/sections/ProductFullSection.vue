<script setup>
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import { useBreakpoints } from '@/composables/useBreakpoints'
import { useFormatPrice } from '@/composables/useFormatPrice'
import { useToast } from 'primevue/usetoast'
import QuantityInput from '@/components/common/QuantityInput.vue'
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { isTablet, isDesktop } = useBreakpoints()

const route = useRoute()
const router = useRouter()

const toast = useToast()

const paragraphs = ref('')
const gallery = ref(null)

const productStore = useProductStore()
const cartStore = useCartStore()
productStore.loading = true
productStore.product = []
const quantity = ref(1)

const goBack = () => {
  router.back()
}

const getData = async (val) => {
  try {
    await productStore.getData(val)
    if (!productStore.product.slug) throw new Error('not found')
  } catch (err) {
    router.replace({ name: 'not-found' })
  }
}
onMounted(async () => {
  await getData(route.params.name)
  updateFunction()
})

watch(
  () => route.params.name,
  async (newVal, oldVal) => {
    await getData(newVal)
    updateFunction()
  },
)

const updateFunction = () => {
  const rawDescription = productStore.product?.acf?.full_description
  paragraphs.value = rawDescription.split(/\r?\n\r?\n/)
  useGallery()
}

const useGallery = () => {
  if (isDesktop()) gallery.value = productStore.product?.acf?.product_images.desktop_gallery
  else if (isTablet()) gallery.value = productStore.product?.acf?.product_images.tablet_gallery
  else gallery.value = productStore.product?.acf?.product_images.mobile_gallery
}

const addToCartHandle = () => {
  if (quantity.value > 0) {
    const store = productStore.product
    cartStore.addToCart(
      store.slug,
      store.acf.short_name,
      gallery.value[0].metadata.thumbnail.file_url,
      store.acf.price,
      quantity.value,
    )
    showSuccess(store.acf.short_name, quantity.value)
    quantity.value = 1
  }
}

const showSuccess = (name, quantity) => {
  toast.add({
    severity: 'success',
    summary: 'Added to cart:',
    detail: `${name} - ${quantity}x`,
    life: 3000,
  })
}
</script>

<template>
  <section class="product">
    <div class="container product__container">
      <a href="#" @click.prevent="goBack()" class="product__back">Go Back</a>
      <div v-show="productStore.loading" class="skeleton">
        <div class="skeleton__container product__skeleton-container">
          <Skeleton class="skeleton__img product__skeleton-img" height="100%"></Skeleton>
          <div class="skeleton__block product__skeleton-block">
            <div class="product__skeleton-block2">
              <Skeleton width="10rem" height="1rem" class="skeleton__margin"></Skeleton>
              <Skeleton width="23rem" height="4rem" class="skeleton__margin"></Skeleton>
            </div>
            <div class="product__skeleton-block3">
              <Skeleton width="10rem" class="skeleton__margin15"></Skeleton>
              <Skeleton width="25rem" class="skeleton__margin15"></Skeleton>
              <Skeleton width="20rem" class="skeleton__margin15"></Skeleton>
              <Skeleton width="15rem" class="skeleton__margin"></Skeleton>
              <Skeleton width="8rem" height="3rem"></Skeleton>
            </div>
          </div>
        </div>
      </div>
      <div class="product__card">
        <picture class="product__img-wrapper">
          <source
            media="(min-width:1024px)"
            :srcset="
              productStore.product?.acf?.product_images.desktop_gallery[0].metadata.full.file_url
            "
          />
          <source
            media="(min-width:768px)"
            :srcset="
              productStore.product?.acf?.product_images.tablet_gallery[0].metadata.full.file_url
            "
          />
          <img
            class="product__img"
            v-if="gallery"
            :src="
              productStore.product?.acf?.product_images.mobile_gallery[0].metadata.full.file_url
            "
            :alt="productStore.product?.title?.rendered"
            width="540"
            height="560"
          />
        </picture>
        <div class="product__info-block">
          <div class="product__title-block">
            <span class="product__new" v-show="productStore.product?.acf?.new_product"
              >New product</span
            >
            <h1 class="product__title">{{ productStore.product?.title?.rendered }}</h1>
          </div>
          <p class="product__short-description">
            {{ productStore.product?.acf?.short_description }}
          </p>
          <span class="product__price"
            >&dollar; {{ useFormatPrice(productStore.product?.acf?.price) }}</span
          >
          <div class="product__add-block">
            <QuantityInput
              :key="quantity"
              :quantity="quantity"
              @update="(val) => (quantity = val)"
            />
            <Button class="btn product__btn" label="Add to cart" @click="addToCartHandle()" />
            <Toast position="bottom-right" />
          </div>
        </div>
      </div>

      <div class="product__info">
        <div class="product__features">
          <h2 class="product__subtitle">Features</h2>
          <p
            class="product__full-description"
            v-for="(paragraph, index) in paragraphs"
            :key="index"
          >
            {{ paragraph }}
          </p>
        </div>
        <div class="product__contain">
          <h2 class="product__subtitle">In the box</h2>
          <ul class="product__contain-list">
            <li
              class="product__contain-item"
              v-for="(item, index) in productStore.product?.acf?.contents"
              :key="index"
            >
              <span v-if="Object.values(item)[0]" class="product__item-amount"
                >{{ Object.values(item)[0] }}x</span
              >
              <span v-if="Object.values(item)[1]" class="product__item-name">{{
                Object.values(item)[1]
              }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="product__gallery">
        <template v-for="(image, index) in gallery">
          <picture v-if="index > 0" :key="index">
            <img
              class="product__gallery-image"
              :src="image.metadata.full.file_url"
              :alt="`${productStore.product?.title?.rendered} image ${index}`"
            />
          </picture>
        </template>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/breakpoints';
.product {
  padding-top: 45px;
  padding-bottom: 80px;
  &__container {
    max-width: 1440px;
  }
  &__back {
    display: inline-block;
    margin-bottom: 60px;
    color: var(--black50);
    transition: outline ease-in-out 0.3s;
    &:focus-visible {
      outline: 1px solid var(--black50);
      outline-offset: 6px;
    }
  }
  &__card {
    display: flex;
    margin-bottom: 155px;
    gap: 125px;
  }
  &__img-wrapper {
    width: 100%;
    max-width: 540px;
    min-width: 450px;
    border-radius: 8px;
    overflow: hidden;
  }
  &__img {
    width: 100%;
    &--reverse {
      order: 1;
    }
  }
  &__info-block {
    display: flex;
    max-width: 445px;
    gap: 38px;
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
  &__short-description {
    line-height: 1.667rem;
    color: var(--black50);
  }
  &__price {
    font-size: 1.2rem;
    font-weight: 700;
  }
  &__btn {
    width: 160px;
    font-weight: 500;
  }
  &__add-block {
    display: flex;
    gap: 16px;
  }
  &__info {
    display: flex;
    margin-bottom: 160px;
    gap: 138px;
  }
  &__features {
    max-width: 56%;
  }
  &__subtitle {
    margin-bottom: 36px;
    font-size: 2.133rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.095rem;
  }
  &__full-description {
    color: var(--black50);
    line-height: 1.667rem;
    &:not(:last-child) {
      margin-bottom: 25px;
    }
  }
  &__contain-list {
    display: flex;
    gap: 16px;
    flex-direction: column;
  }
  &__contain-item {
    display: flex;
    gap: 25px;
  }
  &__item-amount {
    color: var(--orange);
    font-weight: 700;
  }
  &__item-name {
    color: var(--black50);
  }
  &__gallery {
    display: grid;
    gap: 30px;
    grid-template-columns: auto auto;
    & picture:first-child {
      grid-row: 1 / 1;
    }
    & picture:nth-child(2) {
      grid-row: 1 / 3;
    }
  }
  &__gallery-image {
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  //MEDIA QUERIES
  @include media-query-lg {
    &__card {
      gap: 60px;
    }
    &__img-wrapper {
      min-width: 380px;
    }
    &__info {
      gap: 80px;
    }
  }

  @include media-query-l {
    padding-top: 0;
    padding-bottom: 60px;
    &__skeleton-img {
      max-height: 70rem;
      aspect-ratio: 5 / 8;
    }
    &__skeleton-block {
      max-width: 50%;
    }
    &__back {
      margin-bottom: 25px;
    }
    &__card {
      margin-bottom: 119px;
      gap: clamp(20px, 5rem, 70px);
    }
    &__img-wrapper {
      min-width: 280px;
    }
    &__info-block {
      max-width: 337px;
      gap: 32px;
    }
    &__new {
      font-size: 0.8rem;
      letter-spacing: 0.57rem;
    }
    &__title {
      font-size: 1.83rem;
      line-height: 2.1rem;
    }
    &__price {
      font-size: 1.28rem;
    }
    &__subtitle {
      margin-bottom: 32px;
    }
    &__info {
      margin-bottom: 126px;
      gap: 120px;
      flex-direction: column;
    }
    &__features {
      max-width: 100%;
    }
    &__contain {
      display: flex;
      gap: 22px;
      justify-content: flex-start;
    }
    &__contain-list {
      margin: 0 auto;
    }
    &__gallery {
      gap: 18px;
      grid-template-columns: minmax(0, 0.7fr) minmax(0, 1fr);
    }
  }

  @include media-query-md {
    &__skeleton-container {
      flex-direction: column;
      align-items: flex-start;
    }
    &__skeleton-img {
      min-width: 100%;
      max-height: 37rem;
      aspect-ratio: 1 / 1;
    }
    &__skeleton-block {
      max-width: 300px;
    }
    &__card {
      flex-direction: column;
    }
    &__img-wrapper {
      max-width: initial;
    }
    &__info-block {
      max-width: 100%;
    }
    &__contain {
      gap: 24px;
      flex-direction: column;
    }
    &__contain-list {
      margin: initial;
    }
    &__gallery {
      display: flex;
      flex-direction: column;
      & picture:nth-child(2) {
        order: 1;
      }
    }
    &__gallery-image {
      width: 100%;
    }
  }
}
</style>
