<script setup>
import { ref } from "vue"
import { Plus } from "@element-plus/icons-vue"
import { QuillEditor } from "@vueup/vue-quill"
import "@vueup/vue-quill/dist/vue-quill.snow.css"
import { artPublishService, artGetDatailService, artEditService } from '@/api/article'
import { baseURL } from '@/utils/request'
import axios from 'axios'
const visibleDrawer = ref(false)

// 内容重置
const formRef = ref()
const editorRef = ref()
// 表单验证规则
const rules = ref({
  title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
  cate_id: [{ required: true, message: "请选择文章分类", trigger: "change" }],
  cover_img: [{ required: true, message: "请上传文章封面", trigger: "change" }],
  content: [{ required: true, message: "请输入文章内容", trigger: "blur" }],
})

// 初始数据
const defaultForm = {
  title: "", // 文章标题
  cate_id: "", // 文章分类id
  content: "", // 文章内容
  cover_img: "", // 文章封面
  state: "", // 文章状态
}
// 准备数据
const formModel = ref({
  ...defaultForm,
})
// 图片预览相关逻辑
const imageUrl = ref("")
const onUploadFile = (UploadFile) => {
  imageUrl.value = URL.createObjectURL(UploadFile.raw) // 预览图片
  // 立刻将图片对象，存入formModel.value.cover_img 将来用于提交
  formModel.value.cover_img = UploadFile.raw
}
const emit = defineEmits(['success'])
// 发布 和 草稿 请求操作
const onPublish = async (state) => {
  await formRef.value.validate()
  // 将已发布还是草稿状态，存入 state
  formModel.value.state = state
  // 转换 formData 数据
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
// 添加请求
  if (formModel.value.id) {
    // 编辑操作
    const res = await artEditService(fd)
    ElMessage.success(res.data.message)
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    // 添加操作
    const res = await artPublishService(fd)
    visibleDrawer.value = false
    ElMessage.success(res.data.message)
    // 通知父组件，添加成功了
    emit('success', 'add')
  }
}

const open = async (row) => {
  visibleDrawer.value = true
  if (row.id) {
    // console.log('编辑回显')
    const res = await artGetDatailService(row.id)
    formModel.value = res.data.data
    imageUrl.value = baseURL + formModel.value.cover_img
    // 提交给后台，需要的是 file 格式的，将网络图片，转成 file 格式
    // 网络图片转成 file 对象, 需要转换一下
    formModel.value.cover_img = await imageUrlToFile(imageUrl.value, formModel.value.cover_img)
  } else {
    formModel.value = { ...defaultForm }
    imageUrl.value = ''
    if (editorRef.value) {
      editorRef.value.setHTML('')
    }
    console.log('editorRef:', editorRef.value)
  }
}

// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageData = response.data;

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], { type: response.headers['content-type'] });

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error);
    throw error;
  }
}

defineExpose({
  open,
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" :rules="rules"  label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 此处需要关闭 element-plus 的自动上传， 不需要配置 action 等参数
            只需要做前端的本地预览图片即可，无需在提交前上传图片
            语法:URL.createObjectURL(...) 创建本地预览的地址，来预览 
        -->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onUploadFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <Quill-Editor
          ref="editorRef"
          theme="snow"
          v-model:content="formModel.content"
          contentType="html"
          ></Quill-Editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor { width: 100%;  :deep(.ql-editor) { min-height: 200px;  }}
</style>
