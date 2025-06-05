import { createApp } from 'vue'

import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'

import router from './router'

import '@/assets/main.scss'

const app = createApp(App)
// const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate) // 使用插件

app.use(createPinia().use(piniaPluginPersistedstate))

app.use(router)

app.mount('#app')

