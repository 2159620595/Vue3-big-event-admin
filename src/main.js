import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/main.scss'
import pinia from './stores'

const app = createApp(App)
// const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate) // 使用插件

app.use(pinia)
app.use(router)
app.mount('#app')

