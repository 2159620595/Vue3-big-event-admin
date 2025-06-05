import { createRouter, createWebHistory } from 'vue-router'

// createRouter 创建路由实例

// createWebHistory 创建基于浏览器 history API 的路由历史记录

// import.meta.env.BASE_URL 获取当前项目的根路径

// 配置 history 模式

// 1. history 模式：createWebHistory 地址栏不带#号

// 2. hash 模式：createWebHashHistory 地址栏带#号

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [],

})

export default router