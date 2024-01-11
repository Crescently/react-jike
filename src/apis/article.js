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
