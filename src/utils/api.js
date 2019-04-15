import {
    post,
    get,
    fpost,
    fget,
    userOption
  } from "./index";
const apiHost="http://dev.wgb.wxcard.com.cn/web-api/";
function checkData(resp){
  console.log(resp);
  if(resp.code==0){
    return resp.data
  }else{
    console.log("请求接口失败");
    return {};
  }
}

const api = {
    // 微信Code登录
    async codeLogin (param) {
      const data = await fpost(apiHost+"user/codeLogin",param);
      return checkData(data);
    },
    // 退出登录
    async loginOut (param) {
      const data = await fpost(apiHost+"user/loginOut",param);
      return checkData(data);
    },
    // 保存微信用户信息
    async saveUserInfo(param){
      const data = await post(apiHost+"user/saveWXUser",param);
      return checkData(data);
    },
    // 首页默认数据
    async defaultInfo(param){
      const data = await fpost(apiHost+"home/defaultInfo",param);
      return checkData(data);
    },
    // 热门商品
    async hotGoods(param){
      //choiceType 7:热卖商品 8:实时收益商品
      //goodsType 1 拼多多商品 2：淘宝商品
      param = Object.assign({pageSize:20,pageIndex:1,condition:{choiceType:7,goodsType:1}},param);
      const data = await post(apiHost+"home/choiceGoods",param);
      return checkData(data).rows;
    },
    // 本周热卖
    async weekenGoods(param){
      //choiceType 7:热卖商品 8:实时收益商品
      //goodsType 1 拼多多商品 2：淘宝商品
      param = Object.assign({pageSize:10,pageIndex:1,condition:{choiceType:8,goodsType:1}},param);
      const data = await post(apiHost+"home/choiceGoods",param);
      return checkData(data).rows;
    },
    // 商品搜索
    async searchGoods(param){
      param = Object.assign({pageSize:20,pageIndex:1,condition:{sortType:1,goodsType:1}},param);
      const data = await post(apiHost+"goods/goodsList",param);
      return checkData(data).rows;
    },
    //热词
    async hotKeyword(param){
      const data = await fpost(apiHost+"goods/hotKeyword",param);
      return checkData(data);
    },
    //订单列表
    async orderList(param){
      const data = await post(apiHost+"order/list",param);
      return checkData(data).rows;
    },
    //商品详情
    async goodsDetail(param){
      const data = await post(apiHost+"goods/goodsDetail",param);
      return checkData(data);
    },
    //粉丝列表
    async fansList(param){
      const data = await post(apiHost+"user/fansList",param);
      return checkData(data).rows;
    },
    //添加粉丝
    async fansAdd(param){
      const data = await post(apiHost+"user/fansAdd",param);
      return checkData(data);
    },
    //获取分类列表
    async goodsCategory(param){
      const data = await post(apiHost+"goods/categoryList",param);
      return checkData(data);
    },
    //账户明细
    async accountDetails(param){
      const data = await post(apiHost+"account/list",param);
      return checkData(data).rows;
    },
    //个人中心
    async centerInfo(param){
      const data = await post(apiHost+"user/centerInfo",param);
      return checkData(data);
    },
    //活动
    async currentActivity(param){
      const data = await post(apiHost+"activity/current",param);
      return checkData(data);
    },
    //报名参与活动
    async signUpActivity(param){
      const data = await fpost(apiHost+"activity/signUpActivity",param);
      return checkData(data);
    }
}


export {api};