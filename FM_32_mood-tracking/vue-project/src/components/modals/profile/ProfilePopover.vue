<script setup lang="ts">
import { useModalStore } from '@/stores/modals'

const props = defineProps<{ onClose: () => void }>()

const modal = useModalStore()

const handleClick = () => {
  props.onClose()
  modal.isSettingsModalActive = true
}
</script>

<template>
  <div class="popover-wrapper">
    <div class="profile-popover__overlay" @click="onClose" />
    <div class="profile-popover">
      <p class="profile-popover__name">Lisa Maria</p>
      <p class="profile-popover__email">lisa@mail.com</p>
      <div class="profile-popover__link-block">
        <div @click="handleClick" class="profile-popover__link">
          <img
            class="profile-popover__link-img"
            src="/assets/images/icon-settings.svg"
            alt=""
            width="16"
            height="16"
          />
          <span
            class="profile-popover__link-text"
            tabindex="0"
            @keydown.space.prevent="handleClick"
            @keydown.enter.prevent="handleClick"
            >Settings</span
          >
        </div>
        <div class="profile-popover__link">
          <img
            class="profile-popover__link-img"
            src="/assets/images/icon-logout.svg"
            alt=""
            width="16"
            height="16"
          />
          <span class="profile-popover__link-text" tabindex="0">Logout</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;
.profile-popover {
  position: absolute;
  width: 200px;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: var(--neutral-0);
  box-shadow: 0px 8px 16px 0px var(--shadow);
  top: 100px;
  right: var(--containerPadding);

  // position: absolute; // это важно!
  // top: 60px;
  // right: 0;
  z-index: 1000;
  // width: 200px;
  // padding: 12px 16px;
  // background: white;
  // border-radius: 8px;
  // box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  &__name {
    margin-bottom: 2px;
    color: var(--neutral-900);
    @include text-preset(preset6);
  }
  &__email {
    margin-bottom: 12px;
    padding-bottom: 12px;
    color: var(--neutral-300);
    @include text-preset(preset7);
    border-bottom: 1px solid var(--blue-100);
  }
  &__link-block {
    display: flex;
    gap: 12px;
    flex-direction: column;
  }
  &__link {
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
  }
  &__link-text {
    color: var(--neutral-900);
    @include text-preset(preset7);
    &:focus-visible {
      outline: 1px solid var(--neutral-600);
      outline-style: auto;
      outline-offset: 3px;
    }
  }
  &__overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
    background: transparent;
  }

  /* Media */
  @include media-query-sm {
    width: 100%;
    max-width: 343px;
  }
}
</style>
