<template>
    <MainLayout> 
      <div class="container">

        <ContactForm />
      </div>
    
    </MainLayout>
  </template>
  
  <script setup>
  
  import MainLayout from '../layouts/MainLayout.vue' 
  import ContactForm from '@/components/sections/ContactForm.vue'
  import '/resources/sass/contact.scss'
  </script>
  