import request from "@/utils/request";

// 获取文章频道列表
export const getChannelListUsingGet = () => {
  return request.get("/channels");
};

// 新增文章
export const createArticleUsingPost = (params) => {
  return request.post("/mp/articles?draft=false", params);
};

// 获取文章列表
export const getArticleListUsingGet = (params) => {
  return request.get("/mp/articles", params);
};

// 删除文章
export const delArticleUsingDelete = (id) => {
  return request.delete(`/mp/articles/${id}`);
};

/**
 * 获取文章详情
 * @param id 文章ID
 */
export const getArticleByIdUsingGet = (id) => {
  return request.get(`/mp/articles/${id}`)
}

/**
 * 更新文章
 */
export const updateArticleUsingPut = (data) => {
  return request.put(`/mp/articles/${data.id}?draft=false`, data);
}
