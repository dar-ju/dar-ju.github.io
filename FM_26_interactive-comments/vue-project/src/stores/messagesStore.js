import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMessagesApi } from '@/api/data'

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref([])
  const getMessages = async () => {
    const response = await getMessagesApi()
    messages.value = response['comments']
    console.log(response['comments']);

  }

  return { getMessages, messages }
})
