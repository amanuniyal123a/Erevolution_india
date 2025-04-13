<template>
  <section class="case-studies">
    <div class="container">
      <div class="case-studies__header">
        <h2>
          <span class="highlight">Our Recent</span> Case Studies
        </h2>
        <a href="#" class="view-all">View all</a>
      </div>

      <div class="case-studies__grid">
        <div class="case-studies__card" v-for="(item, index) in studies" :key="index">
          <img :src="item.image" :alt="item.title" class="case-studies__image" />
          <h3 class="case-studies__title">{{ item.title }}</h3>
          <p class="case-studies__description">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
 
const studies = [
  {
    title: "AI Chatbot Integration for EdTech Platform",
    image: new URL('@src/assets/aichatbot.jpeg', import.meta.url).href, 
    description:
      "A growing EdTech startup needed to scale support. We built a smart AI chatbot with NLP capabilities, reducing ticket load by 40% while improving student engagement.",
  },
  {
    title: "End-to-End E-commerce App for Local Retailer",
    image: new URL('@src/assets/ecomm.jpeg', import.meta.url).href, 
    description:
      "We helped a traditional retailer go digital by designing and developing a full-stack mobile-first e-commerce platform — from user flow to secure payment integration.",
  },
  {
    title: "Cloud Migration & Automation for Logistics Startup",
    image: new URL('@src/assets/Integration.jpg', import.meta.url).href,
    description:
      "To improve performance and reduce cost, we migrated their monolithic app to the cloud with CI/CD automation and scalable microservices architecture.",
  },
];
</script>

<style lang="scss" scoped>

</style>
