<script setup>
import { ref } from 'vue'
import { artGetChannelService, artDelChannelService } from '@/api/article'
import {Edit ,Delete} from '@element-plus/icons-vue'
// 数据
const channelList = ref([])
const formRef = ref()
// 加载动画
const isLoading = ref(false)
// 声明弹层
const dialog = ref()
// 渲染页面数据
const getChannelList = async () => {
    // 请求数据开启isLoading
    isLoading.value = true
    const res = await artGetChannelService()
    // 存放数据
    channelList.value = res.data.data
    // 请求数据完毕关闭isLoading
    isLoading.value = false
}
// 调用函数渲染页面
getChannelList()
// 编辑文章分类
const onEditChannel = async row => {
    dialog.value.open(row)
    // const res = await artPutChannelService(formRef.value)
    // console.log(res)
    
    
}
// 删除文章分类
const onDelChannel = async row => {
await ElMessageBox.confirm(
    '你确认要删除吗?',
    '温馨提示',
    {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  const res = await artDelChannelService(row.id)
  ElMessage.success(res.data.message)
// 重新渲染页面数据
  getChannelList()
}
// 添加文章分类
const onAddChannel = () => {
    dialog.value.open({})
}
</script>

<template>
    <page-container v-loading="isLoading" title="文章分类">
        <template #extra>
            <el-button @click="onAddChannel" type="primary">添加文章</el-button>
        </template>
        <el-table ref="formRef" :data="channelList"  style="width: 100%">
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column prop="cate_alias" label="分类名称"></el-table-column>
            <el-table-column prop="cate_name" label="分类别名"></el-table-column>
            <el-table-column prop="address" label="操作" width="200">
                <template #default="{ row }">
                    <el-button @click="onEditChannel(row)" type="primary" :icon="Edit" circle />
                    <el-button @click="onDelChannel(row)" type="danger" :icon="Delete" circle />
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="这是空的" />
            </template>
        </el-table>
        <!-- 弹窗组件 -->
        <channel-edit @success="getChannelList()" ref="dialog"></channel-edit>
    </page-container>
</template>

