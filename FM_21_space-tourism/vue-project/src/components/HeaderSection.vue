<script setup>
import HeaderNav from '@/components/HeaderNav.vue'
</script>

<template>
  <div class="header container">
    <div class="header__wrapper">
      <router-link to="/">
        <img class="header__logo" src="@/assets/images/shared/logo.svg" alt="Space tourism logo" />
      </router-link>
      <img class="header__burger" src="@/assets/images/shared/icon-hamburger.svg" alt="" />
    </div>
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
.header__burger {
  display: none;
}

@media (max-width: 1200px) {
  .header {
    padding-left: 40px;
  }
  .header::after {
    display: none;
  }
}

@media (max-width: 767px) {
  .header {
    padding: 24px;
  }
}

@media (max-width: 580px) {
  .header__wrapper {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
  .header__logo {
    width: 40px;
  }
  .header__burger {
    display: block;
    width: 25px;
    height: 22px;
    cursor: pointer;
  }
}
</style>
