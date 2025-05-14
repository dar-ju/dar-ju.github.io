<script setup>
import JobItem from '@/components/jobItem.vue'
import { useJobListStore } from '@/stores/jobStore'

const jobStore = useJobListStore()
</script>

<template>
  <TransitionGroup class="job__list" name="fade" tag="ul">
    <JobItem v-for="job in jobStore.filteredJobList" :key="job.id" :job="job" />
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.job {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }
}

@media (max-width: 1024px) {
  .job {
    &__list {
      max-width: 750px;
      margin: 0 auto;
    }
  }
}

@media (max-width: 620px) {
  .job {
    &__list {
      display: flex;
      flex-direction: column;
      gap: 38px;
    }
  }
}
</style>
