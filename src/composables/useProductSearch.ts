import { ref, computed, watch } from 'vue'
import type { Product } from '@/types'

// Module-level state (declared outside the function) — this means every
// component that calls useProductSearch() shares the SAME product list and
// fetch, instead of each one re-fetching products.json independently.
const allProducts = ref<Product[]>([])
const productsLoaded = ref<boolean>(false)

async function loadProducts(): Promise<void> {
  if (productsLoaded.value) return // already fetched — don't re-fetch on every keystroke/mount
  try {
    const res = await fetch('/data/products.json')
    allProducts.value = (await res.json()) as Product[]
  } catch (err) {
    console.error('Failed to load products for search:', err)
  } finally {
    productsLoaded.value = true
  }
}

/**
 * Reusable search logic for the Navbar's desktop and mobile search inputs.
 * Both inputs call this and get the SAME query/results, so typing in one
 * keeps the other in sync (they're never visible at the same time anyway,
 * since one is desktop-only and the other mobile-drawer-only).
 */
export function useProductSearch() {
  const query = ref<string>('')

  // "dismissed" tracks an explicit close (Escape key, outside click, picking
  // a result) separately from having no query — this way isOpen can be a
  // pure computed value instead of something we manually flip on/off in
  // three different places.
  const dismissed = ref<boolean>(false)

  loadProducts()

  const results = computed<Product[]>(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return []
    return allProducts.value
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 6) // cap the dropdown at 6 matches so it never overwhelms the screen
  })

  const isOpen = computed<boolean>(() => query.value.trim().length > 0 && !dismissed.value)

  // Typing again after a dismissal (e.g. Escape) should re-open the dropdown
  watch(query, () => {
    dismissed.value = false
  })

  function dismiss(): void {
    dismissed.value = true
  }

  function clear(): void {
    query.value = ''
    dismissed.value = false
  }

  return { query, results, isOpen, dismiss, clear }
}
