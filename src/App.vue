<script setup>
import Footer from './components/layout/Footer.vue';
import NavBar from './components/layout/NavBar.vue';

// import Footer from './components/layout/Footer.vue';
// import NavBar from './components/layout/NavBar.vue';

// App shell: Navbar and Footer are persistent on every route.
// <router-view> swaps out just the page content (Home, category pages, product detail).

</script>

<template>
 <div class="min-h-screen flex flex-col bg-bg-soft">
    <NavBar />
    <router-view class="flex-1" />
    <Footer />
  </div>
</template>