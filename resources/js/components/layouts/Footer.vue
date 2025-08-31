<template>
  <footer class="site-footer">
    <div class="footer-container">
      <!-- Main Footer Content -->
      <div class="footer-main">
        <!-- Company Info -->
        <div class="footer-section company-info">
          <div class="footer-logo">
            <span class="logo-text">
              <span class="logo-primary">Erevo</span>
              <span class="logo-secondary">lution</span>
              <span class="logo-brand">India</span>
              <sup class="logo-trademark">™</sup>
            </span>
          </div>
          <p class="company-description">
            Erevolution India is committed to driving change through innovation and community. 
            We transform ideas into impactful solutions that shape the future.
          </p>
          <div class="social-links">
            <a 
              href="https://instagram.com/erevolutionindia" 
              target="_blank" 
              rel="noopener noreferrer"
              class="social-link"
              aria-label="Follow us on Instagram"
            >
              <Instagram class="social-icon" />
            </a>
            <a 
              href="https://twitter.com/erevolutionindia" 
              target="_blank" 
              rel="noopener noreferrer"
              class="social-link"
              aria-label="Follow us on Twitter"
            >
              <Twitter class="social-icon" />
            </a>
            <a 
              href="https://linkedin.com/company/erevolutionindia" 
              target="_blank" 
              rel="noopener noreferrer"
              class="social-link"
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin class="social-icon" />
            </a>
            <a 
              href="https://youtube.com/@erevolutionindia" 
              target="_blank" 
              rel="noopener noreferrer"
              class="social-link"
              aria-label="Follow us on YouTube"
            >
              <Youtube class="social-icon" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h4 class="footer-title">Quick Links</h4>
          <ul class="footer-links">
            <li><router-link to="/" class="footer-link">Home</router-link></li>
            <li><a href="#about" class="footer-link" @click="scrollToSection('about')">About Us</a></li>
            <li><a href="#services" class="footer-link" @click="scrollToSection('services')">Services</a></li>
            <li><router-link to="/contact-us" class="footer-link">Contact</router-link></li>
            <li><a href="#case-studies" class="footer-link" @click="scrollToSection('case-studies')">Case Studies</a></li>
          </ul>
        </div>

        <!-- Services -->
        <div class="footer-section">
          <h4 class="footer-title">Services</h4>
          <ul class="footer-links">
            <li><a href="#web-development" class="footer-link">Web Development</a></li>
            <li><a href="#mobile-apps" class="footer-link">Mobile Apps</a></li>
            <li><a href="#ai-solutions" class="footer-link">AI Solutions</a></li>
            <li><a href="#consulting" class="footer-link">Consulting</a></li>
            <li><a href="#digital-marketing" class="footer-link">Digital Marketing</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="footer-section newsletter">
          <h4 class="footer-title">Stay Updated</h4>
          <p class="newsletter-description">
            Get the latest insights, tips, and updates delivered to your inbox.
          </p>
          <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
            <div class="input-group">
              <input 
                type="email" 
                v-model="newsletterEmail"
                placeholder="Enter your email"
                class="newsletter-input"
                required
                :class="{ 'error': emailError }"
              />
              <button type="submit" class="newsletter-btn" :disabled="isSubscribing">
                <span v-if="!isSubscribing">Subscribe</span>
                <Loader v-else class="loader-icon" />
              </button>
            </div>
            <p v-if="emailError" class="error-message">{{ emailError }}</p>
            <p v-if="subscribeSuccess" class="success-message">{{ subscribeSuccess }}</p>
          </form>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">
            © {{ currentYear }} Erevolution India. All rights reserved.
          </p>
          <div class="footer-bottom-links">
            <a href="/privacy" class="footer-bottom-link">Privacy Policy</a>
            <a href="/terms" class="footer-bottom-link">Terms of Service</a>
            <a href="/cookies" class="footer-bottom-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to Top Button -->
    <button 
      v-show="showBackToTop" 
      @click="scrollToTop" 
      class="back-to-top"
      aria-label="Back to top"
    >
      <ArrowUp class="back-to-top-icon" />
    </button>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  ArrowUp, 
  Loader 
} from 'lucide-vue-next';

const newsletterEmail = ref('');
const emailError = ref('');
const subscribeSuccess = ref('');
const isSubscribing = ref(false);
const showBackToTop = ref(false);
const currentYear = new Date().getFullYear();

// Subscribe to newsletter
const subscribeNewsletter = async () => {
  if (!newsletterEmail.value) {
    emailError.value = 'Please enter your email address';
    return;
  }

  if (!isValidEmail(newsletterEmail.value)) {
    emailError.value = 'Please enter a valid email address';
    return;
  }

  isSubscribing.value = true;
  emailError.value = '';
  subscribeSuccess.value = '';

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    subscribeSuccess.value = 'Thank you for subscribing! We\'ll keep you updated.';
    newsletterEmail.value = '';
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      subscribeSuccess.value = '';
    }, 5000);
  } catch (error) {
    emailError.value = 'Something went wrong. Please try again.';
  } finally {
    isSubscribing.value = false;
  }
};

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Scroll to section
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
};

// Back to top functionality
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Handle scroll for back to top button
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 500;
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
@use '../../../../resources/sass/variables' as vars;

.site-footer {
  background-color: vars.$dark-bg;
  color: vars.$text-gray;
  position: relative;
  
  .footer-container {
    max-width: vars.$container-max-width;
    margin: 0 auto;
    padding: 0 2rem;
  }

  // Main Footer Content
  .footer-main {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 3rem;
    padding: 4rem 0 2rem;
    border-bottom: 1px solid rgba(vars.$text-white, 0.1);

    @media (max-width: vars.$tablet) {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    @media (max-width: vars.$mobile) {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 2rem 0 1rem;
    }
  }

  // Footer Sections
  .footer-section {
    &.company-info {
      .footer-logo {
        margin-bottom: 1rem;
        
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
            color: vars.$brand-green;
            font-weight: 600;
          }
          
          .logo-trademark {
            color: vars.$brand-gold;
            font-size: 0.6rem;
            vertical-align: super;
          }
        }
      }

      .company-description {
        color: vars.$text-gray;
        line-height: 1.6;
        margin-bottom: 1.5rem;
        font-size: 0.95rem;
      }
    }

    .footer-title {
      color: vars.$text-white;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -0.5rem;
        left: 0;
        width: 2rem;
        height: 2px;
        background: vars.$brand-teal;
        border-radius: 1px;
      }
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 0.75rem;
      }

      .footer-link {
        color: vars.$text-gray;
        text-decoration: none;
        transition: all vars.$transition-fast;
        display: inline-block;
        position: relative;
        
        &::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: vars.$brand-teal;
          transition: width vars.$transition-fast;
        }
        
        &:hover {
          color: vars.$brand-teal;
          transform: translateX(5px);
          
          &::before {
            width: 100%;
          }
        }
      }
    }

    // Newsletter Section
    &.newsletter {
      .newsletter-description {
        color: vars.$text-gray;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
        line-height: 1.5;
      }

      .newsletter-form {
        .input-group {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 2px solid rgba(vars.$text-white, 0.2);
          border-radius: vars.$border-radius;
          background-color: rgba(vars.$text-white, 0.1);
          color: vars.$text-white;
          font-size: 0.9rem;
          transition: all vars.$transition-fast;
          
          &::placeholder {
            color: rgba(vars.$text-white, 0.6);
          }
          
          &:focus {
            outline: none;
            border-color: vars.$brand-teal;
            background-color: rgba(vars.$text-white, 0.15);
          }
          
          &.error {
            border-color: vars.$brand-red;
          }
        }

        .newsletter-btn {
          padding: 0.75rem 1.5rem;
          background: vars.$brand-teal;
          color: vars.$text-white;
          border: none;
          border-radius: vars.$border-radius;
          font-weight: 600;
          cursor: pointer;
          transition: all vars.$transition-fast;
          white-space: nowrap;
          
          &:hover:not(:disabled) {
            background: vars.$brand-purple;
            transform: translateY(-1px);
          }
          
          &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          
          .loader-icon {
            width: 16px;
            height: 16px;
            animation: spin 1s linear infinite;
          }
        }

        .error-message {
          color: vars.$brand-red;
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }

        .success-message {
          color: vars.$brand-green;
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }
      }
    }
  }

  // Social Links
  .social-links {
    display: flex;
    gap: 1rem;

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(vars.$text-white, 0.1);
      border-radius: 50%;
      color: vars.$text-white;
      text-decoration: none;
      transition: all vars.$transition-fast;
      
      &:hover {
        background: vars.$brand-teal;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(vars.$brand-teal, 0.3);
      }
      
      .social-icon {
        width: 20px;
        height: 20px;
      }
    }
  }

  // Footer Bottom
  .footer-bottom {
    padding: 2rem 0;
    
    .footer-bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      
      @media (max-width: vars.$mobile) {
        flex-direction: column;
        text-align: center;
      }
    }

    .copyright {
      color: vars.$text-gray;
      font-size: 0.9rem;
    }

    .footer-bottom-links {
      display: flex;
      gap: 2rem;
      
      @media (max-width: vars.$mobile) {
        gap: 1rem;
      }
      
      .footer-bottom-link {
        color: vars.$text-gray;
        text-decoration: none;
        font-size: 0.85rem;
        transition: color vars.$transition-fast;
        
        &:hover {
          color: vars.$brand-teal;
        }
      }
    }
  }

  // Back to Top Button
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: vars.$brand-teal;
    color: vars.$text-white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all vars.$transition-fast;
    box-shadow: 0 4px 20px rgba(vars.$brand-teal, 0.3);
    z-index: 1000;
    
    &:hover {
      background: vars.$brand-purple;
      transform: translateY(-3px);
      box-shadow: 0 6px 25px rgba(vars.$brand-purple, 0.4);
    }
    
    .back-to-top-icon {
      width: 20px;
      height: 20px;
    }
    
    @media (max-width: vars.$mobile) {
      bottom: 1rem;
      right: 1rem;
      width: 45px;
      height: 45px;
    }
  }
}

// Animations
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
