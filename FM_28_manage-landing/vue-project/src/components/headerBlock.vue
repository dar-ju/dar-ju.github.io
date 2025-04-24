<script setup>
import { ref } from 'vue'

const isMobileMenuOpened = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpened.value = !isMobileMenuOpened.value
}

const navItems = [
  { label: 'Pricing', href: '#' },
  { label: 'Product', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Community', href: '#' },
]
</script>

<template>
  <header class="section header">
    <div class="container header__container">
      <a class="header__logo" href="#"><img src="/assets/images/logo.svg" alt="Manage logo" /></a>
      <nav class="header__nav-wrapper header__desktop-nav">
        <ul class="header__nav-list">
          <li v-for="item in navItems" :key="item.label" class="header__nav-item">
            <a :href="item.href">{{ item.label }}</a>
          </li>
        </ul>
      </nav>
      <Transition name="fade">
        <div class="header__overlay" v-show="isMobileMenuOpened">
          <nav class="header__nav-wrapper header__mobile-nav">
            <ul class="header__nav-list">
              <li v-for="item in navItems" :key="item.label" class="header__nav-item">
                <a :href="item.href" @click="toggleMobileMenu">{{ item.label }}</a>
              </li>
            </ul>
          </nav>
          <button
            class="header__burger-close"
            @click="toggleMobileMenu()"
            v-show="isMobileMenuOpened"
          >
            <img src="/assets/images/icon-close.svg" alt="" />
          </button>
        </div>
      </Transition>
      <Button class="main-btn header__btn" label="Get Started" />
      <button class="header__burger" @click="toggleMobileMenu()" v-show="!isMobileMenuOpened">
        <img src="/assets/images/icon-hamburger.svg" alt="" />
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding-top: 56px;
  padding-bottom: 56px;
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
  }
  &__logo {
    min-width: 146px;
    height: 11px;
    align-self: center;
  }
  &__overlay {
    display: none;
  }
  &__nav-list {
    display: flex;
    flex-wrap: wrap;
    margin-right: 10px;
    gap: 15px 33px;
  }
  &__nav-item {
    font-size: 0.68rem;
    font-weight: 500;
    color: var(--dark-blue);
    transition:
      color ease-in-out 0.3s,
      outline ease-in-out 0.3s;
    &:hover {
      color: var(--dark-grayish-blue);
    }
    & a:focus-visible {
      outline: 1px solid var(--bright-red-light);
      outline-offset: 2px;
    }
  }
  &__burger {
    display: none;
  }
}

@media (max-width: 1024px) {
  .header {
    &__container {
      padding-right: 40px;
      padding-left: 40px;
      gap: 60px;
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding-top: 41px;
    padding-bottom: 41px;
    &__container {
      min-height: 18px;
      padding-right: 24px;
      padding-left: 24px;
    }
    &__logo {
      min-width: initial;
      max-width: 110px;
    }
    &__btn {
      display: none;
    }
    &__burger {
      display: block;
    }
    &__burger-close {
      position: absolute;
      right: 26px;
      top: 39px;
      z-index: 1;
    }
    &__overlay {
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 1;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
    }
    &__nav-wrapper {
      padding: 103px 0;
    }
    &__desktop-nav {
      display: none;
    }
    &__overlay {
      display: block;
    }
    &__nav-list {
      max-width: 325px;
      margin: auto;
      padding: 46px;
      gap: 29px;
      background-color: white;
      align-items: center;
      flex-direction: column;
    }
    &__nav-item {
      font-size: 0.84rem;
    }
  }
}
</style>
