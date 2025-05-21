export const getHomeDataApi = async () => {
  try {
    const fetchResponse = await fetch('https://cinemaguide.skillbox.cc/favorites')
    console.log(fetchResponse)

    const response = await fetchResponse.json()
    console.log(response)

    return response
  } catch (err) {
    throw new Error(`favorites response was not ok: ${err}`)
  }
}

// http://wp-adm-audio.host1438437.hostland.pro/wp-json/wp/v2/product-category
// http://wp-adm-audio.host1438437.hostland.pro/wp-json/wp/v2/products?acf_format=standard
