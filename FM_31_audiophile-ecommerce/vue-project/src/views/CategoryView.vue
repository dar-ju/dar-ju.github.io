<script setup>
import CategoriesSection from '@/components/sections/CategoriesSection.vue'
import InvitationSection from '@/components/sections/InvitationSection.vue'
import ProductPreviewSection from '@/components/sections/ProductPreviewSection.vue'
import { useCategoryStore } from '@/stores/category'
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const categoryStore = useCategoryStore()
categoryStore.loading = true
categoryStore.product = []

const getData = async (val) => {
  try {
    await categoryStore.getData(val)
    if (!categoryStore.title) throw new Error('Not found')
  } catch (err) {
    router.replace({ name: 'not-found' })
  }
}
onMounted(async () => {
  await getData(route.params.category)
})

watch(
  () => route.params.category,
  async (newVal, oldVal) => {
    await getData(newVal)
  },
)
</script>

<template>
  <main>
    <section class="section category">
      <div class="container category__container">
        <h1 class="category__title">{{ categoryStore.title.name }}</h1>
      </div>

      <div class="main-wrapper">
        <div class="category__products-section">
          <div v-show="categoryStore.loading" class="skeleton category__skeleton">
            <div class="container skeleton__container category__skeleton-container">
              <Skeleton class="skeleton__img category__skeleton-img" height="100%"></Skeleton>
              <div class="skeleton__block">
                <div class="category__skeleton-block2">
                  <Skeleton width="10rem" height="1rem" class="skeleton__margin"></Skeleton>
                  <Skeleton width="23rem" height="4rem" class="skeleton__margin"></Skeleton>
                </div>
                <div class="category__skeleton-block3">
                  <Skeleton width="10rem" class="skeleton__margin15"></Skeleton>
                  <Skeleton width="25rem" class="skeleton__margin15"></Skeleton>
                  <Skeleton width="20rem" class="skeleton__margin15"></Skeleton>
                  <Skeleton width="15rem" class="skeleton__margin"></Skeleton>
                  <Skeleton width="8rem" height="3rem"></Skeleton>
                </div>
              </div>
            </div>
          </div>
          <TransitionGroup name="fade" tag="ul" class="category__products-list">
            <ProductPreviewSection
              v-for="(product, index) in categoryStore.product"
              :key="product.id"
              :product="product"
              :index="index"
            />
          </TransitionGroup>
        </div>
        <CategoriesSection />
        <InvitationSection class="category__invitation" />
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
.category {
  padding-top: 95px;
  &__container {
    margin-bottom: 94px;
  }
  &__products-list {
    display: flex;
    padding-top: 80px;
    padding-bottom: 83px;
    gap: 159px;
    flex-direction: column;
  }
  &__title {
    font-size: 2.667rem;
    color: var(--white);
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
  }
  &__products-section {
    padding-top: 40px;
  }
  &__invitation {
    padding-bottom: 120px;
  }

  //MEDIA QUERIES
  @include media-query-l {
    padding-top: 104px;
    &__skeleton-container {
      flex-direction: column;
    }
    &__skeleton-img {
      min-width: 100%;
      aspect-ratio: 16 / 8;
    }
    &__skeleton-block2,
    &__skeleton-block3 {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    &__container {
      margin-bottom: 96px;
    }
    &__products-list {
      padding-top: 40px;
      padding-bottom: 62px;
      gap: 116px;
    }
    &__invitation {
      padding-bottom: 82px;
    }
  }

  @include media-query-md {
    &__skeleton-img {
      aspect-ratio: 1 / 1;
    }
  }

  @include media-query-sm {
    padding-top: 35px;
    &__skeleton-img {
      aspect-ratio: 4 / 3;
    }
    &__container {
      margin-bottom: 35px;
    }
    &__title {
      font-size: 1.867rem;
    }
    &__products-section {
      padding-top: 24px;
    }
    &__products-list {
      display: flex;
      padding-bottom: 75px;
      gap: 119px;
      flex-direction: column;
    }
    &__invitation {
      padding-top: 60px;
    }
  }
}
</style>
