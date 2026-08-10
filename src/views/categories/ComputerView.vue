<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import type { Product } from '@/types'

const products = ref<Product[]>([])
const loading = ref<boolean>(true)

const categoryProducts = computed<Product[]>(() =>
  products.value.filter(p => p.category === 'Laptops')
)

onMounted(async () => {
  const res = await fetch('/data/products.json')
  products.value = (await res.json()) as Product[]
  loading.value = false
})
</script>

<template>
  <div>
    <div class="bg-navy text-white py-5 text-center">
      <h1 class="font-display font-bold text-2xl md:text-3xl">Computer and Their Accsseries</h1>
    </div>
    <p v-if="loading" class="text-center text-muted py-16">Loading products...</p>
    <ProductGrid v-else :products="categoryProducts" :initial-count="8" />
  </div>
</template>
