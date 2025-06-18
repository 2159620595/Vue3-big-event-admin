<script setup>
import { Edit, Delete } from "@element-plus/icons-vue"
import { ref } from "vue"
import ChannelSelect from "@/components/ChannelSelect.vue"
import { artGetListService, artDelService } from "@/api/article"
import { dayjs } from "element-plus"
import ArticleEdit from "@/components/ArticleEdit.vue"

// 渲染数据
const articleList = ref([])
// 定义请求参数对象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: "",
  state: "",
})

const total = ref(0) // 总条数

// 基于params参数，获取文章列表
const getArticleList = async () => {
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
}
getArticleList()
// 格式化时间日期
const formatTime = (time) => dayjs(time).format("YYYY年MM月DD日")
//提供分页修改逻辑
const handleSizeChange = (size) => {
    params.value.pagenum = 1
    params.value.pagesize = size
    getArticleList()
}
const handleCurrentChange = (page) => {
    params.value.pagenum = page
    getArticleList()
}

// 搜索逻辑 => 按照最新条件，重新检索，从第一页开始展示
const onSearch = () => {
    params.value.pagenum = 1 // 重置页面
    getArticleList()
}

// 重置逻辑 => 将筛选条件清空，重新检索，从第一页开始展示
const onReset = () => {
    params.value.pagenum = 1 // 重置页面
    params.value.cate_id = ''
    params.value.state = ''
    getArticleList()
}
// 抽屉
const articleEditRef = ref()
// 管理文章逻辑
const onEditDrawer = () => {
  articleEditRef.value.open({})
}
// 编辑操作
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
// 删除操作
const onDelArticle = async (row) => {
  await ElMessageBox.confirm(
    '你确认要删除吗?',
    '温馨提示',
    {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  const res = await artDelService(row.id)
  ElMessage.success(res.data.message)
  // 重新渲染页面数据
  getArticleList()
}

// 添加修改成功
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const list = Math.ceil((total.value + 1) / params.value.pagesize)
    // 更新成最大页码 再渲染
    params.value.pagenum = list
  }
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onEditDrawer">管理文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <!-- Vue2 => v-model :value 和 @input 的简写 -->
        <!-- Vue3 => v-model :modelValue 和 @update:modelValue 的简写 -->
        <Channel-Select
          v-model="params.cate_id"
          style="width: 220px"
        ></Channel-Select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select
          v-model="params.state"
          style="--el-select-width: 220px"
          clearable
        >
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset" type="primary" color="#626aef">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" style="width: 100%" >
      <el-table-column prop="title" label="文章标题" width="400">
        <template #default="{ row }">
          <el-link type="primary" underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发表时间">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="address" label="操作" width="100">
        <template #default="{ row }">
          <el-button
            @click="onEditArticle(row)"
            type="primary"
            :icon="Edit"
            circle
          />
          <el-button
            @click="onDelArticle(row)"
            type="danger"
            :icon="Delete"
            circle
          />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="这是空的" />
      </template>
    </el-table>

    <!-- 抽屉组件 -->
    <Article-Edit ref="articleEditRef" @success="onSuccess"></Article-Edit>
    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[1, 3, 5, 10]"
      :background="true"
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; justify-content: flex-end;"
    />
  </page-container>
</template>
