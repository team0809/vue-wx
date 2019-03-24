const wechat = {
    //设置剪贴板内容
    setClipboardData(obj){
      return new Promise((resolve,reject)=>{
        wx.setClipboardData({
            data:obj,
            success:function(res){
                resolve(true);
            },
            fail:function(){
                reject(false);
            }
        })
      });
    },
    getClipboardData(){
        return new Promise((resolve,reject)=>{
            wx.getClipboardData({
                success:function(res){
                    resolve(res.data);
                },
                fail:function(){
                    reject("");
                }
            })
          });
    },
    navigateTo(data){
        wx.navigateTo(data);
    },
    getSetting(){
        return new Promise((resolve,reject)=>{
            wx.getSetting({
                success:function(res){
                    resolve(res);
                },
                fail:function(){
                    reject(null);
                }
            })
          });
    },
    getUserInfo(){
        return new Promise((resolve,reject)=>{
            wx.getUserInfo({
                success:function(res){
                    resolve(res);
                },
                fail:function(){
                    reject(null);
                }
            })
          });
    },
    login(){
        return new Promise((resolve,reject)=>{
            wx.login({
                success:function(res){
                    resolve(res);
                },
                fail:function(){
                    reject(null);
                }
            })
          });
    },
    getStorageSync(key){
       return wx.getStorageSync(key);
    },
    setStorageSync(key,value){
        wx.setStorageSync(key,value);
    }
}

export {wechat as client};