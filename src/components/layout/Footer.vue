<script setup lang="ts">
import { categories } from '@/data/categories'
</script>

<template>
  <footer class="bg-navy text-white/70 mt-16">
    <div class="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">

      <!-- Brand story -->
      <div>
        <span class="font-display font-bold text-xl text-white">Aman<span class="text-accent">Market</span></span>
        <p class="mt-3 leading-relaxed">
          This Online Market brings electronics, fashion, home goods, beauty, and hobbies together in
          one curated storefront — quality-checked sellers, fair prices, fast delivery.
        </p>
      </div>

      <!-- Category quick links, built from the same shared categories.js used by the Navbar -->
      <div>
        <p class="font-display font-semibold text-white mb-3 text-xs tracking-widest uppercase">Departments</p>
        <ul class="space-y-2">
          <li v-for="cat in categories" :key="cat.slug">
            <router-link :to="`/category/${cat.slug}`" class="hover:text-accent transition-colors">
              {{ cat.label }}
            </router-link>
          </li>
        </ul>
      </div>

      <!-- General nav / support links -->
      <div>
        <p class="font-display font-semibold text-white mb-3 text-xs tracking-widest uppercase">Support</p>
        <ul class="space-y-2">
          <li>Shipping &amp; Delivery</li>
          <li>Returns &amp; Refunds</li>
          <li>Track Order</li>
          <li>FAQs</li>
        </ul>
      </div>

      <!-- Direct contact: tel: link opens the phone dialer on mobile, Telegram opens the app/web -->
      <div>
        <p class="font-display font-semibold text-white mb-3 text-xs tracking-widest uppercase">Contact Seller</p>
        <ul class="space-y-3">
          <li>
            <a href="tel:+251900000000" class="flex items-center gap-2 hover:text-accent transition-colors">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h4l2 5-2.5 1.5a11 11 0 005 5L12 12l5 2v4a2 2 0 01-2 2A15 15 0 012 5a2 2 0 012-2z"/></svg>
              +251 900 000 000
            </a>
          </li>
          <li>
            <a href="https://t.me/amanmarket" target="_blank" rel="noopener" class="flex items-center gap-2 hover:text-accent transition-colors">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              Message on Telegram
            </a>
          </li>
          <li>123 Bole Road, Addis Ababa, Ethiopia</li>
        </ul>
      </div>
    </div>

    <div class= "justify-center border-t border-white/10 px-4 md:px-6 py-4 flex flex-col md:flex-row items-center gap-2 text-xs text-white/40 ">
      <span>© 2026 Aman Market. All rights reserved.</span>
      
    </div>
  </footer>
</template>
