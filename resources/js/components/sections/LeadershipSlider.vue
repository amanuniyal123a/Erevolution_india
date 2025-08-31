<template>
  <section class="leadership-section" id="leadership">
    <div class="leadership-container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="header-content">
          <h2 class="section-title">
            Meet Our <span class="highlight">Leadership</span> Team
          </h2>
          <p class="section-description">
            Though Erevolution India is a young venture, our core team brings rich expertise across diverse technologies. 
            With a passion for innovation and client success, we've already contributed to impactful solutions across 
            education, e-commerce, and logistics domains.
          </p>
        </div>
      </div>

      <!-- Leadership Slider -->
      <div class="leadership-slider-container">
        <!-- Navigation Arrows -->
        <button 
          class="slider-nav prev" 
          @click="prevSlide"
          :disabled="currentSlide === 0"
          aria-label="Previous slide"
        >
          <ChevronLeft class="nav-icon" />
        </button>
        
        <button 
          class="slider-nav next" 
          @click="nextSlide"
          :disabled="currentSlide >= maxSlides - 1"
          aria-label="Next slide"
        >
          <ChevronRight class="nav-icon" />
        </button>

        <!-- Slider Track -->
        <div 
          class="slider-track" 
          ref="sliderRef"
          @mousedown="startDrag"
          @mousemove="onDrag"
          @mouseup="endDrag"
          @mouseleave="endDrag"
          @touchstart="startDrag"
          @touchmove="onDrag"
          @touchend="endDrag"
        >
          <div 
            class="slider-wrapper"
            :style="{ transform: `translateX(-${currentSlide * slideWidth}%)` }"
          >
            <div 
              v-for="(member, index) in leaders" 
              :key="index"
              class="leader-card"
              :class="{ active: isActiveSlide(index) }"
            >
              <div class="card-image">
                <img :src="member.image" :alt="member.name" />
                <div class="image-overlay">
                  <div class="social-links">
                    <a href="#" class="social-link" aria-label="LinkedIn">
                      <Linkedin class="social-icon" />
                    </a>
                    <a href="#" class="social-link" aria-label="Twitter">
                      <Twitter class="social-icon" />
                    </a>
                    <a href="#" class="social-link" aria-label="Email">
                      <Mail class="social-icon" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div class="card-content">
                <h3 class="leader-name">{{ member.name }}</h3>
                <p class="leader-title">{{ member.title }}</p>
                <p class="leader-bio">{{ member.bio }}</p>
                
                <div class="leader-stats">
                  <div class="stat-item">
                    <span class="stat-number">5+</span>
                    <span class="stat-label">Years Exp</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-number">50+</span>
                    <span class="stat-label">Projects</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-number">100%</span>
                    <span class="stat-label">Success</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Indicators -->
        <div class="slider-progress">
          <div class="progress-track">
            <div 
              class="progress-bar" 
              :style="{ width: `${(currentSlide + 1) / maxSlides * 100}%` }"
            ></div>
          </div>
          
          <div class="slide-indicators">
            <button
              v-for="index in maxSlides"
              :key="index"
              class="indicator-dot"
              :class="{ active: currentSlide === index - 1 }"
              @click="goToSlide(index - 1)"
              :aria-label="`Go to slide ${index}`"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, onUnmounted } from 'vue';
import { 
  ChevronLeft, 
  ChevronRight, 
  Linkedin, 
  Twitter, 
  Mail 
} from 'lucide-vue-next';

const leaders = [
  {
    name: "Karan Batra",
    title: "Director of Strategy",
    image: new URL('@src/assets/KaranBatra.jpeg', import.meta.url).href,
    bio: "Karan aligns business goals with tech innovation, ensuring long-term growth and sustainable digital strategies.",
    linkedin: "#",
    twitter: "#",
    email: "karan@erevolutionindia.com"
  },
  {
    name: "Mehul Joshi",
    title: "Head of Engineering",
    image: new URL('@src/assets/MehulJoshi.jpeg', import.meta.url).href,
    bio: "Mehul leads the development team, driving scalable architecture and high-performance solutions across projects.",
    linkedin: "#",
    twitter: "#",
    email: "mehul@erevolutionindia.com"
  },
  {
    name: "Rohan Chhabra",
    title: "Lead AI & Infrastructure",
    image: new URL('@src/assets/RohanChhabra.jpg', import.meta.url).href,
    bio: "Rohan spearheads AI solutions and backend infrastructure, shaping our future-ready and intelligent platforms.",
    linkedin: "#",
    twitter: "#",
    email: "rohan@erevolutionindia.com"
  },
  {
    name: "Arjun Kapoor",
    title: "Senior Frontend Architect",
    image: new URL('@src/assets/ArjunKapoor.jpeg', import.meta.url).href,
    bio: "Arjun crafts exceptional user experiences with modern frontend technologies and innovative design patterns.",
    linkedin: "#",
    twitter: "#",
    email: "arjun@erevolutionindia.com"
  },
  {
    name: "Neha Sinha",
    title: "UX/UI Design Lead",
    image: new URL('@src/assets/NehaSinha.png', import.meta.url).href,
    bio: "Neha creates intuitive and beautiful user interfaces that enhance user engagement and drive business success.",
    linkedin: "#",
    twitter: "#",
    email: "neha@erevolutionindia.com"
  },
  {
    name: "Rahul Mehra",
    title: "DevOps & Cloud Specialist",
    image: new URL('@src/assets/RahulMehra.jpeg', import.meta.url).href,
    bio: "Rahul ensures seamless deployment and scalable cloud infrastructure for all our digital solutions.",
    linkedin: "#",
    twitter: "#",
    email: "rahul@erevolutionindia.com"
  }
];

// Responsive configuration
const getVisibleSlides = () => {
  if (window.innerWidth < 768) return 1; // Mobile
  if (window.innerWidth < 1024) return 2; // Tablet
  return 3; // Desktop
};

const currentSlide = ref(0);
const visibleSlides = ref(getVisibleSlides());
const slideWidth = ref(100 / visibleSlides.value);
const maxSlides = computed(() => Math.max(1, leaders.length - visibleSlides.value + 1));
const sliderRef = ref(null);
const autoPlayInterval = ref(null);

// Touch/Drag functionality
let startX = 0;
let isDragging = false;
let dragDistance = 0;

// Auto-play functionality
const startAutoPlay = () => {
  if (autoPlayInterval.value) clearInterval(autoPlayInterval.value);
  autoPlayInterval.value = setInterval(() => {
    if (currentSlide.value < maxSlides.value - 1) {
      currentSlide.value++;
    } else {
      currentSlide.value = 0;
    }
  }, 4000);
};

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
    autoPlayInterval.value = null;
  }
};

// Navigation functions
const nextSlide = () => {
  if (currentSlide.value < maxSlides.value - 1) {
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

const goToSlide = (index) => {
  currentSlide.value = Math.max(0, Math.min(index, maxSlides.value - 1));
};

const isActiveSlide = (index) => {
  return index >= currentSlide.value && index < currentSlide.value + visibleSlides.value;
};

// Touch/Drag handlers
const startDrag = (e) => {
  isDragging = true;
  startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
  dragDistance = 0;
  stopAutoPlay();
};

const onDrag = (e) => {
  if (!isDragging) return;
  e.preventDefault();
  
  const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
  dragDistance = startX - x;
};

const endDrag = () => {
  if (!isDragging) return;
  
  if (dragDistance > 50 && currentSlide.value < maxSlides.value - 1) {
    nextSlide();
  } else if (dragDistance < -50 && currentSlide.value > 0) {
    prevSlide();
  }
  
  isDragging = false;
  startAutoPlay();
};

// Handle window resize
const handleResize = () => {
  const newVisibleSlides = getVisibleSlides();
  if (newVisibleSlides !== visibleSlides.value) {
    visibleSlides.value = newVisibleSlides;
    slideWidth.value = 100 / visibleSlides.value;
    // Adjust current slide if needed
    if (currentSlide.value >= maxSlides.value) {
      currentSlide.value = Math.max(0, maxSlides.value - 1);
    }
  }
};

// Keyboard navigation
const handleKeydown = (event) => {
  if (event.key === 'ArrowLeft') {
    prevSlide();
  } else if (event.key === 'ArrowRight') {
    nextSlide();
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('resize', handleResize);
  document.addEventListener('keydown', handleKeydown);
  startAutoPlay();
});

onBeforeUnmount(() => {
  stopAutoPlay();
  document.removeEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  stopAutoPlay();
});
</script>

<style lang="scss" scoped>
@use '../../../../resources/sass/variables' as vars;

.leadership-section {
  background: vars.$dark-bg;
  padding: 6rem 0;
  position: relative;
  
  @media (max-width: vars.$mobile) {
    padding: 4rem 0;
  }
  
  .leadership-container {
    max-width: vars.$container-wide;
    margin: 0 auto;
    padding: 0 2rem;
    
    @media (max-width: vars.$mobile) {
      padding: 0 1rem;
    }
  }

  // Section Header
  .section-header {
    text-align: center;
    margin-bottom: 4rem;
    
    .header-content {
      max-width: 800px;
      margin: 0 auto;
      
      .section-title {
        font-size: 3rem;
        font-weight: 700;
        color: vars.$text-white;
        margin-bottom: 1.5rem;
        
        .highlight {
          background: linear-gradient(135deg, vars.$brand-teal, vars.$brand-green);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        @media (max-width: vars.$tablet) {
          font-size: 2.5rem;
        }
        
        @media (max-width: vars.$mobile) {
          font-size: 2rem;
        }
      }
      
      .section-description {
        font-size: 1.1rem;
        line-height: 1.6;
        color: vars.$text-gray;
        
        @media (max-width: vars.$mobile) {
          font-size: 1rem;
        }
      }
    }
  }

  // Leadership Slider
  .leadership-slider-container {
    position: relative;
    
    // Navigation Arrows
    .slider-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      background: rgba(vars.$text-white, 0.1);
      border: 1px solid rgba(vars.$text-white, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all vars.$transition-fast;
      z-index: 10;
      
      &:hover:not(:disabled) {
        background: vars.$brand-teal;
        border-color: vars.$brand-teal;
        transform: translateY(-50%) scale(1.1);
      }
      
      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
      
      .nav-icon {
        width: 20px;
        height: 20px;
        color: vars.$text-white;
      }
      
      &.prev {
        left: -25px;
        
        @media (max-width: vars.$mobile) {
          left: 10px;
        }
      }
      
      &.next {
        right: -25px;
        
        @media (max-width: vars.$mobile) {
          right: 10px;
        }
      }
    }

    // Slider Track
    .slider-track {
      overflow: hidden;
      border-radius: 20px;
      cursor: grab;
      
      &:active {
        cursor: grabbing;
      }
      
      .slider-wrapper {
        display: flex;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        
        .leader-card {
          flex: 0 0 calc(100% / 3);
          padding: 0 1rem;
          transition: all 0.3s ease;
          
          @media (max-width: vars.$tablet) {
            flex: 0 0 calc(100% / 2);
          }
          
          @media (max-width: vars.$mobile) {
            flex: 0 0 100%;
            padding: 0 0.5rem;
          }
          
          &.active {
            transform: scale(1.05);
          }
          
          .card-image {
            position: relative;
            border-radius: 15px;
            overflow: hidden;
            margin-bottom: 1.5rem;
            aspect-ratio: 1;
            
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform 0.3s ease;
            }
            
            .image-overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(
                to bottom,
                transparent 0%,
                rgba(0, 0, 0, 0.7) 100%
              );
              opacity: 0;
              transition: opacity 0.3s ease;
              display: flex;
              align-items: flex-end;
              padding: 1.5rem;
              
              .social-links {
                display: flex;
                gap: 0.75rem;
                
                .social-link {
                  width: 40px;
                  height: 40px;
                  background: rgba(vars.$text-white, 0.2);
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  transition: all 0.3s ease;
                  
                  &:hover {
                    background: vars.$brand-teal;
                    transform: translateY(-2px);
                  }
                  
                  .social-icon {
                    width: 18px;
                    height: 18px;
                    color: vars.$text-white;
                  }
                }
              }
            }
            
            &:hover {
              .image-overlay {
                opacity: 1;
              }
              
              img {
                transform: scale(1.1);
              }
            }
          }
          
          .card-content {
            text-align: center;
            
            .leader-name {
              font-size: 1.5rem;
              font-weight: 600;
              color: vars.$text-white;
              margin-bottom: 0.5rem;
            }
            
            .leader-title {
              font-size: 1rem;
              color: vars.$brand-teal;
              font-weight: 500;
              margin-bottom: 1rem;
            }
            
            .leader-bio {
              font-size: 0.9rem;
              line-height: 1.5;
              color: vars.$text-gray;
              margin-bottom: 1.5rem;
            }
            
            .leader-stats {
              display: flex;
              justify-content: center;
              gap: 1.5rem;
              
              .stat-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                
                .stat-number {
                  font-size: 1.25rem;
                  font-weight: 700;
                  color: vars.$brand-teal;
                }
                
                .stat-label {
                  font-size: 0.75rem;
                  color: vars.$text-gray;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
              }
            }
          }
        }
      }
    }

    // Progress Indicators
    .slider-progress {
      margin-top: 2rem;
      
      .progress-track {
        width: 100%;
        height: 4px;
        background: rgba(vars.$text-white, 0.2);
        border-radius: 2px;
        margin-bottom: 1rem;
        overflow: hidden;
        
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, vars.$brand-teal, vars.$brand-purple);
          border-radius: 2px;
          transition: width 0.3s ease;
        }
      }
      
      .slide-indicators {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        
        .indicator-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(vars.$text-white, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          
          &:hover {
            background: rgba(vars.$text-white, 0.5);
          }
          
          &.active {
            background: vars.$brand-teal;
            transform: scale(1.2);
          }
        }
      }
    }
  }
}
</style>