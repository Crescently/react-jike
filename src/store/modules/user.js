import { createSlice } from "@reduxjs/toolkit";
import { getToken, setToken } from "@/utils/token";
import { userLoginUsingPost } from "@/apis/login";

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


const userLogin = (loginForm) => {
  return async (dispatch)=>{
    const res= await userLoginUsingPost(loginForm)
    // 将token存入redux和本地
    dispatch(setUserToken(res.data.token));
  }
}

export { userLogin };
export default userReducer;
