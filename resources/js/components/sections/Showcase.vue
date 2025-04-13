<template>
  <section class="wrapper2"> 
    <div class="wrapper">
      <h1 class="heading"><span class="highlight">Why</span> Erevolution India <span class="underline"></span></h1>
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
import {
  Code2,
  ShieldCheck,
  Server,
  Database,
  Activity,
  Smartphone,
  Users,
  Rocket,
} from 'lucide-vue-next';

const icons = [
  {
    icon: Code2,
    title: 'Modern Development',
    description: 'We write clean, scalable code built for the future — whether it’s web, AI, or automation.',
    color: '#00bfff'
  },
  {
    icon: ShieldCheck,
    title: 'Security-Driven',
    description: 'Security is built into every layer — from code to deployment, we follow best practices.',
    color: '#4caf50'
  },
  {
    icon: Server,
    title: 'Cloud-Ready Solutions',
    description: 'We offer cloud-native infrastructure to make your product scalable from day one.',
    color: '#ff9800'
  },
  {
    icon: Database,
    title: 'Data-Centric Approach',
    description: 'We manage and structure data to help your business grow intelligently and securely.',
    color: '#9c27b0'
  },
  {
    icon: Activity,
    title: 'Smart AI Integration',
    description: 'From chatbots to prediction models, we integrate AI that adds real business value.',
    color: '#e91e63'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'We create mobile apps that are sleek, fast, and built with the latest tech stacks.',
    color: '#3f51b5'
  },
  {
    icon: Users,
    title: 'Client-Centric Process',
    description: 'We work closely with you at every step — transparency and collaboration is our core.',
    color: '#009688'
  },
  {
    icon: Rocket,
    title: 'Built for Startups',
    description: 'As a young team ourselves, we understand startup needs: agile, affordable, and fast.',
    color: '#f44336'
  },
];

</script>


<style scoped lang="scss">
</style>
