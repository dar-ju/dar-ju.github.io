<script setup>
import JobList from '@/components/jobList.vue'
import { useJobListStore } from '@/stores/jobStore'
import { onMounted, ref } from 'vue'

const jobStore = useJobListStore()

onMounted(async () => {
  await jobStore.getJobList()
})
</script>

<template>
  <div class="job section">
    <div class="job__header"></div>
    <div class="job__container container">
      <div
        class="job__filter-block"
        :class="{ 'job__filter-block--hidden': jobStore.filterList.length === 0 }"
      >
        <ul class="job__filter-list">
          <li class="job__filter-item" v-for="item in jobStore.filterList" :key="item">
            <span class="job__filter-item-name">{{ item }}</span>
            <button
              class="job__filter-item-clear"
              @click="jobStore.delFromFilter(item)"
              :aria-label="`Clear stack filter: ${item}`"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                <path
                  fill="#FFF"
                  fill-rule="evenodd"
                  d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"
                />
              </svg>
            </button>
          </li>
        </ul>
        <button class="job__filter-clear" @click="jobStore.resetFilter()" aria-label="Clear filter">
          Clear
        </button>
      </div>
      <JobList />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.job {
  &__header {
    min-height: 156px;
    background-image: url('/assets/images/bg-header-desktop.svg');
    background-repeat: no-repeat;
    background-color: var(--desaturated-dark-cyan);
  }
  &__filter-block {
    display: flex;
    min-height: 77px;
    margin-top: -36px;
    margin-bottom: 33px;
    padding: 0 43px;
    gap: 20px;
    border-radius: 5px;
    align-items: center;
    justify-content: space-between;
    background-color: var(--white);
    font-weight: 700;
    color: var(--desaturated-dark-cyan);
    &--hidden {
      opacity: 0;
    }
  }
  &__filter-list {
    display: flex;

    gap: 20px;
    align-items: center;
  }
  &__filter-item {
    display: flex;
    align-items: center;
    border-radius: 3px;
    overflow: hidden;
  }
  &__filter-item-name {
    padding: 7px 5px;
    padding-right: 12px;
    background-color: var(--light-grayish-cyan-filter);
  }
  &__filter-item-clear {
    display: flex;
    width: 32px;
    height: 32px;
    align-items: center;
    justify-content: center;
    background-color: var(--desaturated-dark-cyan);
    transition: background-color ease-in-out 0.3s;
    &:focus-visible {
      outline: 2px solid var(--very-dark-grayish-cyan);
      outline-offset: -2px;
    }
  }
  &__filter-clear {
    padding: 7px 0;
    line-height: 0;
    font-weight: 700;
    color: var(--desaturated-dark-cyan);
    border-bottom: 1px solid transparent;
    transition: border-bottom ease-in-out 0.3s;
    &:focus-visible {
      outline: 2px solid var(--desaturated-dark-cyan);
      outline-offset: 2px;
    }
  }
}

@media (hover: hover) {
  .job {
    &__filter-item-clear {
      &:hover {
        background-color: var(--very-dark-grayish-cyan);
      }
    }
    &__filter-clear {
      &:hover {
        border-bottom: 1px solid var(--desaturated-dark-cyan);
      }
    }
  }
}

@media (max-width: 620px) {
  .job {
    &__filter-block {
      min-height: 58px;

      padding: 20px;
      padding-right: 27px;
    }
    &__filter-list {
      gap: 15px;
      flex-wrap: wrap;
    }
    &__filter-item-name {
      padding: 7px;
      padding-right: 14px;
    }
    &__filter-clear {
      color: var(--dark-grayish-cyan);
    }
  }
}
</style>
