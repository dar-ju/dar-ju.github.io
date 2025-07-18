<script setup lang="ts">
import { ref } from 'vue'
import { useFileCheck } from '@/composables/useFileCheck.ts'
import { useModalStore } from '@/stores/modals'

const modal = useModalStore()

const correctFile = ref(true)

// form check
const form = ref<HTMLFormElement | null>(null)
const handleSubmit = (event: Event) => {
  const currentForm = form.value
  if (!currentForm) return
  if (!currentForm.checkValidity() || !correctFile.value) {
    event.preventDefault()
    event.stopPropagation()
  } else {
    //// дописать сохранение данных
    //// дописать подстановку данных в форму
    modal.isSettingsModalActive = false
  }
  currentForm.classList.add('was-validated')
}

// file check
const handleFile = (e: Event) => {
  correctFile.value = useFileCheck(e)
}
</script>

<template>
  <Transition name="fade">
    <div class="overlay" v-if="modal.isSettingsModalActive">
      <div class="personal__wrapper">
        <div class="personal__child-wrapper">
          <h1 class="title personal__title">Update your profile</h1>
          <p class="personal__descr">Personalize your account with your name and photo.</p>
          <form class="personal__form" ref="form" novalidate @submit.prevent="handleSubmit">
            <div class="personal__name-wrapper">
              <label for="name" class="form-label personal__name-label">Name</label>
              <input
                type="text"
                class="form-control personal__input"
                id="name"
                placeholder="name@mail.com"
                required
                maxlength="100"
              />
              <div class="invalid-feedback">Please enter your name</div>
            </div>
            <div class="personal__img-wrapper">
              <img
                class="personal__img"
                src="/assets/images/avatar-placeholder.svg"
                alt=""
                width="64"
                height="64"
              />
              <div class="personal__upload-block">
                <span class="personal__upload-title">Upload Image</span>
                <span class="personal__upload-descr">Max 250KB, PNG or JPEG</span>
                <div class="personal__upload-btn">
                  <input
                    type="file"
                    id="file"
                    accept="image/png, image/jpeg"
                    @change="handleFile"
                    style="display: none"
                  />
                  <label
                    :class="[
                      'btn btn-secondary personal__upload-btn-label',
                      { 'is-invalid': !correctFile },
                    ]"
                    for="file"
                  >
                    Upload
                  </label>
                  <div v-if="!correctFile" class="invalid-feedback">
                    <div class="personal__invalid-wrapper">
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
                      <span>Unsupported file type. Please upload a PNG or JPEG</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary personal__btn">Save changes</button>
          </form>
          <button @click="modal.isSettingsModalActive = false" class="personal__close-btn">
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
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;
.personal {
  &__wrapper {
    width: 100%;
    max-width: 530px;
    margin: 0 auto;
    padding: 40px 32px;
    background-color: var(--neutral-0);
    border-radius: 16px;
    box-shadow: 0px 8px 16px 0px var(--shadow);
  }
  &__child-wrapper {
    position: relative;
  }
  &__title {
    @include text-preset(preset3);
    color: var(--neutral-900);
    margin-bottom: 8px;
  }
  &__descr {
    @include text-preset(preset6reg);
    margin-bottom: 32px;
  }
  &__input {
    border-radius: 10px;
    border-color: var(--neutral-300);
  }
  &__name-wrapper {
    margin-bottom: 24px;
  }
  &__name-label {
    @include text-preset(preset6reg);
  }
  &__img-wrapper {
    display: flex;
    margin-bottom: 32px;
    gap: 20px;
    align-items: flex-start;
  }
  &__upload-block {
    display: flex;
    gap: 6px;
    flex-direction: column;
  }
  &__upload-title {
    color: var(--neutral-900);
    @include text-preset(preset6reg);
  }
  &__upload-descr {
    margin-bottom: 8px;
    color: var(--neutral-600);
    @include text-preset(preset7);
  }
  &__upload-btn {
    cursor: pointer;
  }
  &__upload-btn-label {
    margin: 0;
    border-radius: 8px;
    border-color: var(--neutral-300);
    color: var(--neutral-900);
    @include text-preset(preset6);
  }
  &__btn {
    width: 100%;
    border-radius: 10px;
    @include text-preset(preset5);
  }
  &__close-btn {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 0;
  }
  &__invalid-wrapper {
    display: flex;
    padding-top: 6px;
    gap: 6px;
    @include text-preset(preset9);
  }

  /* Media */
  @include media-query-l {
    // --black-bckg: #191919;
    // --containerPadding: 40px;
    // --catBlocksGap: 10px;
  }
  @include media-query-md {
    // --black-bckg: #1a1a1a;
  }
  @include media-query-sm {
    // --containerPadding: 24px;
  }
}
</style>
