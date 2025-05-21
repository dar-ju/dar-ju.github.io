const baseUrl = import.meta.env.VITE_API_BASE_URL

export const getProductFullDataApi = async (product) => {
  try {
    const fetchResponse = await fetch(`${baseUrl}/products?acf_format=standard&_fields=id,title,slug,acf.short_name,acf.new_product,acf.short_description,acf.price,acf.full_description,acf.contents,acf.product_images&slug=${product}`)
    const response = await fetchResponse.json()
    return response
  } catch (err) {
    throw new Error(`favorites response was not ok: ${err}`)
  }
}

// http://wp-adm-audio.host1438437.hostland.pro/wp-json/wp/v2/products?acf_format=standard&_fields=id,title,slug,acf.new_product,acf.short_description,acf.price,acf.full_description,acf.contents,acf.product_images&slug=xx59-headphones
