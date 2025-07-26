import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { getMoodApi, postMoodApi } from '@/api/data'
import type { MoodData } from '@/types/mood'

export const useDataStore = defineStore('data', () => {
  const data: Ref<MoodData | null> = ref(null)
  const NUMBER_OF_ITEMS = 11
  const isTodayLogged = ref(false)

  const getData = async (email, numberOfItems) => {
    const response = await getMoodApi(email, numberOfItems)
    data.value = response
  }

  const postData = async (data) => {
    const response = await postMoodApi(data)
    data.value = response
  }

  return {
    data,
    NUMBER_OF_ITEMS,
    isTodayLogged,
    getData,
    postData,
  }
})
