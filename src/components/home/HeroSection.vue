

<script setup lang="ts">
// Static promotional content for now — swap these props for CMS/API data later.
// The interface + withDefaults pattern is the TS-idiomatic replacement for
// runtime `defineProps({ type: String, default: ... })` — types are checked
// at compile time instead of only at runtime.
interface Props {
  tagline?: string
  heading?: string
  subtext?: string
}

withDefaults(defineProps<Props>(), {
  tagline: 'New Season Arrivals',
  heading: 'Everything you need, one market away.',
  subtext: 'Electronics, fashion, home, beauty, and hobbies — curated sellers, fair prices, fast delivery across Ethiopia.',
})
</script>

<template>
  <!-- Split hero: text block left, visual showcase right. Stacks vertically below md. -->
  <section class="relative overflow-hidden bg-gradient-to-br from-navy via-royal to-navy text-white">
    <!-- Decorative background blobs — purely visual, aria-hidden -->
    <div class="absolute -top-20 -right-20 w-72 h-72 bg-accent/30 rounded-full blur-3xl" aria-hidden="true"></div>
    <div class="absolute bottom-0 left-1/3 w-56 h-56 bg-royal/40 rounded-full blur-3xl" aria-hidden="true"></div>

    <div class="relative  mx-auto px-4 md:px-6 py-14 md:py-20 flex flex-col md:flex-row items-center gap-10">
      <!-- Text column -->
      <div class="w-full md:w-1/2 text-center md:text-left">
        <span class="inline-block bg-accent/20 text-accent text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
          {{ tagline }}
        </span>
        <h1 class="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mt-4">
          {{ heading }}
        </h1>
        <p class="mt-4 text-white/70 text-sm md:text-base max-w-md mx-auto md:mx-0">
          {{ subtext }}
        </p>
        <div class="mt-7 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
          <router-link
            to="/category/electronics"
            class="bg-accent hover:bg-white hover:text-navy text-white font-display font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl text-center"
          >
            Browse Catalog
          </router-link>
          <a
            href="tel:+251900000000"
            class="border border-white/30 hover:bg-white/10 font-display font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 text-center"
          >
            Contact Seller
          </a>
        </div>
      </div>

      <!-- Visual column: layered product image collage using rounded glass cards -->
      <div class="w-full md:w-[55%] flex justify-center items-center">
        <img src="/images/hero_1.png" alt="Featured product" class="rounded-2xl shadow-2xl object-cover w-full h-48 md:h-64 translate-y-4" loading="lazy" />
      </div>
    </div>
  </section>
</template>
