import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCountriesApi } from '@/api/countries'
import type { Country } from '@/types'

export const useCountriesStore = defineStore('country', () => {
  const countries = ref<Country[]>([])
  const currentRegion = ref('')
  const getCountries = async () => {
    const response = await getCountriesApi()
    countries.value = response
  }
  const setCurrentRegion = (val: string) => {
    currentRegion.value = val
  }

  return { getCountries, countries, setCurrentRegion, currentRegion }
})
