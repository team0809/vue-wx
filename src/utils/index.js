export {
  api
} from "./api";

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
function request(url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中' //数据请求前loading
  })
  return new Promise((resolve, reject) => {
    // 默认值
    let _header = { 'content-type': 'application/json'};

    //token
    let token = getStorageAuthToken();
    if(token!=''){
      _header['x-auth-token'] = token;
    }

     //固定信息
     let base = {
      clientType: 'WechatMiniprogram',
      userId: getStorageOpenid(),
      version: '1.0.0',
      time: new Date().getTime()
    };

    _header['base']=JSON.stringify(base);

    //合并
    Object.assign(_header,header);

    wx.request({
      url: url.indexOf('http')==0?url:host + url, //仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: _header,
      success: function (res) {
        wx.hideLoading();
        resolve(res.data)
      },
      fail: function (error) {
        wx.hideLoading();
        reject(false)
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  })
}
export function get(url, data) {
  return request(url, 'GET', data)
}
export function post(url, data) {
  return request(url, 'POST', data)
}

export function fget(url, data) {
  return request(url, 'GET', data,{ "Content-Type": "application/x-www-form-urlencoded"})
}
export function fpost(url, data) {
  return request(url, 'POST', data,{ "Content-Type": "application/x-www-form-urlencoded"})
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


export function getStorageOpenid() {
  const openId = wx.getStorageSync("openId");
  if (openId) {
    return openId;
  } else {
    return ''
  }
}

export function getOpenid() {
  // wx.login({
  //   success: res => {
  //     if (res.code) {
  //       //发起网络请求
  //       wx.request({
  //         url: 'https://api.weixin.qq.com/sns/jscode2session',
  //         data: {
  //           "appid": "wx601ce71bde7b9add",
  //           "secret": "abed5421d88eb8236e933c6e42d5c14e",
  //           "js_code": res.code,
  //           "grant_type": "authorization_code"
  //         },
  //         success: function (data) {
  //           var openid = data.data.openid;
  //           wx.setStorageSync("openid", openid);
  //         }
  //       })
  //     } else {
  //       console.log('登录失败！' + res.errMsg)
  //     }

  //   },
  //   fail: () => {},
  //   complete: () => {}
  // });
}

export function getStorageAuthToken(){
    const authToken = wx.getStorageSync("authToken");
    if (authToken) {
      return authToken;
    } else {
      return ''
    }
}
