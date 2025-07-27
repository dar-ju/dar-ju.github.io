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
  isPopoverVisible.value = false
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

  /* Media */
  @include media-query-sm {
    padding-top: 32px;
    padding-bottom: 24px;
  }
}
</style>
