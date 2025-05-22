<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import CartModal from '@/components/modals/CartModal.vue'
import OrderedModal from '@/components/modals/OrderedModal.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <AppHeader />
  <RouterView />
  <CartModal />
  <OrderedModal />
  <AppFooter />
</template>

<style lang="scss" scoped></style>
