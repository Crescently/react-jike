import request from "@/utils/request";

export const userLoginUsingPost = (loginForm) => {
  return request.post("/authorizations", loginForm);
};
