import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

import vueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'

import Components from 'unplugin-vue-components/vite'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/

export default defineConfig({

  plugins: [

    vue(),

    vueDevTools(),

    AutoImport({

      resolvers: [ElementPlusResolver()],

      imports: ['vue', 'vue-router'], // 自动导入 Vue 相关 API

    }),

    Components({

      resolvers: [ElementPlusResolver()],

    }),

  ],

  resolve: {

    alias: {

      '@': fileURLToPath(new URL('./src', import.meta.url))

    },

  },

})