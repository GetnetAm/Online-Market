<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '@/types'

const route = useRoute()
const products = ref<Product[]>([])
const loading = ref<boolean>(true)

// route.params.id can be `string | string[]` per Vue Router's types, so we
// normalize with Array.isArray before converting to a Number.
const routeId = computed<number>(() => {
  const raw = route.params.id
  return Number(Array.isArray(raw) ? raw[0] : raw)
})

const product = computed<Product | undefined>(() =>
  products.value.find(p => p.id === routeId.value)
)

const gallery = computed<string[]>(() => {
  if (!product.value) return []
  return [product.value.image, product.value.image.replace('/500/500', '/501/501')]
})
const activeImage = ref<number>(0)

onMounted(async () => {
  const res = await fetch('/data/products.json')
  products.value = (await res.json()) as Product[]
  loading.value = false
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 md:px-6 py-10">
    <p v-if="loading" class="text-center text-muted py-16">Loading product...</p>
    <p v-else-if="!product" class="text-center text-muted py-16">Product not found.</p>

    <div v-else class="grid md:grid-cols-2 gap-10">
      <div>
        <div class="aspect-square rounded-2xl overflow-hidden shadow-lg bg-bg-soft">
          <img :src="gallery[activeImage]" :alt="product.name" class="w-full h-full object-cover" />
        </div>
        <div class="flex gap-3 mt-3">
          <button
            v-for="(img, i) in gallery"
            :key="i"
            @click="activeImage = i"
            class="w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors"
            :class="activeImage === i ? 'border-accent' : 'border-transparent'"
          >
            <img :src="img" :alt="`${product.name} thumbnail ${i + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <div>
        <span class="text-xs font-semibold uppercase tracking-widest text-royal">{{ product.subCategory }}</span>
        <h1 class="font-display font-bold text-2xl md:text-3xl mt-2">{{ product.name }}</h1>

        <div class="mt-4 flex items-baseline gap-3">
          <span class="font-display font-bold text-2xl text-accent">${{ product.price.toFixed(2) }}</span>
          <span v-if="product.originalPrice" class="text-muted line-through">${{ product.originalPrice.toFixed(2) }}</span>
        </div>

        <p class="mt-5 text-sm text-ink/80 leading-relaxed">{{ product.description }}</p>

        <ul class="mt-5 text-sm text-muted space-y-1">
          <li><strong class="text-ink">Category:</strong> {{ product.subCategory }}</li>
          <li><strong class="text-ink">Availability:</strong> {{ product.inStock ? 'In Stock' : 'Out of Stock' }}</li>
        </ul>

        <div class="mt-7 flex flex-col sm:flex-row gap-3">
          <button
            :disabled="!product.inStock"
            class="flex-1 bg-navy hover:bg-royal disabled:bg-gray-300 text-white font-display font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            {{ product.inStock ? 'Buy Now' : 'Out of Stock' }}
          </button>
          <a
            href="tel:+251900000000"
            class="flex-1 text-center border border-navy/20 hover:bg-navy hover:text-white font-display font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300"
          >
            Call Seller
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
