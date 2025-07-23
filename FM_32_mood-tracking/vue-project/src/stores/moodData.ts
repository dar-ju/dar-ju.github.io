import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { getDataApi } from '@/api/data'
import type { MoodData } from '@/types/mood'

export const useDataStore = defineStore('data', () => {
  const data: Ref<MoodData | null> = ref(null)
  const isTodayLogged = ref(false)

  const getdata = async () => {
    const response = await getDataApi()
    data.value = response
  }

  return {
    data,
    isTodayLogged,
    getdata,
  }
})
