import { createSlice } from "@reduxjs/toolkit";
import { clearToken, getToken, setToken } from "@/utils/token";
import { userLoginUsingPost } from "@/apis/login";
import { getUserInfoUsingGet } from "@/apis/user";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  reducers: {
    setUserToken(state, action) {
      state.token = action.payload;
      // 将token存到本地
      setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      clearToken();
    },
  },
});

const { setUserToken, setUserInfo, clearUserInfo } = userStore.actions;
const userReducer = userStore.reducer;

// 登录
const userLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await userLoginUsingPost(loginForm);
    // 将token存入redux和本地
    dispatch(setUserToken(res.data.token));
  };
};

// 获取用户信息
const getUserInfo = () => {
  return async (dispatch) => {
    const res = await getUserInfoUsingGet();
    dispatch(setUserInfo(res.data));
  };
};

export { userLogin, getUserInfo, clearUserInfo };
export default userReducer;
