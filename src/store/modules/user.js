import { createSlice } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { getToken, setToken } from "@/utils/token";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
  },
  reducers: {
    setUserToken(state, action) {
      state.token = action.payload;
      // 将token存到本地
      setToken(action.payload);
    },
  },
});

const { setUserToken } = userStore.actions;
const userReducer = userStore.reducer;

const userLoginUsingPost = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post("/authorizations", loginForm);
    // 将token 存入
    dispatch(setUserToken(res.data.token));
  };
};

export { userLoginUsingPost };
export default userReducer;
