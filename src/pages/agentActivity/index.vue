<template>
 <div class="page">
   <form @submit="formSubmit" report-submit="true">
  <img :src="imgs.activeTopBg" class="img-background" mode="widthFix" />
  <div class="div-head">
    <p class="a-title"> {{activityModel.activityName}} </p>
    <p class="a-time">{{activityModel.startTime}} - {{activityModel.endTime}}</p>
  </div>
  <!-- 拉新活动 -->
  <section class="wai-warp">
    <div class="list-pors">
      <div class="title">
        —— 拉新活动进度 ——
      </div>
      <div class="pors-warp">
        <span class="pors-warp-act" :style="'width:'+activityModel.newUserProgress"></span>
      </div>
      <div class="transparent-warp">
        <span class="tran-box" v-for="(item,index) in activityModel.newUserDetails" v-bind:key="item">
          <i></i>
          {{item.condition}}{{index==activityModel.newUserDetails.length-1?'人以上':'人'}}
        </span>
      </div>
      <div class="tran-dec">当前拉新数<i>{{activityModel.newUserCount}}</i>人</div>
    </div>
    <div class="shjie">
      <div class="s-left">
        <img :src="imgs.shjie" class="img-sj" />
      </div>
      <div class="s-right">
        <img :src="imgs.shjie" class="img-sj" />
      </div>
    </div>
    <div class="cont-box">
       <div class="tran-title">根据拉新人数获得红包奖励</div>
      <div class="monery-warp">
        <span class="m-span" v-for="item in activityModel.newUserDetails" v-bind:key="item">
          <i class="i-text">
            <img class="hbao" :src="imgs.amountWithdraw" alt="">
            <div class="go-cl">￥{{item.rewardAmount}}</div>
          </i>
          <p class="text-p">
            满{{item.condition}}人
          </p>
        </span>
      </div>
    </div>
  </section>

  <!-- 订单活动 -->
  <section class="wai-warp">
    <div class="list-pors">
      <div class="title">
        —— 订单活动进度 ——
      </div>
      <div class="pors-warp">
        <span class="pors-warp-act" :style="'width:'+activityModel.newOrderProgress"></span>
      </div>
      <div class="transparent-warp">
        <span class="tran-box" v-for="(item,index) in activityModel.orderDetails" v-bind:key="item">
          <i></i>
          {{item.condition}}{{index==activityModel.orderDetails.length-1?'单以上':'单'}}
        </span>
      </div>
      <div class="tran-dec">当前有效订单数<i>{{activityModel.newOrderCount}}单</i></div>
    </div>
    <div class="shjie">
      <div class="s-left">
        <img :src="imgs.shjie" class="img-sj" />
      </div>
      <div class="s-right">
        <img :src="imgs.shjie" class="img-sj" />
      </div>
    </div>
    <div class="cont-box">
       <div class="tran-title">根据下单数数获得红包奖励</div>
      <div class="monery-warp">
        <span class="m-span" v-for="item in activityModel.orderDetails" v-bind:key="item">
          <i class="i-text">
            <img class="hbao" :src="imgs.amountWithdraw" alt="">
            <div class="go-cl">￥{{item.rewardAmount}}</div>
          </i>
          <p class="text-p">
            满{{item.condition}}单
          </p>
        </span>
      </div>
    </div>
  </section>

  <!-- 返现活动 -->
  <section class="wai-warp">
    <div class="list-pors">
      <div class="title">
        —— 返现活动进度 ——
      </div>
      <div class="pors-warp">
        <span class="pors-warp-act" :style="'width:'+activityModel.balanceAmountProgress"></span>
      </div>
      <div class="transparent-warp">
        <span class="tran-box" v-for="(item,index) in activityModel.rebateDetails" v-bind:key="item">
          <i></i>
          {{item.condition/100}}{{index==activityModel.rebateDetails.length-1?'元以上':'元'}}
        </span>
      </div>
      <div class="tran-dec">当前返现金额<i>{{activityModel.balanceAmount}}</i>元</div>
    </div>
    <div class="shjie">
      <div class="s-left">
        <img :src="imgs.shjie" class="img-sj" />
      </div>
      <div class="s-right">
        <img :src="imgs.shjie" class="img-sj" />
      </div>
    </div>
    <div class="cont-box">
       <div class="tran-title">根据返现金额获得红包奖励</div>
      <div class="monery-warp">
        <span class="m-span" v-for="item in activityModel.rebateDetails" v-bind:key="item">
          <i class="i-text">
            <img class="hbao" :src="imgs.amountWithdraw" alt="">
            <div class="go-cl">￥{{item.rewardAmount}}</div>
          </i>
          <p class="text-p">
            满{{item.condition/100}}元
          </p>
        </span>
      </div>
    </div>
  </section>

  <!-- 活动规则 -->
  <div class="reul-warp">
    <h1 class="title">活动规则</h1>
    <text class="cont-dec">{{activityModel.activityDesc}}</text>
  </div>

  <!--分享-->
  <div class="bottom-fixed">
    <!--主页按钮-->
    <div class="homes" @click="goHome">
      <span class="iconfont iconshouye"></span>
      <p class="pm">首页</p>
    </div>
    <div class="nbnav4" v-if="userInfo.userType==20">
      <span class="iconfont iconshare"></span>
      <button class="share" form-type="submit" open-type="share">分享拿奖励</button>
    </div>
    <div class="nbnav4" @click="signUpActivity" v-else>
      <button class="share" form-type="submit">申请为渠道商</button>
    </div>
  </div>

  <!--成为渠道商提示-->
  <div class="wx-shouquan" v-if="showChannel">
      <div class="concant">
        <h1>系统提示</h1>
        <div class="sq-info">
          您成功加入西瓜零钱渠道商!
        </div>
        <div class="bnt-info" @click="sureChannel">
          <button form-type="submit" class="bnt-rihgt bnt-max">确定</button>
        </div>
      </div>
      <div class="wx-gallery"></div>
  </div>
</form>
</div>
</template>

<script>
  import {
   api,
   userOption,
   client,
   constant
  } from "../../utils";
  export default {
    data() {
      return {
        activityModel:{},
        showChannel:false,
        userInfo:{userType:10},
        imgs:{
          activeTopBg: constant.SHost + '/static/activity-img/active-top-bg.png',
          shjie: constant.SHost + '/static/activity-img/shjie.png',
          amountWithdraw: constant.SHost + '/static/images/icon_amount_withdraw.png',
        }
      };
    },
    onShow() {
     
    },
    created() {},
    async mounted() {
      let userId = this.$root.$mp.query.userId || -1;
      //用户信息
      this.userInfo = userOption.getUserInfo();
      //加载活动数据
      await this.loadActivity();
    },
    //触发分享
    onShareAppMessage() {
    let userId = userOption.getUserInfo().userId;
      return {
        path: "/pages/agentActivity/main?userId="+userId,
        imageUrl: '/static/activity-img/activity-share.png' //拿第一张商品的图片
      };
    },
    components: {},
    methods: {
      //跳转至首页
      goHome(){
          client.switchTab({url:'/pages/index/main'});
      },
      //加载当前活动
      async loadActivity(){
          let activityInfo = await api.currentActivity(); 
          if(activityInfo!=null){
            //进度条
           activityInfo.newUserProgress = this.setProgress(activityInfo.newUserDetails,activityInfo.newUserCount);
           activityInfo.newOrderProgress = this.setProgress(activityInfo.orderDetails,activityInfo.newOrderCount);
           activityInfo.balanceAmountProgress = this.setProgress(activityInfo.rebateDetails,activityInfo.balanceAmount);
            this.activityModel = activityInfo;
            client.setNavigationBarTitle(activityInfo.activityName);
            //渠道商参与活动
            if(this.userInfo.userType==20){
              await this.signUpActivity();
            }
          }
      },
      setProgress(activitys,currentVal){
        if(activitys.length==0 || currentVal==null || currentVal==0){
            return '0%';
        }

        let proressText='',progress=[0.2,0.3,0.3],progressLength=[0,0.18,0.55];
        for(let index in activitys){
            if(activitys[index].condition>=currentVal){
             let tempProcess = (currentVal/activitys[index].condition*progress[index]+progressLength[index])*100;
             if(tempProcess<3){
               tempProcess=3;
             }
              return tempProcess+'%';
            }
        }
        if(proressText==''){
          proressText = '100%';
        }
        // }
        //   if(activitys.length==0 || currentVal==null || currentVal==0){
        //     return '0%';
        //   }
        // console.log(activitys[activitys.length-1].condition*1.3);
        // let progress = currentVal/(activitys[activitys.length-1].condition*1.3)*100;
        // console.log('值：'+progress)
        // if(progress>100){
        //   return '100%';
        // }
        return proressText;
      },
      async fansAdd(userId){
        const data = await api.fansAdd({shareUserId:userId,msg:'渠道商活动页面'});
      },
      //成为渠道商并参与活动
      async signUpActivity(){
         let data = await api.signUpActivity({activityId:this.activityModel.id});
          if(data===""){
            //如果当前用户非渠道商 退出登录 重新登录获取信息
            if(this.userInfo.userType!=20){
              //退出登录
              let out = await userOption.loginOut();
              //重新登录
              if(out){
                let codeLogin = await userOption.codeLogin();
                //重新获取用户信息
                this.userInfo = userOption.getUserInfo();
                //显示用户已成为渠道商
                this.showChannel=true;
              }
            }else{
              client.showToast({title:'活动报名成功'});
            }
          }
      },
      sureChannel(){
        this.showChannel=false;
      },
      //form提交
      formSubmit(e){
        if(e.target.formId!='the formId is a mock one'){
          api.formIdAdd({formId:e.target.formId});
        }
      }
    },
    computed: {}
  };

</script>
<style lang='scss'>
  page {
    background: #fb6451;
    background-position: 50%;
    background-size: auto 100%;
    height: 100%;
  }
  @import "./style";
</style>
