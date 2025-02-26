import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCountriesApi } from '@/api/countries'
import type { Country } from '@/types'

export const useCountriesStore = defineStore('country', () => {
  const countries = ref<Country[]>([])
  const getCountries = async () => {
    const response = await getCountriesApi()
    countries.value = response
  }

  return { getCountries, countries }
})
