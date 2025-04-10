<template>
  <section class="industries-section">
    <div class="container">
      <h2 class="section-title">Industries <span class="underline"></span></h2>
      <div class="card-grid">
        <div
          v-for="industry in industries"
          :key="industry.title"
          class="industry-card"
        >
          <img :src="industry.image" :alt="industry.title" />
          <h3>{{ industry.title }}</h3>
          <p>{{ industry.description }}</p>
          <a href="#" class="read-more">Read More</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const localHeroImage = new URL('@src/assets/hero-img.jpg', import.meta.url).href;

const industries = [
  {
    title: 'Healthcare',
    image: localHeroImage,
    description: 'Erevolution India is a leader in healthcare software development, providing innovative and customized solutions to elevate patient care.',
  },
  {
    title: 'Enterprise SaaS & PaaS',
    image: localHeroImage,
    description: 'At Erevolution India we believe in transforming end to end e-commerce solutions enabling efficient online transactions, start to end.',
  },
  {
    title: 'NextGen Tech – AI/ML',
    image: localHeroImage,
    description: 'We integrate the latest technologies like AI, NLP, and predictive analytics to create scalable and innovative solutions.',
  },
]
</script>

<style lang="scss" scoped>

</style>
