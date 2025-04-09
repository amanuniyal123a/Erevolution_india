 
<template>
  <div class="min-h-screen flex flex-col layout-wrapper">    
    <Header /> 
    <main class="flex-1 p-43 main-content">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from './Header.vue';
import Footer from './Footer.vue';
</script>

 
