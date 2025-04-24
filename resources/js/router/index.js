import { createRouter, createWebHistory } from 'vue-router'

// Import pages
import Home from '../components/pages/home.vue'
import Contact from '../components/pages/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contact-us',
    name: 'Contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
