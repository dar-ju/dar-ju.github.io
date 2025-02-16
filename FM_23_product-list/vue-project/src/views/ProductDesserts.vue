<script setup>
import ProductCard from '@/components/ProductCard.vue'
import CartBlock from '@/components/CartBlock.vue'
import ConfirmedPopup from '@/components/ConfirmedPopup.vue'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { onMounted } from 'vue'

const productsStore = useProductStore()
const cartStore = useCartStore()

onMounted(async () => {
  await productsStore.getProducts()
  cartStore.getCart()
  if (!cartStore.cart) cartStore.postCart()
})
</script>

<template>
  <section class="section product">
    <div class="container product__container">
      <div class="product__block">
        <h1 class="product__title">Desserts</h1>
        <ul class="product-list">
          <ProductCard
            v-for="product of productsStore.products"
            :key="product.name"
            :product="product"
          />
        </ul>
      </div>
      <CartBlock />
    </div>
    <ConfirmedPopup />
  </section>
</template>

<style scope>
.product {
  position: relative;
}
.product__container {
  display: flex;
  gap: 32px;
}
.product__block {
  max-width: 66%;
}
.product__title {
  margin-bottom: 33px;
  font-size: 2.5rem;
  color: var(--rose900);
}
.product-list {
  display: flex;
  gap: 33px var(--gap);
  flex-wrap: wrap;
}

@media (max-width: 920px) {
  .product__container {
    flex-direction: column;
  }
  .product__block {
    max-width: 100%;
  }
}

@media (max-width: 576px) {
  .product-list {
    gap: 25px var(--gap);
  }
}
</style>
