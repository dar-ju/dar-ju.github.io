<script setup>
import ProductFullSection from '@/components/sections/ProductFullSection.vue'
import AlsoLikeSection from '@/components/sections/AlsoLikeSection.vue'
import CategoriesSection from '@/components/sections/CategoriesSection.vue'
import InvitationSection from '@/components/sections/InvitationSection.vue'
</script>

<template>
  <main>
    <div class="main-wrapper">
      <div class="product">
        <ProductFullSection />
        <AlsoLikeSection />
        <CategoriesSection />
        <InvitationSection class="product__invitation" />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/breakpoints';
.product {
  &__invitation {
    padding-bottom: 115px;
  }

  // MEDIA QUERIES
  @include media-query-l {
    &__invitation {
      padding-bottom: 85px;
    }
  }
}
</style>
