<script setup>
import { ref } from "vue"
import { Plus, Upload } from "@element-plus/icons-vue"
import { useUserStore } from "@/stores"
import { userUpdateAvatarService } from "@/api/user"
const userStore = useUserStore()
// 回显头像
const imageUrl = ref(userStore.user.user_pic)

const uploadRef = ref()

// 将图片转换为base64格式
const onUploadFile = uploadFile => {
    const reader = new FileReader()
    reader.readAsDataURL(uploadFile.raw)
    reader.onload = () => {
        imageUrl.value = reader.result
    }
}

// 上传图片
const uploadImage = async () => {
    const res = await userUpdateAvatarService(imageUrl.value)
    
    // 重新渲染
    await userStore.getUser()
    ElMessage.success(res.data.message || "头像更新成功")
    
}
</script>

<template>
  <page-container title="更换头像">
    <el-upload
      ref="uploadRef"
      class="avatar-uploader"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="onUploadFile">
      
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <br>
    <el-button @click="uploadRef.$el.querySelector('input').click()" type="primary" :icon="Plus" size="large">选择图片</el-button>
    <el-button @click="uploadImage" type="success" :icon="Upload" size="large">上传图片</el-button>
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
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
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
