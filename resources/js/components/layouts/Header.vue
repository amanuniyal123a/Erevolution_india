<template>
  <header class="site-header" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <!-- Logo Section -->
      <div class="logo-section">
        <router-link to="/" class="logo" @click="closeMenu">
          <span class="logo-text">
            <span class="logo-primary">Erevo</span>
            <span class="logo-secondary">lution</span>
            <span class="logo-brand">India</span>
            <sup class="logo-trademark">™</sup>
          </span>
        </router-link>
      </div>

      <!-- Mobile Menu Toggle -->
      <button 
        class="menu-toggle" 
        @click="toggleMenu" 
        :aria-expanded="isMenuOpen.toString()"
        :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
        :class="{ 'active': isMenuOpen }"
      >
        <span class="hamburger-line" :class="{ 'active': isMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'active': isMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'active': isMenuOpen }"></span>
      </button>

      <!-- Navigation -->
      <nav 
        :class="['nav', { 'is-open': isMenuOpen }]"
        :aria-hidden="!isMenuOpen"
        role="navigation"
      >
        <div class="nav-container">
          <router-link 
            to="/" 
            class="nav-link" 
            @click="closeMenu"
            :class="{ 'active': $route.path === '/' }"
          >
            <Home class="nav-icon" />
            <span>Home</span>
          </router-link>
          
          <router-link 
            to="/contact-us" 
            class="nav-link" 
            @click="closeMenu"
            :class="{ 'active': $route.path === '/contact-us' }"
          >
            <Mail class="nav-icon" />
            <span>Contact</span>
          </router-link>
          
          <a href="#about" class="nav-link" @click="scrollToSection('about')">
            <Users class="nav-icon" />
            <span>About</span>
          </a>
          
          <a href="#services" class="nav-link" @click="scrollToSection('services')">
            <Settings class="nav-icon" />
            <span>Services</span>
          </a>
        </div>
      </nav>

      <!-- CTA Button -->
      <div class="cta-section">
        <button class="cta-btn" @click="scrollToSection('contact')">
          <span class="cta-text">Get Started</span>
          <ArrowRight class="cta-icon" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div 
      v-if="isMenuOpen" 
      class="mobile-overlay" 
      @click="closeMenu"
      :class="{ 'active': isMenuOpen }"
    ></div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Home, Mail, Users, Settings, ArrowRight } from 'lucide-vue-next';

const isMenuOpen = ref(false);
const isScrolled = ref(false);

// Toggle mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  
  // Prevent body scroll when menu is open
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// Close mobile menu
const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

// Scroll to section
const scrollToSection = (sectionId) => {
  closeMenu();
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
};

// Handle scroll for header styling
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Handle escape key to close menu
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isMenuOpen.value) {
    closeMenu();
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<style lang="scss" scoped>
@use '../../../../resources/sass/variables' as vars;

.site-header {
  background-color: vars.$dark-bg;
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all vars.$transition-fast;
  backdrop-filter: blur(10px);
  
  &.scrolled {
    background-color: rgba(vars.$dark-bg, 0.95);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 0.75rem 0;
  }

  .container {
    max-width: vars.$container-max-width;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  // Logo Section
  .logo-section {
    flex-shrink: 0;
    
    .logo {
      text-decoration: none;
      display: flex;
      align-items: center;
      
      .logo-text {
        font-size: 1.5rem;
        font-weight: bold;
        letter-spacing: 1px;
        display: flex;
        align-items: baseline;
        gap: 0.25rem;
        
        .logo-primary {
          color: #e5b031;
          transition: color vars.$transition-fast;
        }
       
        .logo-secondary {
          color: vars.$text-light;
        }
        
        .logo-brand {
          color:  vars.$brand-green;
          font-weight: 600;
        }
        
        .logo-trademark {
          color: vars.$brand-gold;
          font-size: 0.6rem;
          vertical-align: super;
        }
      }
      
      &:hover .logo-primary {
        color: e5b031;
      }
    }
  }

  // Mobile Menu Toggle
  .menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 30px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;
    
    .hamburger-line {
      width: 100%;
      height: 3px;
      background-color: vars.$text-white;
      border-radius: 2px;
      transition: all 0.3s ease;
      transform-origin: center;
      
      &.active:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
      }
      
      &.active:nth-child(2) {
        opacity: 0;
      }
      
      &.active:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
      }
    }
    
    &:hover .hamburger-line {
      background-color: vars.$brand-teal;
    }
  }

  // Navigation
  .nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    .nav-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: vars.$text-white;
      text-decoration: none;
      font-weight: 500;
      padding: 0.75rem 1rem;
      border-radius: vars.$border-radius;
      transition: all vars.$transition-fast;
      position: relative;
      
      .nav-icon {
        width: 18px;
        height: 18px;
        opacity: 0.7;
        transition: opacity vars.$transition-fast;
      }
      
      &:hover {
        color: vars.$brand-teal;
        background-color: rgba(vars.$brand-teal, 0.1);
        transform: translateY(-1px);
        
        .nav-icon {
          opacity: 1;
        }
      }
      
      &.active {
        color: vars.$brand-teal;
        background-color: rgba(vars.$brand-teal, 0.15);
        
        .nav-icon {
          opacity: 1;
        }
      }
      
      &:focus {
        outline: 2px solid vars.$brand-teal;
        outline-offset: 2px;
      }
    }
  }

  // CTA Section
  .cta-section {
    flex-shrink: 0;
    
    .cta-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, vars.$brand-teal, vars.$brand-purple);
      color: vars.$text-white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: vars.$border-radius;
      font-weight: 600;
      cursor: pointer;
      transition: all vars.$transition-fast;
      text-decoration: none;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
      }
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(vars.$brand-teal, 0.3);
        
        &::before {
          left: 100%;
        }
        
        .cta-icon {
          transform: translateX(3px);
        }
      }
      
      &:focus {
        outline: 2px solid vars.$text-white;
        outline-offset: 2px;
      }
      
      .cta-text {
        font-size: 0.9rem;
      }
      
      .cta-icon {
        width: 16px;
        height: 16px;
        transition: transform vars.$transition-fast;
      }
    }
  }

  // Mobile Overlay
  .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    transition: opacity 0.3s ease;
    
    &.active {
      opacity: 1;
    }
  }

  // Mobile Responsive
  @media (max-width: vars.$mobile) {
    .container {
      padding: 0 1rem;
    }
    
    .menu-toggle {
      display: flex;
    }
    
    .nav {
      position: fixed;
      top: 0;
      right: -100%;
      width: 280px;
      height: 100vh;
      background-color: vars.$dark-bg;
      flex-direction: column;
      align-items: flex-start;
      padding: 5rem 2rem 2rem;
      transition: right 0.3s ease;
      box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
      
      &.is-open {
        right: 0;
      }
      
      .nav-container {
        flex-direction: column;
        width: 100%;
        gap: 0;
      }
      
      .nav-link {
        width: 100%;
        padding: 1rem 0;
        border-bottom: 1px solid rgba(vars.$text-white, 0.1);
        justify-content: flex-start;
        
        &:last-child {
          border-bottom: none;
        }
        
        .nav-icon {
          width: 20px;
          height: 20px;
        }
      }
    }
    
    .cta-section {
      display: none;
    }
  }
}
</style>
