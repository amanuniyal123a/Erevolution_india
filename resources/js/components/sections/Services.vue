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
        @click="currentIndex = i"
      ></span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
const localServiceImage = new URL('@src/assets/hero-img.jpg', import.meta.url).href;

const services = [
  {
    title: 'Software Consulting',
    description:
      'We help companies navigate tech challenges with strategic consulting, from system optimization to creative digital strategy.',
    icon: '💡',
    iconBg: '#FFB6C1' // Light pink
  },
  {
    title: 'Technology Solutions',
    description:
      'Enterprise-grade technology and custom app development designed to meet your business goals.',
    icon: '🛠️',
    iconBg: '#D8B4FE' // Soft purple
  },
  {
    title: 'AI and Data Solutions',
    description:
      'Harness AI and analytics to optimize efficiency, enhance processes, and gain a competitive edge.',
    icon: '🤖',
    iconBg: '#87CEEB' // Sky blue
  },
  {
    title: 'Cloud Infrastructure',
    description:
      'Deploy reliable, scalable cloud infrastructure and reduce downtime with our expert solutions.',
    icon: '☁️',
    iconBg: '#A0E7E5' // Cyan tint
  },
  {
    title: 'Product Design',
    description:
      'UX-focused, beautiful and functional designs to make your product intuitive and delightful.',
    icon: '🎨',
    iconBg: '#FFD580' // Soft yellow-orange
  },
  {
    title: 'Cybersecurity',
    description:
      'We protect your digital assets with best-in-class security protocols and risk mitigation strategies.',
    icon: '🔒',
    iconBg: '#FF9999' // Coral
  },
];


const currentIndex = ref(0);
const slidesPerView = ref(3);

function getSlidesPerView() {
  const width = window.innerWidth;
  if (width < 576) return 1;
  if (width < 992) return 2;
  return 3;
}

const slideWidth = computed(() => 100 / slidesPerView.value);
const pageCount = computed(() => services.length - slidesPerView.value + 1);

function handleResize() {
  slidesPerView.value = getSlidesPerView();
  if (currentIndex.value > pageCount.value - 1) {
    currentIndex.value = 0;
  }
}

let interval;

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);

  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % pageCount.value;
  }, 5000);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  clearInterval(interval);
});

// Drag functionality
const isDragging = ref(false);
let startX = 0;

function onPointerDown(e) {
  isDragging.value = true;
  startX = e.clientX || e.touches?.[0]?.clientX;
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
}

function onPointerMove(e) {
  if (!isDragging.value) return;
  const currentX = e.clientX || e.touches?.[0]?.clientX;
  const diffX = currentX - startX;

  if (Math.abs(diffX) > 50) {
    if (diffX < 0) {
      currentIndex.value = (currentIndex.value + 1) % pageCount.value;
    } else {
      currentIndex.value = (currentIndex.value - 1 + pageCount.value) % pageCount.value;
    }
    onPointerUp();
  }
}

function onPointerUp() {
  isDragging.value = false;
  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);
}
</script>

<style lang="scss" scoped>
.service-slider {
  background: linear-gradient(to right, #424748, #0d3667);
  padding: 3rem 1rem;
  text-align: center;
  user-select: none;

  .header {
    margin-bottom: 2rem;

    h2 {
      font-size: 2rem;
      font-weight: bold;

      .highlight {
        color: burlywood;
      }

      .underline {
        display: inline-block;
        width: 2rem;
        height: 4px;
        background: burlywood;
        margin-left: 0.5rem;
        vertical-align: middle;
      }
    }
  }

  .slider-wrapper {
    overflow: hidden;
    max-width: 1100px;
    margin: 0 auto;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  .slider-track {
    display: flex;
    transition: transform 0.5s ease-in-out;
    width: 100%;
  }

  .slide {
    box-sizing: border-box;
    padding: 1rem;

    .card {
  background: cornsilk;
  padding: 2rem 1.5rem;
  border-radius: 1.25rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;

  .icon-box {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;

    .icon {
      font-size: 1.5rem;
    }
  }

  h6 {
    font-weight: 700;
    font-size: 1.1rem;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: #4b5563;
    line-height: 1.4;
  }
}

  }

  .dots {
    margin-top: 1rem;

    span {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      margin: 0 5px;
      cursor: pointer;
      transition: background 0.3s;

      &.active {
        background: burlywood;
      }
    }
  }
}
</style>
