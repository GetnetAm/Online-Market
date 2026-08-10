<script setup lang="ts">
interface Props {
  eyebrow?: string
  heading?: string
  subtext?: string
  ctaText?: string
  ctaLink?: string
}

withDefaults(defineProps<Props>(), {
  eyebrow: 'FLASH DEAL',
  heading: 'Up to 50% off — this week only',
  subtext: 'Selected electronics, fashion, and home essentials while supplies last.',
  ctaText: 'Shop the Sale',
  ctaLink: '/category/electronics',
})
</script>

<template>
  <!-- Flash-deal advertisement banner — sits between the hero and the product grid.
       Uses the same rounded-2xl / shadow / gradient language as the hero for visual consistency. -->
  <section class="max-w-7xl mx-auto px-4 md:px-6 -mt-8 md:-mt-10 relative z-10">
    <div class="relative overflow-hidden bg-gradient-to-r from-accent to-orange-400 text-white rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-5">
      <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" aria-hidden="true"></div>

      <div class="relative text-center md:text-left">
        <span class="text-xs font-semibold tracking-widest uppercase text-white/80">{{ eyebrow }}</span>
        <h3 class="font-display font-bold text-2xl md:text-3xl mt-1">{{ heading }}</h3>
        <p class="text-sm text-white/80 mt-1">{{ subtext }}</p>
      </div>

      <router-link
        :to="ctaLink"
        class="relative shrink-0 bg-navy hover:bg-white hover:text-navy text-white font-display font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl"
      >
        {{ ctaText }} →
      </router-link>
    </div>
  </section>
</template>
