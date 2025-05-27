<script setup>
import ProductFullSection from '@/components/sections/ProductFullSection.vue'
import AlsoLikeSection from '@/components/sections/AlsoLikeSection.vue'
import CategoriesSection from '@/components/sections/CategoriesSection.vue'
import InvitationSection from '@/components/sections/InvitationSection.vue'
</script>

<template>
  <main>
    <div class="main-wrapper">
      <div class="product-wrapper">
        <ProductFullSection />
        <AlsoLikeSection />
        <CategoriesSection />
        <InvitationSection class="product-wrapper__invitation" />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
.main-wrapper {
  padding-bottom: 0;
  @include media-query-l {
    padding-bottom: 61px;
  }
}
.product-wrapper {
  &__invitation {
    // padding-bottom: 115px;
  }

  // MEDIA QUERIES
  @include media-query-l {
    &__invitation {
      // padding-bottom: 85px;
    }
  }

  @include media-query-sm {
    &__invitation {
      // padding-top: 70px;
      padding-bottom: 60px;
    }
  }
}
</style>
