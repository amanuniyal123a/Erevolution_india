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
import { ref, onMounted, onUnmounted, computed } from 'vue';
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

function getSlidesPerView() {
  const width = window.innerWidth;
  if (width < 576) return 1;
  if (width < 992) return 2;
  return 3;
}

const slideWidth = computed(() => 100 / slidesPerView.value);
const pageCount = computed(() => testimonials.length - slidesPerView.value + 1);

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
