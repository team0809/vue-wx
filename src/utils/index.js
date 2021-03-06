//api接口
import { api } from "./api";
//微信客户端
import {client} from "./wechat";
//小程序统计
var mta = require("./mta_analysis");
//全局变量
var constant = {
  //静态资源文件域名
  SHost:'http://qn.wxcard.com.cn',
}

export {client,api,mta,constant}

function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}


//-------------------------------------------------------------------------请求的封装

const host = 'https://www.heyuhsuo.xyz/heyushuo';
export {
  host
}
//请求封装
 function request(url, method, reqData, header = {}) {
  wx.showLoading({
    title: '加载中' //数据请求前loading
  })
  return new Promise((resolve, reject) => {
    // 默认值
    let _header = { 'content-type': 'application/json'};

    //token
    let token = userOption.getAouthToken();
    console.log("token:"+token);
    if(token!=''){
      _header['x-auth-token'] = token;
    }

     //固定信息
     let base = {
      clientType: 'WechatMiniprogram',
      userId: userOption.getUserInfo().userId,
      version: '1.0.0',
      time: new Date().getTime()
    };

    _header['base']=JSON.stringify(base);

    //合并
    Object.assign(_header,header);

    wx.request({
      url: url.indexOf('http')==0?url:host + url, //仅为示例，并非真实的接口地址
      method: method,
      data: reqData,
      header: _header,
      success: async function (res) {
        wx.hideLoading();
        console.log(url+'--->'+res.statusCode);
        if(res.statusCode==200){
          resolve(res.data);
        }else{
          //401 要求登录
         if(res.statusCode==401 && url.indexOf('codeLogin')==-1){
            let login = await userOption.codeLogin(true);
            //再次请求接口
            let _resData = await request(url,method,reqData,header);
            //返回数据
            resolve(_resData);
         };
        }
      },
      fail: function (error) {
        console.log(error);
        wx.hideLoading();
        reject(error)
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  })
}
export  function get(url, data) {
  return  request(url, 'GET', data)
}
export  function post(url, data) {
  return  request(url, 'POST', data)
}

export  function fget(url, data) {
  return  request(url, 'GET', data,{ "Content-Type": "application/x-www-form-urlencoded"})
}
export  function fpost(url, data) {
  return  request(url, 'POST', data,{ "Content-Type": "application/x-www-form-urlencoded"})
}

//-------------------------------------------------------------------------请求的封装


//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------


export function toLogin() {
  const userInfo = wx.getStorageSync('userInfo');
  if (!userInfo) {
    wx.navigateTo({
      url: "/pages/login/main"
    });
  } else {
    return true;
  }
}

export function login() {
  const userInfo = wx.getStorageSync('userInfo');
  if (userInfo) {
    return userInfo;
  }
}

//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------
 
const userOption = {
  setUserInfo(userInfo){
    let user = {
      userId:userInfo.id,
      userNo: userInfo.userNo,
      nickname: userInfo.nickname,
      icon: userInfo.icon,
      userType: userInfo.type,
      typeText:userInfo.typeText,
      mobile: userInfo.mobile
    };
    client.setStorageSync("storage_user_info",JSON.stringify(user));
    //用户信息
    mta.Data.userInfo = {'open_id':user.userId,'nickname':user.nickname};
  },
  getUserInfo(){
    let userStr = client.getStorageSync("storage_user_info");
    if(userStr==undefined || userStr==""){
      return {};
    }else{
      return JSON.parse(userStr);
    }
  },
  setAouthToken(tokenKey){
    client.setStorageSync("storage_auth_token",tokenKey);
  },
  getAouthToken(){
    let authStr = client.getStorageSync("storage_auth_token");
    if(authStr==undefined){
      return "";
    }
    return authStr;
  },
  hasAouthLogin(){
    let userInfo = userOption.getUserInfo();
    return !(userInfo.nickname==undefined ||userInfo.nickname==null || userInfo.nickname==='');
  },
  async codeLogin(clearOld){
    let userInfo = userOption.getUserInfo();
    if(clearOld==true){
      userInfo ={};
    }
    if(userInfo.userId==undefined){
      let loginRes = await client.login();
      console.log(loginRes)
      let loginData = await api.codeLogin({code:loginRes.code});
      console.log(loginData)
      //保存登录信息
     if(loginData!=null){
       userOption.setUserInfo(loginData.userInfo);
       userOption.setAouthToken(loginData.token);
       return true;
     }else{
       return false;
     }
    }
    return true;
  },
  async loginOut(){
    let loginOut = await api.loginOut();
    //清空登录信息
    if(loginOut==true){
      client.setStorageSync("storage_user_info","");
      client.setStorageSync("storage_auth_token","");
      return true;
    }
    return false;
  }
}

export {userOption}

export function getStorageAuthToken(){
    const authToken = wx.getStorageSync("authToken");
    if (authToken) {
      return authToken;
    } else {
      return ''
    }
}


//-------------------------------------------搜索记录---------------------------------------------------

const searchHistory = {
  add:function(key){
      let keyArray =wx.getStorageSync("user_search_history");
      if(keyArray.indexOf(key+"\"")==-1){
        if(keyArray){
          keyArray = JSON.parse(keyArray);
        }else{
          keyArray = [];
        }
        keyArray.unshift(key);
        wx.setStorageSync("user_search_history",JSON.stringify(keyArray));
    }
  },
  clear:function(){
    wx.setStorageSync("user_search_history","[]");
  },
  get: function(){
    let keyArray =wx.getStorageSync("user_search_history");
    return keyArray? JSON.parse(keyArray):[];
  }
}

export {searchHistory}
