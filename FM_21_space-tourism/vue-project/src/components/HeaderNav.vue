<script setup>
const emit = defineEmits('')

const props = defineProps({
  navOpen: {
    type: String,
    default: 'translateX(0%)',
  },
})

const closeNav = () => {
  emit('updateNavOpen', 'translateX(100%)')
}
</script>

<template>
  <nav class="header__nav" :style="{ transform: navOpen }">
    <button
      @click="closeNav()"
      class="header__burger-close"
      aria-label="close mobile menu"
    ></button>
    <ul class="header__nav-list">
      <li
        class="text-3 nav-item header__nav-item"
        :class="{ 'header__nav-item_active': $route.path === '/' }"
      >
        <router-link class="link" to="/"
          ><span class="header__nav-item-number">00</span>Home</router-link
        >
      </li>
      <li
        class="text-3 nav-item header__nav-item"
        :class="{ 'header__nav-item_active': $route.path === '/destination' }"
      >
        <router-link class="link" to="/destination"
          ><span class="header__nav-item-number">01</span>Destination</router-link
        >
      </li>
      <li
        class="text-3 nav-item header__nav-item"
        :class="{ 'header__nav-item_active': $route.path === '/crew' }"
      >
        <router-link class="link" to="/crew"
          ><span class="header__nav-item-number">02</span>Crew</router-link
        >
      </li>
      <li
        class="text-3 nav-item header__nav-item"
        :class="{ 'header__nav-item_active': $route.path === '/technology' }"
      >
        <router-link class="link" to="/technology"
          ><span class="header__nav-item-number">03</span>Technology</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<style scope>
.header__nav {
  display: flex;
  width: 736px;
  padding-top: 39px;
  padding-bottom: 39px;
  justify-content: flex-end;
  background-color: var(--color-white5);
  backdrop-filter: blur(80px);
}
.header__nav-list {
  display: flex;
  padding-right: 64px;
  gap: 70px 49px;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.header__nav-item {
  color: var(--color-white);
}
.header__nav-item::after {
  bottom: -39px;
}
.header__nav-item_active::after {
  opacity: 1;
  background-color: var(--color-white);
}
.nav-item:hover::after {
  opacity: 1;
}
.header__nav-item-number {
  margin-right: 9px;
  font-weight: bold;
}
.header__burger-close {
  display: none;
}

@media (max-width: 1200px) {
  .header__nav {
    width: 640px;
  }
  .header__nav-list {
    padding-right: 39px;
  }
}

@media (max-width: 767px) {
  .header__nav {
    display: flex;
    position: fixed;
    z-index: 10;
    transform: translateX(100%);
    width: 250px;
    height: 100vh;
    padding: 0 28px;
    padding-top: 32px;
    gap: 64px;
    right: 0;
    top: 0;
    flex-direction: column;
    justify-content: flex-start;
    backdrop-filter: blur(30px);
    transition: transform ease 1s;
  }
  .header__nav-list {
    padding-right: 0;
    gap: 35px;
    flex-direction: column;
    justify-content: flex-start;
  }
  .header__nav-item::after {
    width: 3px;
    height: 115%;
    top: -3px;
    right: -28px;
    left: initial;
  }
  .header__burger-close {
    display: block;
    padding: 20px 0;
    width: 20px;
    height: 21px;
    align-self: flex-end;
    background: url('../assets/images/shared/icon-close.svg') no-repeat;
  }
}
</style>
