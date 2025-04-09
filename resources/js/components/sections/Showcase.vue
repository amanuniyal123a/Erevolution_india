<template>
  <section class="wrapper2"> 
    <div class="wrapper">
      <h1 class="heading"> E-revolution_India</h1>
      <div class="grid">
        <div class="card" v-for="(item, index) in icons" :key="index">
          <component
            :is="item.icon"
            class="icon"
            :style="{ color: item.color }"
          />
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { Code2, ShieldCheck, Server, Database, Activity, Smartphone } from 'lucide-vue-next';

const icons = [
  {
    icon: Code2,
    title: 'Development',
    description: 'We create clean, scalable, and efficient code for modern applications.',
    color: '#00bfff'
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    description: 'Your data is safe with our robust security systems and practices.',
    color: '#4caf50'
  },
  {
    icon: Server,
    title: 'Hosting',
    description: 'Reliable and fast hosting solutions tailored to your needs.',
    color: '#ff9800'
  },
  {
    icon: Database,
    title: 'Data Management',
    description: 'Efficient, secure, and scalable data storage & retrieval.',
    color: '#9c27b0'
  },
  {
    icon: Activity,
    title: 'Analytics',
    description: 'Real-time insights to help you make data-driven decisions.',
    color: '#e91e63'
  },
  {
    icon: Smartphone,
    title: 'Mobile Solutions',
    description: 'Responsive, fast, and sleek apps for mobile platforms.',
    color: '#3f51b5'
  },
];
</script>


<style scoped lang="scss">
</style>
