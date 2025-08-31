<template>
  <MainLayout>
    <div class="container">
      <ContactForm /> 
      
    </div>
    <IndiaLocations />
  </MainLayout>
  
</template>

    <script setup>
    import MainLayout from '../layouts/MainLayout.vue';
    import ContactForm from '@/components/sections/ContactForm.vue';
    import IndiaLocations from '@/components/sections/contactus_sections/IndiaLocations.vue';
    </script>

<style lang="scss">
// @import '@/../sass/contact.scss';
</style>
