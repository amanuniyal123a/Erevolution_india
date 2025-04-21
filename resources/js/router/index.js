import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/pages/home.vue'
import contact from '../components/pages/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/Contact-us',
    name: 'Contact',
    component: contact
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
