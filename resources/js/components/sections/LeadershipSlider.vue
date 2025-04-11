<template>
  <section class="leadership-section">
    <div class="container">
      <div class="content">
        <h2><span class="highlight">Leadership</span></h2>
        <p>
          Our team members have over 25 years of experience. We have an extensive portfolio
          of working with different companies and projects from various parts of the world.
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
    name: 'Vishal Sagar',
    title: 'Vice President Business Development',
    image: localServiceImage,
  },
  {
    name: 'Vivek Sharma',
    title: 'Vice President Operations',
    image: localServiceImage,
  },
  {
    name: 'Ajay Tewari',
    title: 'Global CEO',
    image: localServiceImage,
  },
  {
    name: 'Anita Kapoor',
    title: 'Chief Marketing Officer',
    image: localServiceImage,
  },
  {
    name: 'Rahul Verma',
    title: 'Chief Technical Officer',
    image: localServiceImage,
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
.leadership-section {
  width: 100%;
  background: #121212;
  padding: 4rem 1rem;

  .container {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .content {
    flex: 1 1 30rem;
    max-width: 600px;
    margin-bottom:auto;
    h2 {
      font-size: 2.5rem;
      font-weight: bold;
      .highlight {
        color: #e63946;
      }
    }

    p {
      margin-top: 1rem;
      font-size: 1.125rem;
      color: #fff;
    }

    .dots {
      display: flex;
      gap: 10px;
      margin-top: 5rem;

      span {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 1px solid #aaa;
        cursor: pointer;
        transition: 0.3s;
      }

      .active {
        background: #e63946;
        border-color: #e63946;
      }
    }
  }

  .slider {
    flex: 1 1 50rem;
    overflow: hidden;
    position: relative;

    .slides {
      display: flex;
      transition: transform 0.5s ease;
    }

    .slide {
      flex: 0 0 calc(100% / 3);
      padding: 0 0.5rem;
      box-sizing: border-box;

      img {
        width: 100%;
        max-width: 400px;
        height: auto;
        border-radius: 1.5rem;
      }

      .caption {
        background: #272323;
        border-top: 5px solid burlywood;
        margin-top: 1rem;
        border-radius: 1rem;
        padding: 1rem;

        h3 {
          font-weight: 700;
          font-size: 1.2rem;
        color: burlywood;

        }

        p {
          margin-top: 0.5rem;
          color: #fff;
        }
      }
    }
  }
}
</style>