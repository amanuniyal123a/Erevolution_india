<template>
  <section class="hero">
    <div class="hero-inner">
      <!-- Text Slider -->
      <div class="hero-slider" ref="sliderRef">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="hero-slide"
          :class="{ active: index === currentSlide }"
        >
          <div class="hero-text">
            <h1>{{ slide.title }}</h1>
            <p>{{ slide.subtitle }}</p>
            <div class="hero-buttons">
              <router-link to="/" class="secondary-btn">Know More</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Sticky Image -->
      <div class="hero-image">
        <img :src="slides[currentSlide].image" :alt="slides[currentSlide].title" />
      </div>
    </div>

    <!-- Tablist (outside hero-inner for better centering) -->
    <div class="tablist">
      <span
        v-for="(slide, index) in slides"
        :key="'dot-' + index"
        class="dot"
        :class="{ active: index === currentSlide }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const slides = [
  {
    title: 'Empowering Businesses with Cutting-Edge Technology',
    subtitle: "At Erevolution India, we integrate innovative technology to streamline your business processes, improving efficiency and driving growth. Discover the power of digital transformation.",
    image: new URL('@src/assets/technology.jpg', import.meta.url).href,
  },
  {
    title: 'Uncompromising Security for Your Digital Future',
    subtitle:
      "With Erevolution India, your business’s security is our priority. We offer robust cybersecurity measures to safeguard your data and systems from evolving threats.",
    image: new URL('@src/assets/security.jpg', import.meta.url).href,
  },
  {
    title: 'Committed to Delivering Excellence',
    subtitle:
      "We are passionate about delivering exceptional IT solutions and building lasting partnerships. Our mission is to help businesses thrive through innovation and commitment.",
    image: new URL('@src/assets/excellence.jpg', import.meta.url).href,
  },
  {
    title: 'Smarter Solutions with Artificial Intelligence',
    subtitle:
      "Erevolution India brings the power of AI to growing businesses. Intelligent solutions that automate, analyze, and accelerate your digital transformation.",
    image: new URL('@src/assets/bulb.jpg', import.meta.url).href,
  },
]

const currentSlide = ref(0)
const sliderRef = ref(null)

let startX = 0
let isDragging = false

function startDrag(e) {
  isDragging = true
  startX = e.pageX || e.touches[0].pageX
}

function onDrag(e) {
  if (!isDragging) return
  const x = e.pageX || e.touches[0].pageX
  const diff = startX - x

  if (diff > 50) {
    nextSlide()
    isDragging = false
  } else if (diff < -50) {
    prevSlide()
    isDragging = false
  }
}

function endDrag() {
  isDragging = false
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

function goToSlide(index) {
  currentSlide.value = index
}

onMounted(() => {
  const el = sliderRef.value
  el.addEventListener('mousedown', startDrag)
  el.addEventListener('mousemove', onDrag)
  el.addEventListener('mouseup', endDrag)
  el.addEventListener('mouseleave', endDrag)
  el.addEventListener('touchstart', startDrag)
  el.addEventListener('touchmove', onDrag)
  el.addEventListener('touchend', endDrag)

  setInterval(nextSlide, 5000)
})
</script>

<style lang="scss" scoped>

</style>
