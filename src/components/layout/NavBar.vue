<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { categories } from '@/data/categories'
import { useProductSearch } from '@/composables/useProductSearch'
import { useClickOutside } from '@/composables/useClickOutside'
import SearchResults from './SearchResults.vue'
import type { Product } from '@/types'
import { User } from 'lucide-vue-next'

const router = useRouter()

const drawerOpen = ref<boolean>(false)

const openMenu = ref<string | null>(null)

// Shared search state — same query/results power both the desktop input
// and the mobile drawer input (see useProductSearch for why sharing is safe).
const { query: searchText, results: searchResults, isOpen: searchOpen, dismiss: dismissSearch, clear: clearSearch } =
  useProductSearch()

// Template refs for the two search containers (desktop bar + mobile drawer),
// so useClickOutside knows what counts as "inside" for each.
const desktopSearchWrap = ref<HTMLElement | null>(null)
const mobileSearchWrap = ref<HTMLElement | null>(null)
useClickOutside(desktopSearchWrap, dismissSearch)
useClickOutside(mobileSearchWrap, dismissSearch)

// Picking a result: navigate to that product, then reset search + close the mobile drawer.
function selectProduct(product: Product): void {
  clearSearch()
  drawerOpen.value = false
  router.push(`/product/${product.id}`)
}

// Escape key closes the dropdown without clearing what was typed.
function handleEscape(): void {
  dismissSearch()
}
</script>

<template>
  <header class="sticky top-0 z-40">
    <div class="bg-navy text-white text-center text-xs py-1.5 font-body">
      Free shipping on orders over $50 — use code <span class="text-accent font-semibold">AMAN10</span>
    </div>

    <div class="bg-navy/95 backdrop-blur-md text-white">
      <div class="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        <router-link to="/" class="font-display font-bold text-xl md:text-2xl shrink-0">
          Aman<span class="text-accent">Market</span>
        </router-link>

        <!-- Desktop search: wrapped in a relative container so the dropdown can
             be absolutely positioned directly beneath it. -->
        <div ref="desktopSearchWrap" class="hidden sm:block flex-1 max-w-md mx-4 relative">
          <input
            v-model="searchText"
            type="text"
            placeholder="Search products..."
            class="w-full bg-white/10 placeholder-white/50 text-sm rounded-full px-4 py-2 outline-none focus:bg-white/20 transition-colors"
            @keydown.esc="handleEscape"
          />
          <div v-if="searchOpen" class="absolute left-0 right-0 top-full mt-2 z-50">
            <SearchResults :results="searchResults" @select="selectProduct" />
          </div>
        </div>

        <div class="hidden md:flex items-center gap-5 text-sm">
          <!-- <span class="cursor-pointer hover:text-accent transition-colors">Account</span> -->
          <!-- <span class="cursor-pointer hover:text-accent transition-colors">Cart (0)</span> -->
           <button class="p-2 rounded-full hover:bg-gray-100 text-gray-700 transition">
    <User class="w-6 h-6" />
  </button>
        </div>

        <button class="md:hidden p-2" @click="drawerOpen = true" aria-label="Open menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>

      <nav class="hidden md:flex max-w-7xl mx-auto px-6 gap-1 pb-2">
        <div
          v-for="cat in categories"
          :key="cat.slug"
          class="relative"
          @mouseenter="openMenu = cat.slug"
          @mouseleave="openMenu = null"
        >
          <router-link
            :to="`/category/${cat.slug}`"
            class="px-4 py-2 text-sm font-medium rounded-full hover:bg-white/10 transition-colors inline-block"
          >
            {{ cat.label }}
          </router-link>

          <div
            v-if="openMenu === cat.slug"
            class="absolute left-0 top-full bg-card text-ink rounded-2xl shadow-2xl p-4 w-64 grid gap-1 z-40"
          >
            <router-link
              v-for="sub in cat.subCategories"
              :key="sub"
              :to="`/category/${cat.slug}`"
              class="px-3 py-2 text-sm rounded-xl hover:bg-bg-soft transition-colors"
            >
              {{ sub }}
            </router-link>
          </div>
        </div>
      </nav>
    </div>

    <Transition name="fade">
      <div v-if="drawerOpen" class="fixed inset-0 z-50 md:hidden">
        <div class="absolute inset-0 bg-black/50" @click="drawerOpen = false"></div>

        <div class="absolute left-0 top-0 h-full w-72 bg-navy text-white p-5 overflow-y-auto">
          <div class="flex justify-between items-center mb-6">
            <span class="font-display font-bold text-lg">Aman<span class="text-accent">Market</span></span>
            <button @click="drawerOpen = false" aria-label="Close menu">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Mobile search: same composable state, its own click-outside container -->
          <div ref="mobileSearchWrap" class="relative mb-5">
            <input
              v-model="searchText"
              type="text"
              placeholder="Search products..."
              class="w-full bg-white/10 placeholder-white/50 text-sm rounded-full px-4 py-2 outline-none"
              @keydown.esc="handleEscape"
            />
            <div v-if="searchOpen" class="mt-2">
              <SearchResults :results="searchResults" @select="selectProduct" />
            </div>
          </div>

          <details v-for="cat in categories" :key="cat.slug" class="border-b border-white/10 py-1">
            <summary class="py-2 text-sm font-medium cursor-pointer flex justify-between items-center">
              {{ cat.label }}
            </summary>
            <div class="pl-3 pb-2 space-y-2 text-sm text-white/70">
              <router-link
                v-for="sub in cat.subCategories"
                :key="sub"
                :to="`/category/${cat.slug}`"
                class="block"
                @click="drawerOpen = false"
              >
                {{ sub }}
              </router-link>
            </div>
          </details>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
