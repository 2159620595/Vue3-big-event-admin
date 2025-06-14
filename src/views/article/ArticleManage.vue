<script setup>
import { Edit,Delete } from '@element-plus/icons-vue'
import {ref} from 'vue'
import  ChannelSelect  from '@/components/ChannelSelect.vue'
import { artGetListService } from '@/api/article'
import { dayjs } from 'element-plus'
// 渲染数据
const articleList = ref([])
// 定义请求参数对象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

const state = ref(0) // 总条数

// 基于params参数，获取文章列表
const getArticleList =  async () => {
    const res = await artGetListService(params.value)
    articleList.value = res.data.data
    state.value = res.data.state
}
getArticleList()
// 格式化时间日期
const formatTime = (time) => dayjs(time).format('YYYY年MM月DD日')

// 编辑操作
const onEditArticle = row => {
    console.log(row)
}
// 删除操作
const onDelArticle = row => {
    console.log(row)
}



</script>

<template>
    <page-container title="文章管理">
        <template #extra>
            <el-button type="primary">管理文章</el-button>
        </template>
<!-- 表单区域 -->
        <el-form inline>
            <el-form-item label="文章分类：" >
                <!-- Vue2 => v-model :value 和 @input 的简写 -->
                <!-- Vue3 => v-model :modelValue 和 @update:modelValue 的简写 -->
                <Channel-Select v-model="params.cate_id" style="width: 220px;"></Channel-Select>
            </el-form-item>
            <el-form-item label="发布状态：">
                <el-select
                v-model="params.state"
                style="--el-select-width: 220px;"
                clearable
                >
                    <el-option label="已发布" value="已发布" />
                    <el-option label="草稿" value="草稿" />
                 </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
                <el-button type="primary" color="#626aef">搜索</el-button>
            </el-form-item>
        </el-form>
<!-- 表格区域 -->
        <el-table   :data="articleList"  style="width: 100%">
            <el-table-column prop="title" label="文章标题" width="400">
                <template #default="{ row }">
                    <el-link  type="primary" underline="false">{{ row.title }}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="cate_name" label="分类" ></el-table-column>
            <el-table-column prop="pub_date" label="发表时间" >
                <template #default="{ row }">
                    {{ formatTime(row.pub_date) }}
                </template>
            </el-table-column>
            <el-table-column prop="state" label="状态" ></el-table-column>
            <el-table-column prop="address" label="操作" width="100">
                <template #default="{ row }">
                    <el-button  @click="onEditArticle(row)" type="primary" :icon="Edit" circle />
                    <el-button  @click="onDelArticle(row)" type="danger" :icon="Delete" circle />
                </template> 
            </el-table-column>
            <template #empty>
                <el-empty description="这是空的" />
            </template>
        </el-table>
        
<!-- 分页区域 -->

    </page-container>
</template>

