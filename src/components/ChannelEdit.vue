<script setup>    
import {ref} from 'vue'
import {artPutChannelService, artAddChannelScrvice} from '@/api/article'
import { ElMessage } from 'element-plus'
const formRef = ref()
const emit = defineEmits('[success]')
// 弹窗开关
const dialogVisible =  ref(false)
// 声明form表单数据
const formModel = ref({
    cate_name: '',
    cate_alias: ''
})
// 命名规则
const rules = {
    cate_name: [
        {required: true, message: '请输入分类名称', trigger: 'blur'},
        {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
    ],
    cate_alias: [
    {required: true, message: '请输入分类别名', trigger: 'blur'},
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
    ]
}
// 组件对外暴露一个方法 open， 基于open传来的参数，区分添加还是编辑
// open({}) => 表单无需渲染，说明是添加
// open({id, cate_name, ...}) => 表单需要渲染，说明是编辑
// open调用后，可以打开弹窗

const open = async (row) => {
    dialogVisible.value = true
    formModel.value ={ ...row } // 添加 => 重置了表单数据 编辑  => 存储了需要回显的数据
    
}

const onSubmit = async () => {
  await formRef.value.validate()
  formModel.value.id ? await artPutChannelService(formModel.value) : await artAddChannelScrvice(formModel.value)
  ElMessage.success( formModel.value.id ? '编辑成功' : '添加成功')
  dialogVisible.value = false
  emit('success')
}

// 向外暴露方法
defineExpose({
    open
})
</script>

<template>
    <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="500"
  >
    <el-form ref="formRef" :model="formModel" :rules="rules"   label-width="100px"
    style="padding-right: 30px">
        <el-form-item label="分类名称" prop="cate_name">
            <el-input v-model="formModel.cate_name" minlength="1"
            maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
            <el-input v-model="formModel.cate_alias" minlength="1"
            maxlength="10"></el-input>
        </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>