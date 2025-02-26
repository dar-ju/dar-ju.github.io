import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getCountriesApi } from '@/api/countries';
export const useCountriesStore = defineStore('country', () => {
    const countries = ref([]);
    const getCountries = async () => {
        const response = await getCountriesApi();
        countries.value = response;
    };
    return { getCountries, countries };
});
