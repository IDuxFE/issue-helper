import { createApp } from 'vue'
import App from './App.vue'
import { router } from './plugins/router'
import { idux } from './plugins/idux'

createApp(App).use(router).use(idux).mount('#app')
