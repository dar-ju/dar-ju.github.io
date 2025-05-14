import { getJobApi } from '@/api/job'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useJobListStore = defineStore('job', () => {
  const jobList = ref([])
  const jobListWithStack = ref([])
  const filterList = ref([])
  const filteredJobList = ref([])

  const getJobList = async () => {
    const data = await getJobApi()
    jobList.value = data
    data.forEach(element => {
      element.stack = [element.role, element.level, ...element.languages, ...element.tools]
      jobListWithStack.value.push(element)
    });
    filteredJobList.value = data
  }

  const addToFilter = (val) => {
    if (!filterList.value.includes(val)) {
      filterList.value.push(val)
      filteredJobList.value = filteredJobList.value.filter((item) => item.stack.includes(val))
    }
  }

  const delFromFilter = (val) => {
    if (filterList.value.includes(val)) {
      filterList.value.splice(filterList.value.indexOf(val), 1)
      filteredJobList.value = jobList.value
      filterList.value.forEach(element => {
        filteredJobList.value = filteredJobList.value.filter((item) => item.stack.includes(element))
      });
    }
    if (!filterList.value.length) resetFilter()
  }

  const resetFilter = () => {
    filterList.value = []
    filteredJobList.value = jobList.value
  }

  return { jobList, jobListWithStack, filterList, filteredJobList, getJobList, addToFilter, delFromFilter, resetFilter }
})
