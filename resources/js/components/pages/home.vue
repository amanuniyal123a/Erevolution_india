<template>
  <MainLayout>
    <HeroSection />
    <ServiceStats /> 
    <Testimonial /> 
    <Showcase /> 
    <Services />
    <Industries /> 
    <CaseStudies />
    <LeadershipSlider />
    <ContactForm />
    <!-- <Products /> -->

    
  </MainLayout>
</template>

<script setup>
import MainLayout from '../layouts/MainLayout.vue'
import HeroSection from '../sections/HeroSection.vue'
import ServiceStats from '@/components/ui/ServiceStats.vue'
import Testimonial from '@/components/sections/TestimonialSlider.vue'
import Showcase from '@/components/sections/Showcase.vue'
import Services from '@/components/sections/Services.vue'
import Industries from '@/components/sections/Industries.vue'
import CaseStudies from '@/components/sections/CaseStudies.vue' 
import LeadershipSlider from '@/components/sections/LeadershipSlider.vue'
import ContactForm from '@/components/sections/ContactForm.vue'
// import Products from '@/components/sections/Products.vue'
</script>
