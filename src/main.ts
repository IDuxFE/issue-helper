import { createApp } from 'vue'
import './style.css'
import idux from './idux'

import App from './App.vue'

createApp(App).use(idux).mount('#app')
