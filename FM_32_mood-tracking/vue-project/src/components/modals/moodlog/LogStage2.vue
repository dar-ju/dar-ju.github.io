<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'

const modalStore = useModalStore()

const feeliings = [
  'Joyful',
  'Down',
  'Anxious',
  'Calm',
  'Excited',
  'Frustrated',
  'Lonely',
  'Grateful',
  'Overwhelmed',
  'Motivated',
  'Irritable',
  'Peaceful',
  'Tired',
  'Hopeful',
  'Confident',
  'Stressed',
  'Content',
  'Disappointed',
  'Optimistic',
  'Restless',
]
</script>

<template>
  <div v-if="modalStore.currentLogStage === 2" class="log__feel-wrapper">
    <h2 class="title log__feel-title">How did you feel?</h2>
    <p class="log__feel-descr">Select up to three tags:</p>
    <ul class="list-group log__feel-list">
      <li
        v-for="item in feeliings"
        :key="item"
        class="list-group-item log__feel-item"
        :class="{ 'log__feel-item--checked': modalStore.moodData.feelings.includes(item) }"
      >
        <label class="log__feel-item-block" :for="item">
          <input
            class="form-check-input me-1 log__feel-check"
            type="checkbox"
            :value="item"
            :id="item"
            v-model="modalStore.moodData.feelings"
            :disabled="
              modalStore.moodData.feelings.length >= 3 &&
              !modalStore.moodData.feelings.includes(item)
            "
          />
          <span
            class="log__feel-text"
            :class="{
              'log__feel-text--disabled':
                modalStore.moodData.feelings.length >= 3 &&
                !modalStore.moodData.feelings.includes(item),
            }"
            >{{ item }}</span
          >
        </label>
      </li>
    </ul>
    <Transition name="fade">
      <div v-if="modalStore.isWarnVisible" class="invalid">
        <svg
          width="12"
          height="13"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.8125 0.6875C9 0.6875 11.625 3.3125 11.625 6.5C11.625 9.71094 9 12.3125 5.8125 12.3125C2.60156 12.3125 0 9.71094 0 6.5C0 3.3125 2.60156 0.6875 5.8125 0.6875ZM5.8125 3.26562C5.25 3.26562 4.82812 3.71094 4.82812 4.25C4.82812 4.8125 5.25 5.23438 5.8125 5.23438C6.35156 5.23438 6.79688 4.8125 6.79688 4.25C6.79688 3.71094 6.35156 3.26562 5.8125 3.26562ZM7.125 9.21875V8.65625C7.125 8.51562 6.98438 8.375 6.84375 8.375H6.5625V6.03125C6.5625 5.89062 6.42188 5.75 6.28125 5.75H4.78125C4.61719 5.75 4.5 5.89062 4.5 6.03125V6.59375C4.5 6.75781 4.61719 6.875 4.78125 6.875H5.0625V8.375H4.78125C4.61719 8.375 4.5 8.51562 4.5 8.65625V9.21875C4.5 9.38281 4.61719 9.5 4.78125 9.5H6.84375C6.98438 9.5 7.125 9.38281 7.125 9.21875Z"
            fill="#E60013"
          />
        </svg>
        <span>You can only select a maximum of 3 tags.</span>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;

.log {
  &__feel-wrapper {
    margin-bottom: 32px;
  }
  &__feel-title {
    margin-bottom: 6px;
    @include text-preset(preset3);
    color: var(--neutral-900);
  }
  &__feel-descr {
    margin-bottom: 32px;
    @include text-preset(preset6);
  }
  &__feel-list {
    margin-bottom: 32px;
    gap: 12px 16px;
    flex-direction: row;
    flex-wrap: wrap;
  }
  &__feel-item {
    height: 49px;
    margin: 0;
    padding: 0;
    border-radius: 10px;
    border: 2px solid var(--blue-100);
    &--checked {
      border: 2px solid var(--blue-600);
    }
  }
  &__feel-item-block {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 12px 16px;
    gap: 8px;
    align-items: center;
    cursor: pointer;
  }
  &__feel-check {
    position: initial;
    width: 16px;
    height: 16px;
    margin: 0;
  }
  &__feel-text {
    margin-bottom: 0;
    @include text-preset(preset6reg);
    color: var(--neutral-900);
    &--disabled {
      color: var(--neutral-300);
    }
  }

  /* Media */
  @include media-query-sm {
    &__feel-title {
      @include text-preset(preset3mob);
    }
    &__feel-descr {
      margin-bottom: 24px;
    }
    &__feel-list {
      margin-bottom: 24px;
    }
  }
}
</style>
