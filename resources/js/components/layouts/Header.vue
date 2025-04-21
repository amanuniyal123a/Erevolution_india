<template>
  <header class="site-header">
    <div class="container flexbox">
            <div class="logo">
                  <router-link to="/" class="logo">
                          <span class="logo2">Erevo</span>
                          <span class="logo3">lution</span>India<sup>™</sup>
                  </router-link>
            </div>
                <button class="menu-toggle" @click="toggleMenu" :aria-expanded="isMenuOpen.toString()">
                ☰
                </button>
      
      <nav :class="['nav', { 'is-open': isMenuOpen }]">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/Contact-us" class="nav-link">Contact</router-link> 
        <a href="#" class="nav-link">About</a>
        <a href="#" class="nav-link">Services</a> 
      </nav>
      <button class="cta-btn">Get Started</button>
    </div>
  </header>
</template>

<script setup>
    import { ref } from 'vue';

    const isMenuOpen = ref(false);
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };
</script>
