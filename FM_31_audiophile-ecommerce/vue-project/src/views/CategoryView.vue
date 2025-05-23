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
        <!-- <h1 class="category__title">{{ categoryStore.title.name }}</h1> -->
        <h1 class="category__title">{{ categoryStore.title.name }}</h1>
      </div>

      <div class="main-wrapper">
        <div class="category__products-section">
          <div v-show="categoryStore.loading" class="skeleton">
            <div class="container skeleton__container">
              <Skeleton class="skeleton__img" height="100%"></Skeleton>
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
          <TransitionGroup name="fade" tag="ul">
            <ProductPreviewSection
              v-for="(product, index) in categoryStore.product"
              :key="product.id"
              :product="product"
              :index="index"
            />
          </TransitionGroup>
          <!-- набор товаров -->
        </div>
        <CategoriesSection />
        <InvitationSection class="category__invitation" />
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/breakpoints';
.category {
  padding-top: 100px;
  &__container {
    margin-bottom: 94px;
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
    // padding-bottom: 40px;
  }
  &__invitation {
    padding-bottom: 120px;
  }

  //MEDIA QUERIES
  @include media-query-l {
    &__container {
      margin-bottom: 100px;
    }
    &__invitation {
      padding-bottom: 82px;
    }
  }
}
</style>
