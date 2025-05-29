<script setup>
import CategoryCard from '@/components/sections/CategoryCard.vue'
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()

onMounted(async () => {
  await categoryStore.getCategoriesData()
})
</script>

<template>
  <section class="section categories">
    <div class="container">
      <ul class="categories__list">
        <CategoryCard
          v-for="category in categoryStore.categories"
          :key="category.id"
          :category="category"
        />
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
.categories {
  padding-top: 160px;
  padding-bottom: 60px;
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 80px var(--catBlocksGap);
  }

  //MEDIA QUERIES
  @include media-query-l {
    padding-top: 107px;
    // padding-bottom: 50px;
  }

  @include media-query-md {
    &__list {
      max-width: 80%;
      margin: 0 auto;
    }
  }

  @include media-query-sm {
    padding-top: 93px;
    &__list {
      max-width: 100%;
      gap: 68px var(--catBlocksGap);
    }
  }
}
</style>
