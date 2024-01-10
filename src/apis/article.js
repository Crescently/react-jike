// 获取文章频道列表
import request from "@/utils/request";

export const getChannelListUsingGet = () => {
  return request.get("/channels");
};

// 新增文章
export const createArticleUsingPost = (params) => {
  return request.post("/mp/articles?draft=false", { params });
};
