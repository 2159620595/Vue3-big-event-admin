<script setup>
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'

</script>

<template>
   <el-config-provider :locale="zh">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss" scoped>

</style>