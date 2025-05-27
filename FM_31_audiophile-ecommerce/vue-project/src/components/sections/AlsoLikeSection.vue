<script setup>
import { useProductStore } from '@/stores/product'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const productStore = useProductStore()
const alsoList = ref(null)

onMounted(async () => {
  await productStore.getAlsoData()
  alsoListCreate()
})

function alsoListCreate() {
  const allProducts = productStore.alsoProduct
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
          <!-- <div class="also__wrapper"> -->
          <picture class="also__block">
            <source media="(min-width:1024px)" :srcset="item.acf.also_images.desktop_image" />
            <source media="(min-width:768px)" :srcset="item.acf.also_images.tablet_image" />
            <img
              class="also__image"
              :src="item.acf.also_images.mobile_image"
              alt="XX99 Mark I Headphones"
              width="284"
              height="249"
            />
          </picture>
          <h3 class="also__subtitle">{{ item.acf.short_name }}</h3>
          <!-- </div> -->
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
@use '@/assets/styles/breakpoints' as *;
.also {
  padding-top: 80px;
  padding-bottom: 84px;
  &__title {
    margin-bottom: 64px;
    text-align: center;
    font-size: 2.133rem;
    text-transform: uppercase;
    letter-spacing: 0.076rem;
  }
  &__list {
    display: flex;
    gap: 60px var(--catBlocksGap);
    flex-wrap: wrap;
  }
  &__item {
    display: flex;
    width: calc((100% - var(--catBlocksGap) * (var(--catBlocksInRow) - 1)) / var(--catBlocksInRow));
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
  &__block {
    display: flex;
    max-height: 315px;
    margin-bottom: 44px;
    padding: 33px;
    background-color: var(--grey);
    border-radius: 8px;
    overflow: hidden;
  }
  &__image {
    object-fit: cover;
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

  //MEDIA QUERIES
  @include media-query-l {
    padding-top: 60px;
    padding-bottom: 73px;
    &__title {
      margin-bottom: 57px;
    }
    &__block {
      padding: 0;
    }
  }

  @include media-query-md {
    &__list {
      max-width: 80%;
      margin: 0 auto;
      flex-direction: column;
    }
    &__item {
      width: 100%;
    }
    &__block {
      width: 100%;
      min-height: 170px;
      justify-content: center;
    }
    &__image {
      object-fit: cover;
    }
  }

  @include media-query-sm {
    padding-bottom: 80px;
    &__list {
      max-width: 100%;
      gap: 54px var(--catBlocksGap);
    }
    &__wrapper {
      width: 100%;
    }
    &__title {
      margin-bottom: 46px;
      font-size: 1.55rem;
    }
    &__block {
      min-height: 120px;
      margin-bottom: 35px;
      justify-content: center;
    }
    &__image {
      object-fit: contain;
    }
  }
}
</style>
