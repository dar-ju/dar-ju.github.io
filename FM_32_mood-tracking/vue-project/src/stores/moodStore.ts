import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { getMoodApi, postMoodApi } from '@/api/data'
import type { MoodData, MoodPostPayload } from '@/types/mood'

export const useDataStore = defineStore('data', () => {
  const data: Ref<MoodData | null> = ref(null)
  const NUMBER_OF_ITEMS = 11
  const isTodayLogged = ref(false)

  const getData = async (email: string, numberOfItems: number): Promise<void> => {
    const response = await getMoodApi(email, numberOfItems)
    data.value = response
  }

  const postData = async (payload: MoodPostPayload): Promise<void> => {
    const response = await postMoodApi(payload)
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
