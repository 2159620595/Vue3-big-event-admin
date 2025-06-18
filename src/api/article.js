import request from "@/utils/request"

// 分类:获取文章分类
export const artGetChannelService = () => request.get("/my/cate/list")
// 分类:添加文章分类
export const artAddChannelScrvice = (data) => request.post("/my/cate/add", data)
// 分类:编辑文章分类
export const artPutChannelService = (data) => request.put("/my/cate/info", data)

// 分类:删除文章分类
export const artDelChannelService = (id) =>
  request.delete(`/my/cate/del?id=${id}`)

// 删除文章分类export const artDelChannelService = (id) => request.delete('/my/cate/del', { params: { id }  })

// 文章:获取文章列表
export const artGetListService = (params) =>
  request.get("/my/article/list", { params })

// 文章: 发布-文章
export const artPublishService = (data) => request.post("/my/article/add", data)

// 文章: 获取文章详情
export const artGetDatailService = id => request.get('/my/article/info', {params: { id }})

// 文章： 编辑文章
export const artEditService = data => request.put('/my/article/info', data) 

// 文章： 删除文章
export const artDelService = id => request.delete('/my/article/info', { params: { id } })
