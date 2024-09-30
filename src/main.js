import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { loadConfig } from './services/configService'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

loadConfig().then((config) => {
  const app = createApp(App)
  app.config.globalProperties.$config = config
  app.use(router)
  app.mount('#app')
})
