const baseUrl = import.meta.env.VITE_API_BASE_URL

export const getCategoryTitleApi = async (category) => {
  try {
    const fetchResponse = await fetch(`${baseUrl}/product-categories?acf_format=standard&_fields=id,name,slug&slug=${category}`)
    const response = await fetchResponse.json()
    return response
  } catch (err) {
    throw new Error(`categories response was not ok: ${err}`)
  }
}

export const getAllCategoriesApi = async () => {
  try {
    const fetchResponse = await fetch(`${baseUrl}/product-categories?acf_format=standard&_fields=id,name,slug,acf.category_preview`)
    const response = await fetchResponse.json()
    return response
  } catch (err) {
    throw new Error(`categories response was not ok: ${err}`)
  }
}

export const getProductDataForCategoryApi = async () => {
  try {
    const fetchResponse = await fetch(`${baseUrl}/products?acf_format=standard&_fields=id,title,slug,acf.short_name,acf.category,acf.index,acf.short_description,acf.new_product,acf.category_images.desktop_image,acf.category_images.tablet_image,acf.category_images.mobile_image`)
    const response = await fetchResponse.json()
    return response
  } catch (err) {
    throw new Error(`categories response was not ok: ${err}`)
  }
}

// http://wp-adm-audio.host1438437.hostland.pro/wp-json/wp/v2/product-category?acf_format=standard&_fields=id,name,slug&slug=headphones
// http://wp-adm-audio.host1438437.hostland.pro/wp-json/wp/v2/products?acf_format=standard&_fields=title,acf.short_description,acf.new_product&acf.category.0.slug=headphones
