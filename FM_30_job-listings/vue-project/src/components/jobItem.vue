<script setup>
import { useJobListStore } from '@/stores/jobStore'

const jobStore = useJobListStore()

const props = defineProps({
  job: {
    type: Object,
    required: false,
  },
})
</script>

<template>
  <li>
    <article class="job__item" :class="{ 'job__item--side-border': job.featured }">
      <div class="job__main-block">
        <img class="job__logo-img" :src="job.logo" :alt="`${job.company} logo`" />
        <div class="job__block">
          <div class="job__company-block">
            <span class="job__company">{{ job.company }}</span>
            <span class="job__badge" v-show="job.new" :class="{ 'job__badge--new': job.new }"
              >New!</span
            >
            <span
              class="job__badge"
              v-show="job.featured"
              :class="{ 'job__badge--featured': job.featured }"
              >featured</span
            >
          </div>
          <h2 class="job__position">
            <a href="#">{{ job.position }}</a>
          </h2>
          <div class="job__additional-block">
            <span>{{ job.postedAt }}</span>
            <span>∙</span>
            <span>{{ job.contract }}</span>
            <span>∙</span>
            <span>{{ job.location }}</span>
          </div>
        </div>
      </div>
      <div class="job__stack-block">
        <button
          class="job__stack"
          v-for="stack in job.stack"
          :key="stack"
          @click="jobStore.addToFilter(stack)"
          :aria-label="`Stack filter: ${stack}`"
        >
          {{ stack }}
        </button>
      </div>
    </article>
  </li>
</template>

<style lang="scss" scoped>
.job {
  &__item {
    display: flex;
    padding: 33px 40px;
    padding-right: 44px;
    border-radius: 9px;
    gap: 30px;
    align-items: center;
    justify-content: space-between;
    background-color: var(--white);
    box-shadow: 0px 5px 40px -20px var(--desaturated-dark-cyan);
    &--side-border {
      position: relative;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 5px;
        background-color: var(--desaturated-dark-cyan);
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
    }
  }
  &__main-block {
    display: flex;
    position: relative;
    min-width: 400px;
    gap: 23px;
    align-items: center;
  }
  &__block {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-weight: 700;
  }
  &__company {
    margin-right: 16px;
    font-size: 1.2rem;
    color: var(--desaturated-dark-cyan);
  }
  &__badge {
    padding: 4px 7px;
    padding-top: 7px;
    text-transform: uppercase;
    border-radius: 15px;
    color: var(--white);
    &--new {
      margin-right: 7px;
      background-color: var(--desaturated-dark-cyan);
    }
    &--featured {
      background-color: var(--very-dark-grayish-cyan);
    }
  }
  &__position {
    font-size: 1.47rem;
    transition: color ease-in-out 0.3s;
    & a:focus-visible {
      outline: 2px solid var(--desaturated-dark-cyan);
      outline-offset: 2px;
    }
  }
  &__additional-block {
    display: flex;
    gap: 15px;
    color: var(--dark-grayish-cyan);
    font-size: 1.15rem;
    font-weight: 500;
  }
  &__stack-block {
    display: flex;
    gap: 15px 27px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  &__stack {
    padding: 5px;
    border-radius: 3px;
    font-weight: 700;
    background-color: var(--light-grayish-cyan-filter);
    color: var(--desaturated-dark-cyan);
    transition:
      color ease-in-out 0.3s,
      background-color ease-in-out 0.3s;
    &:focus-visible {
      outline: 2px solid var(--desaturated-dark-cyan);
    }
  }
}

@media (hover: hover) {
  .job {
    &__position {
      &:hover {
        color: var(--desaturated-dark-cyan);
      }
    }
    &__stack {
      &:hover {
        color: var(--white);
        background-color: var(--desaturated-dark-cyan);
      }
    }
  }
}

@media (max-width: 1024px) {
  .job {
    &__item {
      flex-direction: column;
      align-items: flex-start;
    }
    &__stack-block {
      justify-content: flex-start;
    }
  }
}

@media (max-width: 620px) {
  .job {
    &__item {
      padding: 37px 24px;
      padding-bottom: 25px;
      gap: 0;
    }
    &__main-block {
      min-width: 100%;
      margin-bottom: 17px;
      padding-bottom: 18px;
      border-bottom: 1px solid var(--dark-grayish-cyan);
    }
    &__block {
      gap: 15px;
    }
    &__logo-img {
      position: absolute;
      width: 48px;
      height: 48px;
      top: -60px;
    }
    &__company {
      font-size: 1rem;
      margin-right: 24px;
    }
    &__position {
      font-size: 1rem;
    }
    &__additional-block {
      gap: 9px;
      font-size: 1rem;
    }
    &__stack-block {
      gap: 15px 19px;
    }
    &__stack {
      padding: 8px 8px 6px 8px;
      font-size: 1.05rem;
    }
  }
}
</style>
