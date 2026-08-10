<script setup lang="ts">
import { ref, computed } from 'vue'
import ProductCard from './ProductCard.vue'
import type { Product } from '@/types'

interface Props {
  title?: string
  products: Product[]   // pass the FULL list — this component handles slicing
  initialCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  initialCount: 8,
})

const expanded = ref<boolean>(false)

const visibleProducts = computed<Product[]>(() =>
  expanded.value ? props.products : props.products.slice(0, props.initialCount)
)
const hasMore = computed<boolean>(() => props.products.length > props.initialCount)
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 md:px-6 py-10">
    <div v-if="title" class="flex items-center gap-3 mb-6">
      <h2 class="font-display font-bold text-xl md:text-2xl">{{ title }}</h2>
      <div class="flex-1 h-px bg-navy/10"></div>
    </div>

    <div v-if="visibleProducts.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="p in visibleProducts" :key="p.id" v-bind="p" />
    </div>
    <p v-else class="text-muted text-sm text-center py-10">No products found in this category yet.</p>

    <div v-if="hasMore" class="text-center mt-8">
      <button
        @click="expanded = !expanded"
        class="font-display text-sm font-semibold border border-navy px-6 py-2.5 rounded-full hover:bg-navy hover:text-white transition-all duration-300"
      >
        {{ expanded ? 'See Less' : 'See More' }}
      </button>
    </div>
  </section>
</template>
