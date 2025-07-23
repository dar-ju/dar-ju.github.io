<script setup lang="ts">
import { useModalStore } from '@/stores/modals'
import { watch } from 'vue'

const modal = useModalStore()

watch(
  () => modal.moodLevel,
  () => {
    if (modal.moodLevel && modal.isWarnVisible) modal.isWarnVisible = false
  },
)

const moodList = [
  {
    id: 1,
    title: 'Very Happy',
    value: 2,
    img: '/assets/images/icon-very-happy-color.svg',
  },
  { id: 2, value: 1, title: 'Happy', img: '/assets/images/icon-happy-color.svg' },
  { id: 3, value: 0, title: 'Neutral', img: '/assets/images/icon-neutral-color.svg' },
  { id: 4, value: -1, title: 'Sad', img: '/assets/images/icon-sad-color.svg' },
  { id: 5, value: -2, title: 'Very Sad', img: '/assets/images/icon-very-sad-color.svg' },
]
</script>

<template>
  <div v-if="modal.currentLogStage === 1" class="log__mood-wrapper">
    <h2 class="title log__mood-title">How was your mood today?</h2>
    <ul class="log__mood-list">
      <li v-for="item in moodList" :key="item.id">
        <label
          class="log__mood-block"
          :class="{ 'log__mood-block--selected': modal.moodLevel === item.value }"
          :for="item.title"
        >
          <div class="form-check log__mood">
            <input
              class="form-check-input log__mood-input"
              type="radio"
              name="mood"
              :id="item.title"
              :value="item.value"
              v-model="modal.moodLevel"
            />
            <span class="form-check-label log__mood-label">{{ item.title }}</span>
          </div>
          <img class="log__img" :src="item.img" alt="" width="38" height="38" />
        </label>
      </li>
    </ul>
    <Transition name="fade">
      <div v-if="modal.isWarnVisible" class="invalid">
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
        <span>Please select a mood before continuing.</span>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;

.log {
  &__mood-title {
    margin-bottom: 32px;
    @include text-preset(preset3);
    color: var(--neutral-900);
  }
  &__mood-list {
    display: flex;
    margin-bottom: 32px;
    gap: 12px;
    flex-direction: column;
  }
  &__mood-block {
    display: flex;
    margin: 0;
    padding: 12px 20px;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    border: 2px solid var(--blue-100);
    background-color: var(--neutral-0);
    cursor: pointer;
    &--selected {
      border: 2px solid var(--blue-600);
    }
  }
  &__mood {
    padding-left: 32px;
  }
  &__mood-input {
    width: 20px;
    height: 20px;
    margin-left: -32px;
    &:focus + label {
      border: 1px solid var(--blue-600);
    }
  }
  &__mood-label {
    line-height: 1.778rem;
    @include text-preset(preset5);
    color: var(--neutral-900);
  }

  /* Media */
  @include media-query-sm {
    &__mood-title {
      margin-bottom: 24px;
      @include text-preset(preset3mob);
    }
    &__mood-list {
      margin-bottom: 24px;
    }
  }
}
</style>
