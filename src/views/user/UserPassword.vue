<script setup>
import { ref } from 'vue'
import { userUpdatePasswordService } from '@/api/user'
import { useUserStore } from '@/stores'
import router from '@/router'

const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const formRef = ref()

const rules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 15, message: '原密码长度为6-15位', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '新密码长度为6-15位', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === pwdForm.value.old_pwd) {
          callback(new Error('新密码不能和原密码相同'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '确认密码长度为6-15位', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== pwdForm.value.new_pwd) {
          callback(new Error('两次输入的新密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const userStore = useUserStore()

const submitForm = async () => {
  await formRef.value.validate()
  const res = await userUpdatePasswordService(pwdForm.value)
  ElMessage.success(res.data.message || "密码修改成功")
//   重置本地token
  userStore.setToken('')
  userStore.getUser({})
//   重新拦截到登陆页
  router.push('/login')
}

const resetForm = () => {
  formRef.value.resetFields()
}
</script>


<template>
    <page-container title="重置密码">
    <el-form
    :model="pwdForm"
    :rules="rules"
    ref="formRef"
    label-width="100px"
    size="large"
  >  
    <el-form-item label="原密码" prop="old_pwd">
      <el-input v-model="pwdForm.old_pwd" type="password" show-password />
    </el-form-item>
    <el-form-item label="新密码" prop="new_pwd">
      <el-input v-model="pwdForm.new_pwd" type="password" show-password />
    </el-form-item>
    <el-form-item label="确认密码" prop="re_pwd">
      <el-input v-model="pwdForm.re_pwd" type="password" show-password />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">修改密码</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
    </page-container>
</template>