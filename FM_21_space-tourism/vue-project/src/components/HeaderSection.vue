<script setup>
import { ref } from 'vue'
import HeaderNav from '@/components/HeaderNav.vue'

const navOpen = ref('')

const openNav = () => {
  navOpen.value = 'translateX(0)'
}

const updateNavOpen = (newTransform) => {
  navOpen.value = newTransform
}
</script>

<template>
  <header class="header container">
    <div class="header__wrapper">
      <router-link to="/" class="header__logo-link" tabindex="0">
        <img class="header__logo" src="@/assets/images/shared/logo.svg" alt="Space tourism logo" />
      </router-link>
      <button @click="openNav()" class="header__burger" aria-label="open mobile menu"></button>
    </div>
    <HeaderNav :navOpen="navOpen" @updateNavOpen="updateNavOpen" />
  </header>
</template>

<style scope>
.header {
  position: relative;
  padding-left: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform ease-in-out 0.5s;
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
.header__logo-link:focus {
  display: block;
  width: 100%;
  box-shadow: 0 0 0 4px var(--gray);
  border-radius: 50%;
  transition: box-shadow ease-in-out 0.3s;
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
  .header__wrapper {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
  .header__burger {
    display: block;
    width: 25px;
    height: 22px;
    background: url('../assets/images/shared/icon-hamburger.svg') no-repeat;
  }
}

@media (max-width: 580px) {
  .header__logo {
    width: 40px;
  }
}
</style>
