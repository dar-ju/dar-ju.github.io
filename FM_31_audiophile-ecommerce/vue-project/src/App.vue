<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CartModal from '@/components/modals/CartModal.vue'
</script>

<template>
  <AppHeader />
  <RouterView />
  <CartModal />
  <AppFooter />
</template>

<style lang="scss" scoped></style>
