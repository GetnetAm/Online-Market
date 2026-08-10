<script setup lang="ts">
import { ref, computed } from 'vue'

// ProductCard takes the individual fields of a Product as props (rather than
// one `product: Product` object) so it can be used with v-bind="p" directly —
// Omit<> drops fields this card doesn't render (category, description) to
// keep the required-props list honest about what's actually used.
interface Props {
  id: number
  name: string
  price: number
  originalPrice?: number | null
  image: string
  subCategory: string
  inStock?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  originalPrice: null,
  inStock: true,
})

// Skeleton loading state: true once the <img> fires its @load event.
const imageLoaded = ref<boolean>(false)

// computed() infers `number | null` automatically from the ternary below —
// no need to annotate it explicitly.
const discountPercent = computed(() =>
  props.originalPrice ? Math.round((1 - props.price / props.originalPrice) * 100) : null
)
</script>

<template>
  <div class="group bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
    <router-link :to="`/product/${id}`" class="relative block aspect-square overflow-hidden bg-bg-soft">
      <div v-if="!imageLoaded" class="absolute inset-0 animate-pulse bg-gray-200"></div>
      <img
        :src="image"
        :alt="name"
        loading="lazy"
        @load="imageLoaded = true"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        :class="imageLoaded ? 'opacity-100' : 'opacity-0'"
      />
      <span v-if="discountPercent" class="absolute top-2 left-2 bg-accent text-white text-[11px] font-semibold px-2 py-1 rounded-full">
        -{{ discountPercent }}%
      </span>
      <span class="absolute top-2 right-2 bg-navy/80 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">
        {{ subCategory }}
      </span>
    </router-link>

    <div class="p-4 flex flex-col flex-1">
      <router-link :to="`/product/${id}`" class="text-sm font-medium line-clamp-2 hover:text-royal transition-colors">
        {{ name }}
      </router-link>

      <div class="mt-2 flex items-baseline gap-2">
        <span class="font-display font-semibold text-accent">${{ price.toFixed(2) }}</span>
        <span v-if="originalPrice" class="text-xs text-muted line-through">${{ originalPrice.toFixed(2) }}</span>
      </div>

      <div class="mt-auto pt-3 flex gap-2">
        <button
          :disabled="!inStock"
          class="flex-1 bg-navy hover:bg-royal disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-semibold py-2 rounded-full transition-colors duration-300"
        >
          {{ inStock ? 'Buy Now' : 'Out of Stock' }}
        </button>
        <a
          href="tel:+251900000000"
          aria-label="Call seller"
          class="shrink-0 border border-navy/20 hover:bg-navy hover:text-white text-navy w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300"
        >
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 2h3l1.5 4-2 1.5a9 9 0 004 4L9 9.5l4 1.5v3a1.5 1.5 0 01-1.5 1.5A12 12 0 011 3.5 1.5 1.5 0 012 2z"/></svg>
        </a>
      </div>
    </div>
  </div>
</template>
