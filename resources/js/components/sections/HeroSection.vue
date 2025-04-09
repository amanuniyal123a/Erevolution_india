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
              <router-link to="/" class="secondary-btn">Contact Us</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Sticky Image -->
      <div class="hero-image">
        <img :src="slides[currentSlide].image" :alt="slides[currentSlide].title" />
      </div>

      <!-- Tablist MOVED here -->
      <div class="tablist">
        <span
          v-for="(slide, index) in slides"
          :key="'dot-' + index"
          class="dot"
          :class="{ active: index === currentSlide }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </section>
</template>



<script setup>
import { ref, onMounted } from 'vue'
const slides = [
  {
    title: 'Welcome to Erevolution India',
    subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: new URL('@src/assets/hero-image.jpg', import.meta.url).href,
  },
  {
    title: 'Innovate with Us',
    subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: new URL('@src/assets/hero-img.jpg', import.meta.url).href,
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
