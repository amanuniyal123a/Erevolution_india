import './bootstrap'
import { createApp } from 'vue'

import App from './components/App.vue'

import router from './router'

const app = createApp(App) 
import '/resources/sass/app.scss' 
import '/resources/sass/contact.scss'
app.use(router)

app.mount('#app')
