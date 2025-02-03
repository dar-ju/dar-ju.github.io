import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getDataApi } from '@/api/data'

export const useDataStore = defineStore('data', () => {
  const data = ref({})
  const getData = async () => {
    const response = await getDataApi();
    data.value = response;
  };

  return { data, getData }
})
