<script setup lang="ts">
import { useModalStore } from '@/stores/modals'
import LogStage1 from '@/components/modals/moodlog/LogStage1.vue'
import LogStage2 from '@/components/modals/moodlog/LogStage2.vue'
import LogStage3 from '@/components/modals/moodlog/LogStage3.vue'
import LogStage4 from '@/components/modals/moodlog/LogStage4.vue'
import { computed, ref } from 'vue'

const modal = useModalStore()

const spinnerLoading = ref(false)

const isLast = computed(() => modal.currentLogStage === 4)

const next = () => {
  if (modal.currentLogStage === 1 && modal.moodData.mood === null) {
    modal.isWarnVisible = true
    return
  }
  if (modal.currentLogStage === 2 && modal.moodData.feelings.length > 3) {
    modal.isWarnVisible = true
    return
  }
  if (modal.currentLogStage === 3 && modal.moodData.journalEntry.length === 0) {
    modal.isWarnVisible = true
    return
  }
  modal.currentLogStage = modal.currentLogStage += 1
  modal.isWarnVisible = false
}
const handleSubmit = () => {
  spinnerLoading.value = true
  console.log(modal.moodData)
  //// добавить сохранение данных
  spinnerLoading.value = false
  modal.isLogModalActive = false
  modal.currentLogStage = 1
}

const handleNavigate = (level: number) => {
  if (level < modal.currentLogStage) modal.currentLogStage = level
  modal.isWarnVisible = false
}
</script>

<template>
  <Transition name="fade">
    <div class="overlay" v-if="modal.isLogModalActive">
      <form @submit.prevent="isLast ? handleSubmit() : next()" class="log__form">
        <button @click="modal.isLogModalActive = false" class="log__close-btn">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.72656 7.47656L14.7891 12.5391C15.0703 12.8203 15.0703 13.3359 14.7891 13.6172L13.6172 14.7891C13.3359 15.0703 12.8203 15.0703 12.5391 14.7891L7.52344 9.72656L2.46094 14.7891C2.17969 15.0703 1.66406 15.0703 1.38281 14.7891L0.210938 13.6172C-0.0703125 13.3359 -0.0703125 12.8203 0.210938 12.5391L5.27344 7.47656L0.210938 2.46094C-0.0703125 2.17969 -0.0703125 1.66406 0.210938 1.38281L1.38281 0.210938C1.66406 -0.0703125 2.17969 -0.0703125 2.46094 0.210938L7.52344 5.27344L12.5391 0.210938C12.8203 -0.0703125 13.3359 -0.0703125 13.6172 0.210938L14.7891 1.38281C15.0703 1.66406 15.0703 2.17969 14.7891 2.46094L9.72656 7.47656Z"
              fill="#9393B7"
            />
          </svg>
        </button>
        <h1 class="title log__title">Log your mood</h1>
        <ul class="log__stage">
          <li
            v-for="item in 4"
            :key="item"
            class="log__stage-item"
            :class="{ 'log__stage-item_selected': item <= modal.currentLogStage }"
            @click="handleNavigate(item)"
          ></li>
        </ul>
        <LogStage1 />
        <LogStage2 />
        <LogStage3 />
        <LogStage4 />
        <button type="submit" class="btn btn-primary log__btn">
          {{ isLast ? 'Submit' : 'Continue' }}
          <div
            v-if="spinnerLoading"
            class="spinner-border spinner-border-sm ms-auto"
            role="status"
            aria-hidden="true"
          ></div>
        </button>
      </form>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;

.log {
  &__form {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 30px;
    background-color: var(--neutral-0);
    border-radius: 16px;
    box-shadow: 0px 8px 16px 0px var(--shadow);
    background: linear-gradient(180deg, rgba(250, 250, 255, 1) 73%, rgba(224, 224, 255, 1) 100%);
  }
  &__title {
    margin-bottom: 32px;
    @include text-preset(preset2);
    color: var(--neutral-900);
  }
  &__stage {
    display: flex;
    margin-bottom: 32px;
    gap: 16px;
  }
  &__stage-item {
    width: 100%;
    border: 3px solid var(--blue-200);
    border-radius: 10px;
    &_selected {
      border-color: var(--blue-600);
      cursor: pointer;
    }
  }

  &__close-btn {
    display: block;
    margin-left: auto;
    margin-bottom: 3px;
    line-height: 0;
  }
  &__btn {
    width: 100%;
    padding: 16px;
    border-radius: 10px;
    @include text-preset(preset4);
  }

  /* Media */
  @include media-query-sm {
    &__form {
      padding: 20px;
      padding-bottom: 32px;
    }
    &__title {
      margin-bottom: 24px;
      @include text-preset(preset3);
    }
    &__stage {
      margin-bottom: 24px;
    }
  }
}
</style>
