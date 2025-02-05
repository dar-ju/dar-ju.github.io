<script setup>
import HeaderNav from '@/components/HeaderNav.vue'
</script>

<template>
  <div class="header container">
    <img class="header__logo" src="@/assets/images/shared/logo.svg" alt="Space tourism logo" />
    <HeaderNav />
  </div>
</template>

<style scope>
.header {
  position: relative;
  padding-left: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header::after {
  content: '';
  position: absolute;
  width: 39%;
  height: 1px;
  left: 12%;
  background-color: var(--gray25);
}

@media (max-width: 1200px) {
  .header {
    padding-left: 40px;
  }
  .header::after {
    display: none;
  }
}
</style>
