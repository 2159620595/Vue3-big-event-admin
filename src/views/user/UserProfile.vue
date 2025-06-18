<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateInfoService } from '@/api/user'
// 从pinia获取数据
const { user: {id, username, nickname, email },getUser } = useUserStore()
// 用户信息
const form = ref({
    id,
    username, 
    nickname,
    email
})
// 表单验证规则
const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}

const formRef = ref()
const onSubmit = async () => {
    // 请求前进行表单验证
  formRef.value.validate()
//   发请求
  const res = await userUpdateInfoService(form.value)
//   提示修改成功
  ElMessage.success(res.data.message)
//   重新获取用户信息
  getUser()
}
</script>

<template>
  <page-container title="基本资料">
    <el-form
    :model="form"
    :rules="rules"
    ref="formRef"
    label-width="100px"
    size="large"
  >
    <el-form-item label="登录名称">
      <el-input v-model="form.username" disabled></el-input>
    </el-form-item>
    <el-form-item label="用户昵称" prop="nickname">
      <el-input v-model="form.nickname"></el-input>
    </el-form-item>
    <el-form-item label="用户邮箱" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交修改</el-button>
    </el-form-item>
  </el-form>
  </page-container>
</template>

