<template>
  <section class="service-slider" @mousedown.prevent @touchstart.prevent>
    <div class="header">
      <h2>
        <span class="highlight">Why clients</span> choose our services
        <span class="underline"></span>
      </h2>
    </div>

    <div
      class="slider-wrapper"
      @pointerdown="onPointerDown"
      style="touch-action: pan-y; user-select: none;"
    >
      <div
        class="slider-track"
        :style="{ transform: `translateX(-${currentIndex * slideWidth}%)` }"
      >
        <div
          class="slide"
          v-for="(service, i) in services"
          :key="i"
          :style="{ flex: `0 0 ${slideWidth}%` }"
        >
            <div class="card">
            <div class="icon-box" :style="{ backgroundColor: service.iconBg }">
            <span class="icon">{{ service.icon }}</span>
            </div>
            <h6>{{ service.title }}</h6>
            <p>{{ service.description }}</p>
            </div>

        </div>
      </div>
    </div>

    <div class="dots">
      <span
        v-for="(dot, i) in pageCount"
        :key="i"
        :class="{ active: i === currentIndex }"
        @click="goToSlide(i)"
      ></span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
const localServiceImage = new URL('@src/assets/hero-img.jpg', import.meta.url).href;

const services = [
  {
    title: 'Custom Software Development',
    description:
      'From web platforms to mobile apps, we build tailored digital products aligned with your business needs.',
    icon: '🧩',
    iconBg: '#B5EAEA' // Soft teal
  },
  {
    title: 'AI-Powered Solutions',
    description:
      'We integrate AI into your workflow — whether it\'s automation, analytics, or smart user experience.',
    icon: '🧠',
    iconBg: '#D1C4E9' // Soft lavender
  },
  {
    title: 'End-to-End Project Delivery',
    description:
      'We manage full project lifecycles — from planning to deployment — ensuring on-time, quality results.',
    icon: '📦',
    iconBg: '#FFE0B2' // Warm beige-orange
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Modern infrastructure setup, CI/CD pipelines, and reliable cloud services built for scalability.',
    icon: '🚀',
    iconBg: '#C8E6C9' // Mint green
  },
  {
    title: 'Tech Consulting for Startups',
    description:
      'We guide early-stage teams with smart strategies, lean tech choices, and scalable architecture.',
    icon: '📈',
    iconBg: '#F8BBD0' // Soft pink
  },
  {
    title: 'UI/UX & Product Design',
    description:
      'Clean, user-focused interfaces that help users navigate with ease and enjoy every interaction.',
    icon: '🎯',
    iconBg: '#FFF9C4' // Light yellow
  },
  {
    title: 'Data & Analytics',
    description:
      'Transform your raw data into actionable insights using smart visualization and performance tracking.',
    icon: '📊',
    iconBg: '#AED581' // Fresh green
  },
  {
    title: 'Security-First Development',
    description:
      'We follow industry-grade security protocols from day one — no shortcuts, no compromises.',
    icon: '🛡️',
    iconBg: '#FFCDD2' // Soft coral red
  }
];

const currentIndex = ref(0);
const slidesPerView = ref(3);
const isAutoPlaying = ref(true);

// Enhanced responsive breakpoints
function getSlidesPerView() {
  const width = window.innerWidth;
  if (width < 480) return 1;      // Mobile
  if (width < 768) return 1;      // Small tablet
  if (width < 1024) return 2;     // Tablet
  if (width < 1200) return 2;     // Small desktop
  return 3;                       // Desktop
}

const slideWidth = computed(() => 100 / slidesPerView.value);
const pageCount = computed(() => Math.max(0, services.length - slidesPerView.value + 1));

// Enhanced resize handler
function handleResize() {
  const newSlidesPerView = getSlidesPerView();
  if (newSlidesPerView !== slidesPerView.value) {
    slidesPerView.value = newSlidesPerView;
    // Adjust current index to prevent out of bounds
    if (currentIndex.value > pageCount.value - 1) {
      currentIndex.value = Math.max(0, pageCount.value - 1);
    }
  }
}

// Auto-play functionality
let interval;

function startAutoPlay() {
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    if (isAutoPlaying.value && pageCount.value > 1) {
      currentIndex.value = (currentIndex.value + 1) % pageCount.value;
    }
  }, 5000);
}

function stopAutoPlay() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

// Pause auto-play on user interaction
function pauseAutoPlay() {
  isAutoPlaying.value = false;
  setTimeout(() => {
    isAutoPlaying.value = true;
  }, 3000);
}

// Navigation functions
function nextSlide() {
  if (pageCount.value > 1) {
    currentIndex.value = (currentIndex.value + 1) % pageCount.value;
    pauseAutoPlay();
  }
}

function prevSlide() {
  if (pageCount.value > 1) {
    currentIndex.value = (currentIndex.value - 1 + pageCount.value) % pageCount.value;
    pauseAutoPlay();
  }
}

function goToSlide(index) {
  if (index >= 0 && index < pageCount.value) {
    currentIndex.value = index;
    pauseAutoPlay();
  }
}

// Enhanced drag functionality
const isDragging = ref(false);
let startX = 0;
let startY = 0;
let dragDistance = 0;

function onPointerDown(e) {
  isDragging.value = true;
  startX = e.clientX || e.touches?.[0]?.clientX;
  startY = e.clientY || e.touches?.[0]?.clientY;
  dragDistance = 0;
  
  stopAutoPlay();
  
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
  document.addEventListener('pointercancel', onPointerUp);
}

function onPointerMove(e) {
  if (!isDragging.value) return;
  
  const currentX = e.clientX || e.touches?.[0]?.clientX;
  const currentY = e.clientY || e.touches?.[0]?.clientY;
  
  const diffX = currentX - startX;
  const diffY = currentY - startY;
  
  // Only trigger if horizontal movement is greater than vertical
  if (Math.abs(diffX) > Math.abs(diffY)) {
    dragDistance = diffX;
  }
}

function onPointerUp() {
  if (!isDragging.value) return;
  
  if (Math.abs(dragDistance) > 50) {
    if (dragDistance < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
  
  isDragging.value = false;
  dragDistance = 0;
  
  startAutoPlay();
  
  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);
  document.removeEventListener('pointercancel', onPointerUp);
}

// Keyboard navigation
function handleKeydown(event) {
  if (event.key === 'ArrowLeft') {
    prevSlide();
  } else if (event.key === 'ArrowRight') {
    nextSlide();
  }
}

// Watch for pageCount changes
watch(pageCount, (newCount) => {
  if (currentIndex.value >= newCount) {
    currentIndex.value = Math.max(0, newCount - 1);
  }
});

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
  document.addEventListener('keydown', handleKeydown);
  
  startAutoPlay();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('keydown', handleKeydown);
  stopAutoPlay();
});
</script>

<style lang="scss" scoped>
@use '../../../../resources/sass/variables' as vars;

.service-slider {
  padding: 4rem 0;
  background: vars.$dark-bg;
  position: relative;
  overflow: hidden;
  
  @media (max-width: vars.$tablet) {
    padding: 3rem 0;
  }
  
  @media (max-width: vars.$mobile) {
    padding: 2rem 0;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 0 2rem;
    
    @media (max-width: vars.$mobile) {
      margin-bottom: 2rem;
      padding: 0 1rem;
    }

    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: vars.$text-white;
      position: relative;
      display: inline-block;
      
      @media (max-width: vars.$tablet) {
        font-size: 2rem;
      }
      
      @media (max-width: vars.$mobile) {
        font-size: 1.5rem;
      }

      .highlight {
        background: linear-gradient(135deg, vars.$brand-teal, vars.$brand-green);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .underline {
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 3px;
        background: linear-gradient(135deg, vars.$brand-teal, vars.$brand-green);
        border-radius: 2px;
        
        @media (max-width: vars.$mobile) {
          width: 40px;
          height: 2px;
          bottom: -8px;
        }
      }
    }
  }

  .slider-wrapper {
    max-width: vars.$container-wide;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    
    @media (max-width: vars.$tablet) {
      padding: 0 1.5rem;
    }
    
    @media (max-width: vars.$mobile) {
      padding: 0 1rem;
    }

    .slider-track {
      display: flex;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      gap: 2rem;
      
      @media (max-width: vars.$tablet) {
        gap: 1.5rem;
      }
      
      @media (max-width: vars.$mobile) {
        gap: 1rem;
      }

      .slide {
        flex-shrink: 0;
        
        .card {
          background: rgba(vars.$text-white, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(vars.$text-white, 0.1);
          border-radius: vars.$border-radius;
          padding: 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all vars.$transition-fast;
          cursor: grab;
          text-align: center;
          
          @media (max-width: vars.$tablet) {
            padding: 1.5rem;
          }
          
          @media (max-width: vars.$mobile) {
            padding: 1.25rem;
          }

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(vars.$brand-teal, 0.2);
            border-color: vars.$brand-teal;
          }

          &:active {
            cursor: grabbing;
          }

          .icon-box {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            transition: all vars.$transition-fast;
            
            @media (max-width: vars.$tablet) {
              width: 70px;
              height: 70px;
              margin-bottom: 1.25rem;
            }
            
            @media (max-width: vars.$mobile) {
              width: 60px;
              height: 60px;
              margin-bottom: 1rem;
            }

            .icon {
              font-size: 2rem;
              
              @media (max-width: vars.$tablet) {
                font-size: 1.75rem;
              }
              
              @media (max-width: vars.$mobile) {
                font-size: 1.5rem;
              }
            }
          }

          h6 {
            color: vars.$text-white;
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0 0 1rem 0;
            
            @media (max-width: vars.$tablet) {
              font-size: 1.1rem;
              margin-bottom: 0.75rem;
            }
            
            @media (max-width: vars.$mobile) {
              font-size: 1rem;
              margin-bottom: 0.5rem;
            }
          }

          p {
            color: vars.$text-gray;
            font-size: 1rem;
            line-height: 1.6;
            margin: 0;
            flex: 1;
            
            @media (max-width: vars.$tablet) {
              font-size: 0.95rem;
            }
            
            @media (max-width: vars.$mobile) {
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }

  .dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
    
    @media (max-width: vars.$mobile) {
      margin-top: 1.5rem;
    }

    span {
      width: 40px;
      height: 4px;
      background: rgba(vars.$text-white, 0.3);
      border-radius: 2px;
      cursor: pointer;
      transition: all vars.$transition-fast;
      
      @media (max-width: vars.$mobile) {
        width: 30px;
        height: 3px;
      }

      &:hover {
        background: rgba(vars.$text-white, 0.5);
      }

      &.active {
        background: vars.$brand-teal;
        transform: scaleX(1.2);
      }
    }
  }
}

// Responsive breakpoint adjustments
@media (max-width: 1200px) {
  .service-slider .slider-wrapper .slider-track .slide .card {
    padding: 1.75rem;
  }
}

@media (max-width: 768px) {
  .service-slider {
    .slider-wrapper {
      .slider-track {
        .slide {
          .card {
            padding: 1.5rem;
            
            .icon-box {
              width: 65px;
              height: 65px;
              
              .icon {
                font-size: 1.6rem;
              }
            }
            
            h6 {
              font-size: 1.05rem;
            }
            
            p {
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .service-slider {
    .slider-wrapper {
      .slider-track {
        .slide {
          .card {
            padding: 1.25rem;
            
            .icon-box {
              width: 55px;
              height: 55px;
              
              .icon {
                font-size: 1.4rem;
              }
            }
            
            h6 {
              font-size: 0.95rem;
            }
            
            p {
              font-size: 0.85rem;
            }
          }
        }
      }
    }
    
    .dots span {
      width: 25px;
      height: 3px;
    }
  }
}

// Animation for smooth transitions
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide {
  animation: fadeInUp 0.6s ease-out;
}

// Touch and drag improvements
.slider-wrapper {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  
  .slider-track {
    will-change: transform;
  }
}

// Accessibility improvements
.card {
  &:focus {
    outline: 2px solid vars.$brand-teal;
    outline-offset: 2px;
  }
}

.dots span {
  &:focus {
    outline: 2px solid vars.$brand-teal;
    outline-offset: 2px;
    border-radius: 4px;
  }
}
</style>
