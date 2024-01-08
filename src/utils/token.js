// 封装存取方法

const TOKENKEY = "token_key";

const setToken = (token) => localStorage.setItem(TOKENKEY, token);

const getToken = () => localStorage.getItem(TOKENKEY);

const clearToken = () => localStorage.removeItem(TOKENKEY);

export { setToken, getToken, clearToken };
