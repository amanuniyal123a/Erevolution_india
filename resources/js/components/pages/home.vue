<template>
  <MainLayout>
    <HeroSection />
    <ServiceStats /> 
    <Testimonial /> 
    <Showcase /> 
    <Services />

     
  </MainLayout>
</template>

<script setup>
import MainLayout from '../layouts/MainLayout.vue'
import HeroSection from '../sections/HeroSection.vue'
import ServiceStats from '@/components/ui/ServiceStats.vue'
import Testimonial from '@/components/sections/TestimonialSlider.vue'
import Showcase from '@/components/sections/Showcase.vue'
import Services from '@/components/sections/Services.vue'
</script>
