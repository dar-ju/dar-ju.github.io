import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryTitleApi, getAllCategoriesApi, getProductDataForCategoryApi } from '@/api/categories'

export const useCategoryStore = defineStore('category', () => {
  const title = ref([])
  const product = ref([])
  const categories = ref([])
  const loading = ref(true)

  const getData = async (category) => {
    const titleData = await getCategoryTitleApi(category)
    const productData = await getProductDataForCategoryApi()

    title.value = titleData[0]
    const filterData = productData.filter((item) => item.acf.category.slug === category)
    const sortData = filterData.sort((a, b) => a.acf.index - b.acf.index)
    loading.value = false
    product.value = sortData
  }

  const getProductData = async () => {
    const productData = await getProductDataForCategoryApi()
    product.value = productData
  }

  const getCategoriesData = async () => {
    const categoriesData = await getAllCategoriesApi()
    const sortData = categoriesData.sort((a, b) => a.id - b.id)
    categories.value = sortData
  }

  return { title, product, categories, loading, getData, getProductData, getCategoriesData }
})
