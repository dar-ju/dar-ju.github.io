<script setup>
import { useCategoryStore } from '@/stores/category'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const categoryStore = useCategoryStore()
const alsoList = ref(null)

onMounted(async () => {
  await categoryStore.getProductData()
  alsoListCreate()
})

// const alsoListCreate = () => {
//   const arr = categoryStore.product
//   const newArr = []
//   for (let i = arr.length - 1; i >= 0; i--) {
//   const item = arr.value[i]
//   if (условие) {
//     newArr.value.push(item)
//     arr.value.splice(i, 1)
//   }
// }
// const getCategory = categoryStore.product.filter(
//   (item) => item.acf.category.slug === route.params.category,
// )
// const excludeCurrent = getCategory.filter((item) => item.slug !== route.params.name)
// alsoList.value = [...excludeCurrent]
// console.log(alsoList.value)
// }

function alsoListCreate() {
  const allProducts = categoryStore.product
  const currentProduct = allProducts.find((p) => p.slug === route.params.name)
  if (!currentProduct) return []
  const categorySlug = currentProduct.acf.category.slug
  const sameCategory = allProducts.filter(
    (p) => p.acf.category.slug === categorySlug && p.slug !== route.params.name,
  )
  const remaining = allProducts.filter(
    (p) => p.slug !== route.params.name && !sameCategory.includes(p),
  )
  const result = [...sameCategory]
  for (const item of remaining) {
    if (result.length >= 3) break
    result.push(item)
  }
  // return result.slice(0, 3)
  alsoList.value = result.slice(0, 3)
}

const seeProductHandle = (category, product) => {
  router.push(`/${category}/${product}`)
  alsoListCreate()
}
</script>

<template>
  <section class="section also">
    <div class="container also__container">
      <h2 class="also__title">You may also like</h2>
      <ul class="also__list">
        <li class="also__item" v-for="(item, index) in alsoList" :key="index">
          <div class="also__wrapper">
            <div class="also__block">
              <img
                class="also__image"
                :src="item.acf.category_images.desktop_image"
                alt="XX99 Mark I Headphones"
              />
            </div>
            <h3 class="also__subtitle">{{ item.acf.short_name }}</h3>
          </div>
          <Button
            class="btn also__btn"
            label="See product"
            @click="seeProductHandle(item.acf.category.slug, item.slug)"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.also {
  padding-top: 80px;
  padding-bottom: 84px;
  &__container {
  }
  &__title {
    margin-bottom: 64px;
    text-align: center;
    font-size: 2.133rem;
    text-transform: uppercase;
    letter-spacing: 0.076rem;
  }
  &__list {
    display: flex;
    gap: 30px;
  }
  &__item {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
  &__block {
    display: flex;
    max-height: 315px;
    // position: relative;
    // width: 100%;
    // min-height: 316px;
    margin-bottom: 44px;
    padding: 33px;
    // gap: 20px;
    // flex-direction: column;
    // align-items: center;
    // justify-content: flex-end;
    background-color: var(--grey);
    border-radius: 8px;
    // text-transform: uppercase;
    // font-weight: 700;
  }
  &__image {
    object-fit: cover;
    // position: absolute;
    // width: 217px;
    // height: 203px;
    // top: -61px;
    // &--headphones {
    //   width: 222px;
    //   height: 212px;
    //   top: -81px;
    // }
    // &--speakers {
    //   top: -74px;
    // }
    // &--earphones {
    //   width: 220px;
    //   height: 194px;
    // }
  }
  &__subtitle {
    margin-bottom: 35px;
    font-size: 1.6rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    text-align: center;
  }
  &__shop {
    display: flex;
    gap: 13px;
    align-items: center;
    font-size: 0.867rem;
    color: var(--black50);
    transition: outline ease-in-out 0.3s;
    &::after {
      content: '';
      width: 7px;
      height: 12px;
      background-image: url('/assets/images/category-section/category-arrow.svg');
    }
    &:focus-visible {
      outline: 1px solid var(--black50);
      outline-offset: 6px;
    }
  }
  &__btn {
    width: 160px;
  }
}
</style>
