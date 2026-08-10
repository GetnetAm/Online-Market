<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import HeroSection from '@/components/home/HeroSection.vue'
import PromoBanner from '@/components/home/PromoBanner.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import type { Product } from '@/types'

// Typed as Product[] — TypeScript will now flag it if a component downstream
// tries to read a field that doesn't exist on Product.
const products = ref<Product[]>([])
const loading = ref<boolean>(true)

const featuredProducts = computed<Product[]>(() => products.value.filter(p => p.featured))

onMounted(async () => {
  try {
    const res = await fetch('/data/products.json')
    // res.json() returns `Promise<any>` by default — the `as Product[]` cast
    // here is what gives `products.value` a real type instead of `any`.
    products.value = (await res.json()) as Product[]
  } catch (err) {
    console.error('Failed to load products:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <HeroSection />
    <PromoBanner />

    <div v-if="loading" class="text-center py-16 text-muted">Loading products...</div>
    <ProductGrid v-else title="Featured Products" :products="featuredProducts" :initial-count="8" />
  </div>
</template>
