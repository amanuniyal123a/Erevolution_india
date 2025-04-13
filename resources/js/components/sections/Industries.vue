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
const industries = [
  {
    title: 'Startups & Emerging Businesses',
    image: new URL('@src/assets/business.jpeg', import.meta.url).href,
    description: 'We partner with startups to turn ideas into products — fast, scalable, and budget-friendly solutions built for growth.',
  },
  {
    title: 'E-commerce & Retail',
    image: new URL('@src/assets/commerce.jpg', import.meta.url).href,
    description: 'We create secure, high-performing e-commerce platforms with smart integrations, seamless UX, and real-time analytics.',
  },
  {
    title: 'AI & Automation-Driven Enterprises',
    image: new URL('@src/assets/ai.jpg', import.meta.url).href,
    description: 'We help forward-thinking businesses integrate AI, automation, and data intelligence to boost efficiency and innovation.',
  },
];
</script>

<style lang="scss" scoped>

</style>
