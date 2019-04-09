<template>
<div class="page">

<img src="/static/activity-img/activity_a_back.png" class="background" :style="'height:'+windowHeight" />

  <!--内容-->
  <div class="content" v-if="activityModel.activityName"> 

    <div class="title">{{activityModel.activityName}}</div>

    <div class="date">{{activityModel.startTime}} 至 {{activityModel.endTime}}</div>

    <div class="task">
        <div class="t-title">拉新活动</div>
        <div class="prize">
          <div class="item" v-for="(item,index) in activityModel.newUserDetails" v-bind:key="item">
            <div class="icon">
              <img src="/static/activity-img/activity_a_icon.png"/>
              <span class="price"><span>￥</span>{{item.rewardAmount}}</span>
              <span class="continue">{{item.condition}}人</span>
            </div>
            <div class="center-line" v-if="items.length!=(index+1)"></div>
          </div>
        </div>
        <div class="current"><span class="center">当前拉新人数<span class="num">5</span></span></div>
    </div>

    <div class="task">
        <div class="t-title">订单活动</div>
        <div class="prize">
          <div class="item" v-for="(item,index) in activityModel.orderDetails" v-bind:key="item">
            <div class="icon">
              <img src="/static/activity-img/activity_a_icon.png"/>
              <span class="price"><span>￥</span>{{item.rewardAmount}}</span>
              <span class="continue">{{item.condition}}单</span>
            </div>
            <div class="center-line" v-if="items.length!=(index+1)"></div>
          </div>
        </div>
        <div class="current"><span class="center">当前下单数<span class="num">5</span></span></div>
    </div>

    <div class="task">
        <div class="t-title">返现活动</div>
        <div class="prize">
          <div class="item" v-for="(item,index) in activityModel.rebateDetails" v-bind:key="item">
            <div class="icon">
              <img src="/static/activity-img/activity_a_icon.png"/>
              <span class="price"><span>￥</span>{{item.rewardAmount}}</span>
              <span class="continue">满{{item.condition/100}}￥</span>
            </div>
            <div class="center-line" v-if="items.length!=(index+1)"></div>
          </div>
        </div>
        <div class="current"><span class="center">当前返现金额<span class="num">5</span></span></div>
    </div>

    <div class="desc">
     <text> {{activityModel.activityDesc}} </text>
    </div>
  </div>

 </div>
</template>

<script>
  import {
   api,
   userOption,
   client
  } from "../../utils";
  export default {
    data() {
      return {
        windowHeight:0,
        activityModel:{
          
        },
       items:[{},{},{}]
      };
    },
    onShow() {
      
    },
    created() {},
    async mounted() {
      //设置高度
      let systemInfo = await client.getSystemInfo();
      this.windowHeight = systemInfo.screenHeight+'px';
      //加载活动数据
      this.loadActivity();
    },
    components: {},
    methods: {
      //加载当前活动
      async loadActivity(){
          let activityInfo = await api.currentActivity(); 
          if(activityInfo!=null){
            this.activityModel = activityInfo;
            client.setNavigationBarTitle(activityInfo.activityName);
            let data = await api.signUpActivity({activityId:this.activityModel.id});
            if(data===""){
              //如果当前用户非渠道商 退出登录 重新登录获取信息
              if(userOption.getUserInfo().userType!=20){
                //退出登录
                let out = await userOption.loginOut();
                //重新登录
                if(out){
                  let codeLogin = await userOption.codeLogin();
                }
              }
            }
          }
      }

    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
