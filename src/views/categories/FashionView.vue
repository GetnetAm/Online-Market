<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductGrid from '@/components/product/ProductGrid.vue'
import type { Product } from '@/types'

const route = useRoute()
const products = ref<Product[]>([])
const loading = ref<boolean>(true)

const CATEGORY_SLUG = 'fashion'
const CATEGORY_LABEL = 'Fashion & Apparel'

const categoryProducts = computed<Product[]>(() =>
  products.value.filter((p) => p.category === CATEGORY_SLUG)
)

// Built from the data itself so it always matches whatever sub-categories
// actually exist in products.json for this category.
const subCategories = computed<string[]>(() => {
  return Array.from(new Set(categoryProducts.value.map((p) => p.subCategory)))
})

const activeSub = computed<string>(() => (route.query.sub as string) || 'All')

const filteredProducts = computed<Product[]>(() =>
  activeSub.value === 'All'
    ? categoryProducts.value
    : categoryProducts.value.filter((p) => p.subCategory === activeSub.value)
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
      <h1 class="font-display font-bold text-2xl md:text-3xl">{{ CATEGORY_LABEL }}</h1>
    </div>

    <div class="max-w-7xl mx-auto px-4 md:px-6 pt-8 flex flex-wrap gap-2 justify-center">
      <router-link
        :to="{ path: `/category/${CATEGORY_SLUG}` }"
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="activeSub === 'All' ? 'bg-navy text-white' : 'bg-card text-ink hover:bg-bg-soft'"
      >
        All
      </router-link>
      <router-link
        v-for="sub in subCategories"
        :key="sub"
        :to="{ path: `/category/${CATEGORY_SLUG}`, query: { sub } }"
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="activeSub === sub ? 'bg-navy text-white' : 'bg-card text-ink hover:bg-bg-soft'"
      >
        {{ sub }}
      </router-link>
    </div>

    <p v-if="loading" class="text-center text-muted py-16">Loading products...</p>
    <ProductGrid v-else :products="filteredProducts" :initial-count="8" />
  </div>
</template>



