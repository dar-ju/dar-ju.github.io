<script setup>
import { ref, onMounted } from 'vue'

const reviews = [
  {
    id: 1,
    author: 'Anisha Li',
    avatar: '/FM_28_manage-landing/assets/images/avatar-anisha.png',
    review:
      '“Manage has supercharged our team’s workflow. The ability to maintain visibility on larger milestones at all times keeps everyone motivated.”',
  },
  {
    id: 2,
    author: 'Ali Bravo',
    avatar: '/FM_28_manage-landing/assets/images/avatar-ali.png',
    review:
      '“We have been able to cancel so many other subscriptions since using Manage. There is no more cross-channel confusion and everyone is much more focused.”',
  },
  {
    id: 3,
    author: 'Richard Watts',
    avatar: '/FM_28_manage-landing/assets/images/avatar-richard.png',
    review:
      '“Manage allows us to provide structure and process. It keeps us organized and focused. I can’t stop recommending them to everyone I talk to!”',
  },
  {
    id: 4,
    author: 'Shanai Gough',
    avatar: '/FM_28_manage-landing/assets/images/avatar-shanai.png',
    review:
      '“Their software allows us to track, manage and collaborate on our projects from anywhere. It keeps the whole team in-sync without being intrusive.”',
  },
]

onMounted(() => {
  const visible = 2
  const isMobile = window.innerWidth <= 767
  const reviewsClone = [...reviews]
  if (isMobile) {
    products.value = [...reviewsClone]
  } else {
    const startClone = reviews.slice(0, visible)
    products.value = [...reviewsClone, ...startClone]
  }
})

const products = ref(reviews)
const responsiveOptions = ref([
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1,
  },
])
</script>

<template>
  <section class="section reviews">
    <div class="container reviews__container">
      <h2 class="reviews__title">What they’ve said</h2>
      <Carousel
        class="reviews__carousel"
        :value="products"
        :numVisible="3"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        circular
        :autoplayInterval="4000"
      >
        <template #item="slotProps">
          <div class="reviews__wrapper">
            <div class="reviews__card">
              <div class="reviews__avatar">
                <img :src="slotProps.data.avatar" :alt="slotProps.data.author" />
              </div>
              <div class="reviews__block">
                <h3 class="reviews__author">{{ slotProps.data.author }}</h3>
                <blockquote class="reviews__review">{{ slotProps.data.review }}</blockquote>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
      <Button class="main-btn" label="Get Started" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.reviews {
  padding-top: 93px;
  padding-bottom: 93px;
  &__container {
    display: flex;
    padding: 0;
    flex-direction: column;
    align-items: center;
  }
  &__title {
    margin-bottom: 27px;
    font-size: 2.06rem;
    color: var(--dark-blue);
  }
  &__carousel {
    max-width: 1800px;
    margin-bottom: 10px;
  }
  &__wrapper {
    display: flex;
    position: relative;
    min-height: 220px;
    height: 100%;
    margin-bottom: 15px;
    padding-right: 15px;
    padding-left: 15px;
  }
  &__card {
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 80px;
    align-self: flex-start;
    flex-direction: column;
    align-items: center;
  }
  &__avatar {
    position: absolute;
    top: 45px;
    width: 73px;
  }
  &__block {
    display: flex;
    height: 100%;
    padding-top: 64px;
    padding-bottom: 12px;
    gap: 7px;
    flex-direction: column;
    align-items: center;
    background-color: var(--light-gray);
  }
  &__author {
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--dark-blue);
  }
  &__review {
    max-width: 458px;
    text-align: center;
    font-size: 0.88rem;
    line-height: 1.4rem;
  }
}

@media (max-width: 768px) {
  .reviews {
    padding-top: 35px;
    padding-bottom: 21px;
    &__carousel {
      margin-bottom: 27px;
    }
    &__title {
      margin-bottom: 29px;
      font-size: 1.66rem;
    }
    &__carousel {
      max-width: 630px;
    }
    &__wrapper {
      min-height: 297px;
      margin-bottom: 8px;
    }
    &__card {
      padding: 70px 18px 12px 18px;
    }
    &__avatar {
      top: 34px;
    }
    &__author {
      margin-bottom: 0;
    }
    &__review {
      max-width: 285px;
      font-size: 0.77rem;
      line-height: 1.48rem;
    }
  }
}

@media (max-width: 576px) {
  .reviews {
    &__carousel {
      max-width: 505px;
    }
  }
}
</style>
