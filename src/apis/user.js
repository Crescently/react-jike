// 获取用户信息
import request from "@/utils/request";

export const getUserInfoUsingGet = () =>{
    return request.get('/user/profile')
}