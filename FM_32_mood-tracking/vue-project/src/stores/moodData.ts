import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getDataApi } from '@/api/data'

export const useDataStore = defineStore('data', () => {
  const data = ref({})
  const getdata = async () => {
    const response = await getDataApi()
    data.value = response
  }

  return {
    data,
    getdata,
  }
})
