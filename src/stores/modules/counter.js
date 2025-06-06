import { defineStore } from "pinia"
import { ref } from "vue"
// 用户模块 token setToken removeToken
export const useCountStore = defineStore("count", () => {
    const count = ref(100)
    const add = (n) => {
        count.value += n
    }
    return {
        count,
        add
    }
})