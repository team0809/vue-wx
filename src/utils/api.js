import {
    post,
    get,
    fpost,
    fget
  } from "./index";
const apiHost="http://localhost:8020/web-api/";

const api = {
    // 微信Code登录
    async codeLogin (param) {
      const data = await fpost(apiHost+"user/codeLogin",param);
      console.log(data);
    }
}

export {api};