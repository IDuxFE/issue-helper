import { createApp } from 'vue'

import idux from './idux'
import './style.css'

import App from './App.vue'

createApp(App).use(idux).mount('#app')
