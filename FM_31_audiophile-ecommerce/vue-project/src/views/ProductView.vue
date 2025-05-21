<script setup>
import ProductFullSection from '@/components/sections/ProductFullSection.vue'
import AlsoLikeSection from '@/components/sections/AlsoLikeSection.vue'
import CategoriesSection from '@/components/sections/CategoriesSection.vue'
import InvitationSection from '@/components/sections/InvitationSection.vue'
</script>

<template>
  <main>
    <div class="main-wrapper">
      <div>
        <ProductFullSection />
        <AlsoLikeSection />
        <CategoriesSection />
        <InvitationSection />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
