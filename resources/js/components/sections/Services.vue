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
    title: 'Custom Software Development',
    description:
      'From web platforms to mobile apps, we build tailored digital products aligned with your business needs.',
    icon: '🧩',
    iconBg: '#B5EAEA' // Soft teal
  },
  {
    title: 'AI-Powered Solutions',
    description:
      'We integrate AI into your workflow — whether it’s automation, analytics, or smart user experience.',
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
