<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'

const modalStore = useModalStore()

const TEXTLIMIT = 150
</script>

<template>
  <div v-if="modalStore.currentLogStage === 3" class="log__about-wrapper">
    <h2 class="title log__about-title">Write about your day...</h2>
    <div class="log__about-block">
      <textarea
        class="form-control log__about-textarea"
        placeholder="Today, I felt…"
        id="journalEntry"
        :maxlength="TEXTLIMIT"
        v-model="modalStore.moodData.journalEntry"
      ></textarea>
      <span class="log__about-limit">{{
        `${modalStore.moodData.journalEntry.length} / ${TEXTLIMIT}`
      }}</span>
    </div>
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
        <span>Please write a few words about your day before continuing.</span>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;

.log {
  &__about-wrapper {
    margin-bottom: 32px;
  }
  &__about-title {
    margin-bottom: 32px;
    @include text-preset(preset3);
    color: var(--neutral-900);
  }
  &__about-block {
    display: flex;
    gap: 8px;
    flex-direction: column;
  }
  &__about-textarea {
    height: 150px;
    padding: 12px 16px;
    border: 1px solid var(--neutral-300);
    border-radius: 10px;
    &::placeholder {
      @include text-preset(preset6it);
      font-style: italic;
    }
  }
  &__about-limit {
    @include text-preset(preset8);
    align-self: flex-end;
  }

  /* Media */
  @include media-query-sm {
    &__about-wrapper {
      margin-bottom: 24px;
    }
    &__about-title {
      margin-bottom: 24px;
      @include text-preset(preset3mob);
    }
  }
}
</style>
