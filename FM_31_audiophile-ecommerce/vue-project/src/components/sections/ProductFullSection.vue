<script setup>
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import { useBreakpoints } from '@/composables/useBreakpoints'
import { useFormatPrice } from '@/composables/useFormatPrice'
import { useToast } from 'primevue/usetoast'
import QuantityInput from '@/components/common/QuantityInput.vue'
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { isMobile, isTablet, isDesktop, width } = useBreakpoints()

const route = useRoute()
const router = useRouter()

const toast = useToast()

const paragraphs = ref('')
const gallery = ref(null)
// const screenWidth = ref(window.innerWidth)

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
    // console.log(productStore.product)
    if (!productStore.product.slug) throw new Error('Not found')
  } catch (err) {
    router.replace({ name: 'not-found' })
  }
}
onMounted(async () => {
  await getData(route.params.name)
  updateFunction()
})
// onUnmounted(() => {
//   window.removeEventListener('resize', updateWidth)
// })

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

// Price number format
// const formatValue = (value) => {
//   if (!value) return ''
//   return new Intl.NumberFormat('en-US').format(value)
// }

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
    <!-- <p>Current width: {{ width }}</p>
    <p v-if="isMobile()">Mobile</p>
    <p v-else-if="isTablet()">Tablet</p>
    <p v-else>Desktop</p> -->
    <div class="container product__container">
      <a href="#" @click.prevent="goBack()" class="product__back">Go Back</a>
      <div v-show="productStore.loading" class="skeleton">
        <div class="skeleton__container">
          <Skeleton width="36rem" height="37rem"></Skeleton>
          <div>
            <div>
              <Skeleton width="10rem" height="1rem" class="skeleton__margin"></Skeleton>
              <Skeleton width="23rem" height="4rem" class="skeleton__margin"></Skeleton>
            </div>
            <div>
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
        <img
          class="product__img"
          v-if="gallery"
          :src="productStore.product?.acf?.product_images.desktop_gallery[0].metadata.full.file_url"
          alt=""
          width="540"
          height="560"
        />
        <div class="product__info-block">
          <div class="product__title-block">
            <!-- <span class="product__new" v-show="product.acf.new_product">New product</span> -->
            <span class="product__new" v-show="productStore.product?.acf?.new_product"
              >New product</span
            >
            <!-- <span class="product__new">New product</span> -->
            <h1 class="product__title">{{ productStore.product?.title?.rendered }}</h1>
            <!-- <h1 class="product__title">XX99 Mark II Headphones</h1> -->
          </div>
          <p class="product__short-description">
            {{ productStore.product?.acf?.short_description }}
          </p>
          <span class="product__price"
            >&dollar; {{ useFormatPrice(productStore.product?.acf?.price) }}</span
          >
          <div class="product__add-block">
            <!-- <div class="product__input-wrapper">
              <InputNumber
                v-model="amount"
                inputId="integeronly"
                showButtons
                buttonLayout="horizontal"
                :min="1"
                fluid
              >
                <template #incrementbuttonicon>
                  <span class="product__icon-wrapper">+</span>
                </template>
                <template #decrementbuttonicon
                  ><span class="product__icon-wrapper">-</span></template
                >
              </InputNumber>
            </div> -->
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
            <img class="product__gallery-image" :src="image.metadata.full.file_url" alt="" />
          </picture>
        </template>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.product {
  padding-top: 45px;
  padding-bottom: 80px;
  &__container {
  }
  &__back {
    display: block;
    margin-bottom: 60px;
    color: var(--black50);
  }
  &__card {
    display: flex;
    margin-bottom: 155px;
    gap: 125px;
  }
  &__img {
    max-width: 540px;
    &--reverse {
      order: 1;
    }
  }
  &__info-block {
    display: flex;
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
    // text-transform: uppercase;
  }
  &__add-block {
    display: flex;
    gap: 16px;
  }
  // &__input-wrapper {
  //   max-width: 120px;
  //   height: 48px;
  //   background-color: var(--grey);
  //   & span {
  //     height: 100%;
  //   }
  // }
  // &__icon-wrapper {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   height: 100%;
  //   width: 100%;
  //   border: none;
  //   & .pi {
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //   }
  // }
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
  &__contain {
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
      // grid-column: 2 / 3;
      grid-row: 1 / 1;
    }
    & picture:nth-child(2) {
      // grid-column: 2 / 3;
      grid-row: 1 / 3;
    }
  }
  &__gallery-image {
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    // &:nth-child(2) {
    //   grid-column: 2 / 3;
    //   grid-row: 1 / 3;
    // }
  }
}
</style>
