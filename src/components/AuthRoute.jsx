// 根据token判断是否有权限进行路由跳转

import { getToken } from "@/utils/token";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  const token = getToken();
  if (token) {
    return <> {children}</>;
  } else {
    // 没有token 跳转到登录界面
    console.log("没有权限，请登录")
    return <Navigate to={"/login"} replace />;
  }
};


