<script setup>
import { artGetChannelService } from '@/api/article'
import { ref } from 'vue'
const selectList = ref([])
const getList = async () => {
    const res = await artGetChannelService()
    selectList.value = res.data.data
}
getList()


// -------------------------
// 组件v-model新版用法 vue3.4新特性
// const model = defineModel({
//   type: [Number, String]
// })
defineModel(
  'select', {type: [Number, String]}
)
// -------------------------
// 旧版用法 
// defineProps({
//     modelValue: {
//         type: [Number,String]
//     }
// })
// const emit = defineEmits(['update:modelValue'])


</script>

<template>
    <!-- 旧版用法 -->
    <!-- <el-select :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)">
        <el-option v-for="item in selectList" :key="item.id" :label="item.cate_name" :value="item.id" />
    </el-select> -->

    <!-- 新版用法 vue3.4新特性 -->
    <!-- <el-select v-model="model">
        <el-option v-for="item in selectList" :key="item.id" :label="item.cate_name" :value="item.id" />
    </el-select> -->

    <el-select v-model="model">
        <el-option v-for="item in selectList" :key="item.id" :label="item.cate_name" :value="item.id" />
    </el-select>
</template>