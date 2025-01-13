import products from '../data/products.json';

export const getProductApi = async (productId) => {
  try {
    // const fetchResponse = await fetch('../data/products.json')
    // const response = await fetchResponse.json()
    const response = products
    return response.find(el => el.id === productId)
  } catch (err) {
    throw new Error(`product response was not ok, error: ${err}`)
  }
}
