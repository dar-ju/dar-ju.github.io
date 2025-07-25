<script setup lang="ts">
import { ref } from 'vue'
import { useFileCheck } from '@/composables/useFileCheck.ts'
import { uploadToCloudinary } from '@/composables/useImageUpload.ts'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const spinnerLoading = ref(false)
const correctFile = ref(true)
const previewImg = ref<string | null>(null)
const uploadedFile = ref<File | null>(null)

// form check
const form = ref<HTMLFormElement | null>(null)
const handleSubmit = async (event: Event) => {
  const currentForm = form.value
  if (!currentForm) return
  if (!currentForm.checkValidity() || !correctFile.value) {
    event.preventDefault()
    event.stopPropagation()
  } else {
    const formData = new FormData(currentForm)
    const username = formData.get('name')?.toString() || ''
    const file = formData.get('file') as File

    userStore.registerData.username = username
    if (username) {
      spinnerLoading.value = true
      if (file.name) {
        const imgUrl = await uploadToCloudinary(file)
        if (imgUrl) {
          userStore.registerData.img = imgUrl
        }
      }
      await userStore.registerUser(userStore.registerData)
      spinnerLoading.value = false
    }
  }
  currentForm.classList.add('was-validated')
}

// file check
const handleFile = (e: Event) => {
  correctFile.value = useFileCheck(e)
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (correctFile.value && file) {
    if (previewImg.value) {
      URL.revokeObjectURL(previewImg.value)
    }
    previewImg.value = URL.createObjectURL(file)
    uploadedFile.value = file
  }
}
</script>

<template>
  <div class="personal__wrapper">
    <h1 class="title personal__title">Personalize your experience</h1>
    <p class="personal__descr">Add your name and a profile picture to make Mood yours.</p>
    <form class="personal__form" ref="form" novalidate @submit.prevent="handleSubmit">
      <div class="personal__name-wrapper">
        <label for="name" class="form-label personal__name-label">Name</label>
        <input
          type="text"
          class="form-control personal__input"
          id="name"
          name="name"
          placeholder="Jane Appleseed"
          required
          maxlength="100"
        />
        <div class="invalid-feedback">Please enter your name</div>
      </div>
      <div class="personal__img-wrapper">
        <img
          class="personal__img"
          :src="previewImg || '/assets/images/avatar-placeholder.svg'"
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
              name="file"
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
              <div class="invalid invalid-auth">
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
      <button type="submit" class="btn btn-primary personal__btn">
        Start Tracking
        <div
          v-if="spinnerLoading"
          class="spinner-border spinner-border-sm ms-auto"
          role="status"
          aria-hidden="true"
        ></div>
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/_typography' as *;
.personal {
  &__wrapper {
    width: 100%;
    max-width: 530px;
    padding: 40px 32px;
    background-color: var(--neutral-0);
    border-radius: 16px;
    box-shadow: 0px 8px 16px 0px var(--shadow);
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
  &__img {
    width: 64px;
    height: 64px;
    overflow: hidden;
    border-radius: 50%;
    object-fit: cover;
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
}
</style>
