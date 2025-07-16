<script setup lang="ts">
import ProfilePopover from '@/components/modals/ProfilePopover.vue'
import { ref } from 'vue'

const isPopoverVisible = ref(false)

const popoverToggle = () => {
  isPopoverVisible.value = !isPopoverVisible.value
}

const closePopover = () => {
  isPopoverVisible.value = false
}
</script>

<template>
  <header class="section header">
    <div class="container header__container">
      <img
        class="header__logo"
        src="/assets/images/logo.svg"
        alt="Mood app logo"
        width="178"
        height="40"
      />
      <div @click="popoverToggle()" class="header__user">
        <img
          class="header__user-img"
          src="/assets/images/avatar-lisa.jpg"
          alt=""
          width="40"
          height="40"
        />
        <img
          class="header__dropdown"
          src="/assets/images/icon-dropdown-arrow.svg"
          alt=""
          width="10"
          height="6"
        />
        <Teleport to="body">
          <Transition name="fade" mode="out-in">
            <ProfilePopover v-if="isPopoverVisible" :onClose="closePopover" />
          </Transition>
        </Teleport>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding-top: 40px;
  padding-bottom: 40px;
  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__user {
    // position: relative;
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
  }
  &__user-img {
    border-radius: 50%;
  }
  &__dropdown {
  }
}
</style>
