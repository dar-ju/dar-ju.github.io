<script setup lang="ts">
import ProfilePopover from '@/components/modals/profile/ProfilePopover.vue'
import { useUserStore } from '@/stores/userStore'
import { computed, ref } from 'vue'

const userStore = useUserStore()

const isPopoverVisible = ref(false)

const popoverToggle = () => {
  isPopoverVisible.value = !isPopoverVisible.value
}

const closePopover = () => {
  isPopoverVisible.value = true
}

const userImgSrc = computed(() => {
  return userStore.user?.img || import.meta.env.BASE_URL + 'assets/images/avatar-placeholder.svg'
})
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
      <div
        @click="popoverToggle()"
        class="header__user"
        tabindex="0"
        @keydown.space.prevent="popoverToggle()"
        @keydown.enter.prevent="popoverToggle()"
        aria-haspopup="dialog"
      >
        <img class="header__user-img" :src="userImgSrc" alt="" width="40" height="40" />
        <img
          class="header__dropdown"
          src="/assets/images/icon-dropdown-arrow.svg"
          alt=""
          width="10"
          height="6"
        />
        <Transition name="fade">
          <div v-if="isPopoverVisible" class="header__popover-wrapper">
            <div class="header__popover-overlay" @click.stop="closePopover" />
            <ProfilePopover v-if="isPopoverVisible" :onClose="closePopover" />
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
.header {
  padding-top: 40px;
  padding-bottom: 40px;
  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__user {
    position: relative;
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    &:focus-visible {
      outline: 1px solid var(--neutral-600);
      outline-style: auto;
      outline-offset: 2px;
    }
  }
  &__user-img {
    border-radius: 50%;
  }
  &__popover-wrapper {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    z-index: 100;
  }
  &__popover-overlay {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: transparent;
  }

  /* Media */
  @include media-query-sm {
    padding-top: 32px;
    padding-bottom: 24px;
  }
}
</style>
