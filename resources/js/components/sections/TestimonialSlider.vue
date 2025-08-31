<template>
  <section class="testimonial-slider" @mousedown.prevent @touchstart.prevent>
    <div class="header">
      <h2>
        <span class="highlight">Why customers</span> love working with us
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
          v-for="(testimonial, i) in testimonials"
          :key="i"
          :style="{ flex: `0 0 ${slideWidth}%` }"
        >
          <div class="card">
            <img :src="testimonial.image" alt="Photo" />
            <p>{{ testimonial.text }}</p>
            <div>
           
            <h6>{{ testimonial.name }}</h6>
          </div>
        </div>
        </div>
      </div>
    </div>

    <div class="dots">
      <span
        v-for="(dot, i) in pageCount"
        :key="i"
        :class="{ active: i === currentIndex }"
        @click="currentIndex = i"
      ></span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';

const localHeroImage = new URL('@src/assets/hero-img.jpg', import.meta.url).href;
const testimonials = [
  { name: 'Ayesha Verma', text: 'Erevolution India understood our startup vision from day one. Their approach was modern, collaborative, and incredibly efficient',image: new URL('@src/assets/AyeshaVerma.jpeg', import.meta.url).href },
  { name: 'Rahul Mehra', text: 'We needed a reliable partner for our AI backend — Erevolution India nailed it. Quick turnaround, transparent communication, and smart solutions.', image: new URL('@src/assets/RahulMehra.jpeg', import.meta.url).href },
  { name: 'Neha Sinha', text: 'The team delivered more than we expected. The design was clean, the performance was sharp, and the support was spot on.', image: new URL('@src/assets/NehaSinha.png', import.meta.url).href },
  { name: 'James R. Peterson', text: 'Erevolution India is a rising star in IT services. Their fresh energy and deep tech skills make them a great partner for fast-paced projects', image: new URL('@src/assets/Peterson.png', import.meta.url).href },
  { name: 'Sneha Iyer', text: 'As a growing eCommerce startup, we needed scalable tech. Erevolution India delivered exactly what we needed — and then some.', image: new URL('@src/assets/SnehaIyer.jpeg', import.meta.url).href},
  { name: 'Arjun Kapoor', text: 'The collaboration was smooth and productive. They handled our AI integration with a deep understanding of business needs.', image: new URL('@src/assets/ArjunKapoor.jpeg', import.meta.url).href },
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
const pageCount = computed(() => Math.max(0, testimonials.length - slidesPerView.value + 1));

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

.testimonial-slider {
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

          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 1.5rem;
            border: 3px solid vars.$brand-teal;
            
            @media (max-width: vars.$mobile) {
              width: 50px;
              height: 50px;
              margin-bottom: 1rem;
            }
          }

          p {
            color: vars.$text-gray;
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            flex: 1;
            font-style: italic;
            
            @media (max-width: vars.$tablet) {
              font-size: 0.95rem;
            }
            
            @media (max-width: vars.$mobile) {
              font-size: 0.9rem;
              margin-bottom: 1rem;
            }
          }

          h6 {
            color: vars.$text-white;
            font-size: 1.1rem;
            font-weight: 600;
            margin: 0;
            
            @media (max-width: vars.$mobile) {
              font-size: 1rem;
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
  .testimonial-slider .slider-wrapper .slider-track .slide .card {
    padding: 1.75rem;
  }
}

@media (max-width: 768px) {
  .testimonial-slider {
    .slider-wrapper {
      .slider-track {
        .slide {
          .card {
            padding: 1.5rem;
            
            img {
              width: 55px;
              height: 55px;
            }
            
            p {
              font-size: 0.95rem;
            }
            
            h6 {
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .testimonial-slider {
    .slider-wrapper {
      .slider-track {
        .slide {
          .card {
            padding: 1.25rem;
            
            img {
              width: 50px;
              height: 50px;
            }
            
            p {
              font-size: 0.9rem;
            }
            
            h6 {
              font-size: 0.95rem;
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
