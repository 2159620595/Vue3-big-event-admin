<script setup>
// 在Vue3中 CompositionApi 中
// 1. 获取路由对象 router useRouter
// const router = useRouter()
// 2. 获取路由参数 route useRoute
// const route = useRoute()
import { useRouter, useRoute } from 'vue-router'
import { useUserStore, useCountStore } from '@/stores'
const router = useRouter()
const route = useRoute()
const goList = () => {
  router.push('/list')
  console.log(router, route)
}
const userStore = useUserStore()
const countStore = useCountStore()

</script>

<template>
<hr>
<hr>
<router-view></router-view>
<router-view></router-view>
<hr>
<hr>
  <div>我是App</div>
  <el-button @click="$router.push('/login')">去登录</el-button>
  <el-button @click="goList">去列表</el-button>
  <el-button type="primary" loading>Loading</el-button>
  <p>{{ userStore.token }}</p>
  <el-button @click="userStore.setToken('123456')">登录</el-button>
  <el-button @click="userStore.removeToken">退出</el-button>
<hr>
<div>{{ countStore.count }}</div>
<el-button @click="countStore.add(2)">+2</el-button>
</template>


<style scoped>
</style>

