<script>
import {mta} from './utils/'
export default {
  created() {
  
  },
  onLaunch(options){
    mta.App.init({
      appID:'500681570',
      eventID:'500681576',
      lauchOpts:options,
      // 使用分析-分享次数/人数
      statShareApp:true,
      // 使用分析-页面触底次数/人数
      statReachBottom:true,
      //每个页面均加入参数上报
      statParam:true,
      //开启自动上报
      autoReport:true
    });
  }
};
</script>

<style>
@import url("./iconfont/iconfont.css");

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}

page {
  background: #f4f4f4;
  height: 100%;
}

button {
  background: none;
  padding: 0;
  font-weight: normal;
  font-size: 32rpx;
  box-sizing: content-box;
}
button::after {
  border: 0;
}

view,
text {
  font-size: 28rpx;
  color: #333;
}

.wxParse .p {
  margin: 0 !important;
}

.wxParse .img {
  display: block !important;
}

/* this rule will be remove */
/* * {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
} */
</style>
