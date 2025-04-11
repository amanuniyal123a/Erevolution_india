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
const localServiceImage = new URL('@src/assets/hero-img.jpg', import.meta.url).href;

const studies = [
  {
    title: "MU 3.5 Certification for Telemerg EHR System",
    image:localServiceImage,
    description:
      "Healthcare organizations often struggle with ensuring their Electronic Health Record (EHR) systems meet evolving standards like MU 3.5 certification, with a focus on data interoperability, patient engagement, etc.",
  },
  {
    title: "AI-Medical Imaging Request Platform",
    image: localServiceImage,
    description:
      "This digital platform is designed for radiologists and imaging professionals, offering a streamlined way to convert faxed imaging requests into structured digital data using advanced AI.",
  },
  {
    title: "eClinicalWorks Reporting & Analytics",
    image: localServiceImage,
    description:
      "The AI-driven analytics solution helps healthcare providers improve reporting, compliance, and patient outcomes by integrating with eClinicalWorks (eCW).",
  },
];
</script>

<style lang="scss" scoped>

</style>
