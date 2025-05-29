<script setup>
import { useSectionStore } from '@/stores/section'
import { onMounted } from 'vue'

const sectionStore = useSectionStore()

onMounted(async () => {
  await sectionStore.getInvitationData()
})
</script>

<template>
  <section class="invite">
    <div class="container invite__container">
      <div class="invite__wrapper">
        <h2 class="title invite__title">Bringing you the <span>best</span> audio gear</h2>
        <p class="invite__description">{{ sectionStore.invitation?.acf?.main_description }}</p>
      </div>
      <picture class="invite__img">
        <source
          media="(min-width:1024px)"
          srcset="/assets/images/invite-section/desktop/image-best-gear.jpg"
        />
        <source
          media="(min-width:768px)"
          srcset="/assets/images/invite-section/tablet/image-best-gear.jpg"
        />
        <img
          src="/assets/images/invite-section/mobile/image-best-gear.jpg"
          alt="customer in the audiophile store"
          width="540"
          height="588"
        />
      </picture>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
.invite {
  padding-top: 100px;
  padding-bottom: 160px;
  &__container {
    display: flex;
    max-width: 1600px;
    gap: 50px;
    align-items: center;
    justify-content: space-between;
  }
  &__wrapper {
    max-width: 440px;
  }
  &__title {
    margin-bottom: 30px;
    font-size: 2.667rem;
    line-height: 2.933rem;
    letter-spacing: 0.1rem;
    & span {
      color: var(--orange);
    }
  }
  &__description {
    color: var(--black50);
    line-height: 1.667rem;
  }
  &__img {
    aspect-ratio: 540 / 588;
    max-width: 540px;
    min-width: 350px;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
  }

  //MEDIA QUERIES
  @include media-query-l {
    padding-top: 60px;
    padding-bottom: 58px;
    &__container {
      gap: 63px;
      flex-direction: column;
      text-align: center;
    }
    &__img {
      aspect-ratio: 689 / 300;
      max-width: initial;
      & img {
        width: 100%;
      }
    }
    &__wrapper {
      max-width: 573px;
      order: 1;
    }
  }

  @include media-query-md {
    &__img {
      aspect-ratio: 327 / 300;
    }
  }

  @include media-query-sm {
    padding-bottom: 82px;
    &__container {
      gap: 41px;
    }
    &__img {
      min-width: initial;
    }
    &__title {
      font-size: 1.8rem;
      line-height: 2.5rem;
    }
  }
}
</style>
