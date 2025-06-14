import { createRouter, createWebHistory } from "vue-router"
import { useUserStore } from "@/stores"
// createRouter 创建路由实例

// createWebHistory 创建基于浏览器 history API 的路由历史记录

// import.meta.env.BASE_URL 获取当前项目的根路径

// 配置 history 模式

// 1. history 模式：createWebHistory 地址栏不带#号

// 2. hash 模式：createWebHashHistory 地址栏带#号

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/login", component: () => import("@/views/login/LoginPage.vue") },
    {
      path: "/",
      component: () => import("@/views/layout/LayoutContainer.vue"),
      redirect: "/article/manage", //重定向
      // 二级路由
      children: [
        {
          path: "/article",
          redirect: "/article/manage", //重定向
        },
        {
          path: "/article/manage",
          component: () => import("@/views/article/ArticleManage.vue"),
        },
        {
          path: "/article/channel",
          component: () => import("@/views/article/ArticleChannel.vue"),
        },
        // -----------
        {
          path: "/user",
          redirect: "/user/profile", //重定向
        },
        // -----------
        {
          path: "/user/profile",
          component: () => import("@/views/user/UserProfile.vue"),
        },
        {
          path: "/user/avatar",
          component: () => import("@/views/user/UserAvatar.vue"),
        },
        {
          path: "/user/password",
          component: () => import("@/views/user/UserPassword.vue"),
        },
      ],
    },
  ],
})

// 登录访问拦截 => 默认是直接放行的
// 根据返回值决定, 是放行还是拦截
// 返回值:
//  1. undefined / true 直接放行
// 2.false 拦回from的地址页面
// 3.具体路径 或 路径对象 拦截到对应的地址
// '/login'  { name: 'login }
router.beforeEach((to) => {
  // 如果没有token, 且访问的是非登录页, 拦截到登录,其他情况正常放行
  const useStore = useUserStore()
  if (!useStore.token && to.path !== "/login") return "/login"
})

export default router
