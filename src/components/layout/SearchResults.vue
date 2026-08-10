<script setup lang="ts">
import type { Product } from '@/types'

defineProps<{
  results: Product[]
}>()

// Typed emit: `select` always carries a full Product, so the parent
// (Navbar) gets autocomplete on `product.id`, `product.name`, etc.
// without needing to re-declare the shape.
const emit = defineEmits<{
  select: [product: Product]
}>()
</script>

<template>
  <div class="bg-card text-ink rounded-2xl shadow-2xl overflow-hidden">
    <!--
      @mousedown.prevent instead of @click: mousedown fires before the input's
      blur event, and .prevent stops focus from shifting away from the input
      first — so the click reliably registers instead of the dropdown closing
      out from under it.
    -->
    <button
      v-for="p in results"
      :key="p.id"
      type="button"
      @mousedown.prevent="emit('select', p)"
      class="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-bg-soft transition-colors text-left"
    >
      <img :src="p.image" :alt="p.name" class="w-10 h-10 rounded-lg object-cover shrink-0" />
      <span class="flex-1 min-w-0">
        <span class="block text-sm truncate">{{ p.name }}</span>
        <span class="block text-xs text-muted">{{ p.subCategory }}</span>
      </span>
      <span class="text-sm font-semibold text-accent shrink-0">${{ p.price.toFixed(2) }}</span>
    </button>

    <p v-if="!results.length" class="px-4 py-3 text-sm text-muted">
      No products found.
    </p>
  </div>
</template>
