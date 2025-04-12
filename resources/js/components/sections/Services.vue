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
</style>
