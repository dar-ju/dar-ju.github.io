<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// form check
const form = ref<HTMLFormElement | null>(null)
const handleSubmit = (event: Event) => {
  const currentForm = form.value
  if (!currentForm) return
  if (!currentForm.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  } else router.push('/dashboard')
  currentForm.classList.add('was-validated')
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
            <input type="file" id="file" style="display: none" />
            <label class="btn btn-secondary personal__upload-btn-label" for="file">Upload</label>
            <div class="invalid-feedback">Example invalid form file feedback</div>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary personal__btn">Start Tracking</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;
.personal {
  &__wrapper {
    width: 100%;
    max-width: 530px;
    padding: 40px 32px;
    background-color: var(--white);
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
    max-width: 91px;
    cursor: pointer;
  }
  &__upload-btn-label {
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
