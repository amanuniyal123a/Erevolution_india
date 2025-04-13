<template>
  <section class="leadership-section">
    <div class="container2">
      <div class="container">
      <div class="content">
        <h2><span class="highlight">Leadership</span></h2>
          <p>
          Though Erevolution India is a young venture, our core team brings rich expertise across diverse technologies. With a passion for innovation and client success, we’ve already contributed to impactful solutions across education, e-commerce, and logistics domains.
          </p>


        <div class="dots">
          <span
            v-for="(dot, index) in totalSlides"
            :key="index"
            :class="{ active: index === currentSlide }"
            @click="goToSlide(index)"
          />
        </div>
      </div>

      <div class="slider" @mousedown="startDrag" @mouseup="stopDrag" @mouseleave="stopDrag" @mousemove="drag">
        <div
          class="slides"
          :style="{
            transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)`,
            width: `${(100 * leaders.length) / visibleSlides}%`
          }"
        >
          <div class="slide" v-for="(member, index) in leaders" :key="index">
            <img :src="member.image" :alt="member.name" />
            <div class="caption">
              <h3>{{ member.name }}</h3>
              <p>{{ member.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
const localServiceImage = new URL('@src/assets/hero-img.jpg', import.meta.url).href;

const currentSlide = ref(0);
const isDragging = ref(false);
const startX = ref(0);
const visibleSlides = 3;
const leaders = [
  {
    name: "Karan Batra",
    title: "Director of Strategy",
    image: new URL('@src/assets/KaranBatra.jpeg', import.meta.url).href,
    bio: "Karan aligns business goals with tech innovation, ensuring long-term growth and sustainable digital strategies.",
  },
  {
    name: "Mehul Joshi",
    title: "Head of Engineering",
    image: new URL('@src/assets/MehulJoshi.jpeg', import.meta.url).href,
    bio: "Mehul leads the development team, driving scalable architecture and high-performance solutions across projects.",
  }, 
  {
    name: "Rohan Chhabra",
    title: "Lead AI & Infrastructure",
    image: new URL('@src/assets/RohanChhabra.jpg', import.meta.url).href,
    bio: "Rohan spearheads AI solutions and backend infrastructure, shaping our future-ready and intelligent platforms.",
  },
  {
    name: "Karan Batra",
    title: "Director of Strategy",
    image: new URL('@src/assets/KaranBatra.jpeg', import.meta.url).href,
    bio: "Karan aligns business goals with tech innovation, ensuring long-term growth and sustainable digital strategies.",
  },
 
];

const totalSlides = computed(() => Math.ceil(leaders.length / visibleSlides));

let interval = null;

const startAutoSlide = () => {
  interval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % totalSlides.value;
  }, 4000);
};

const stopAutoSlide = () => {
  if (interval) clearInterval(interval);
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

const startDrag = (e) => {
  isDragging.value = true;
  startX.value = e.clientX;
};

const stopDrag = (e) => {
  if (!isDragging.value) return;
  const diff = e.clientX - startX.value;
  if (diff > 50 && currentSlide.value > 0) {
    currentSlide.value--;
  } else if (diff < -50 && currentSlide.value < totalSlides.value - 1) {
    currentSlide.value++;
  }
  isDragging.value = false;
};

const drag = (e) => {
  if (!isDragging.value) return;
  // Optional: Add visual dragging effect here
};

onMounted(() => {
  startAutoSlide();
});
onBeforeUnmount(() => {
  stopAutoSlide();
});
</script>

<style lang="scss" scoped>

</style>