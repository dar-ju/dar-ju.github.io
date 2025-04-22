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
  products.value = reviews.slice(0, 9)
})

const products = ref()
const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: '767px',
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
              <div class="reviews__author">{{ slotProps.data.author }}</div>
              <div class="reviews__review">{{ slotProps.data.review }}</div>
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
    margin-bottom: 60px;
    font-size: 2.06rem;
    color: var(--dark-blue);
  }

  &__wrapper {
    display: flex;
    position: relative;
    min-height: 266px;
    margin-bottom: 15px;
    padding-right: 15px;
    padding-left: 15px;
  }
  &__card {
    display: flex;
    width: 100%;
    padding: 65px 18px 38px 18px;
    padding-top: 60px;
    align-self: flex-end;
    flex-direction: column;
    align-items: center;
    background-color: var(--light-gray);
  }
  &__avatar {
    position: absolute;
    top: 12px;
    width: 73px;
  }
  &__author {
    margin-bottom: 20px;
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
</style>
