<template>
 <div class="page">
  <img src="/static/activity-img/active-top-bg.png" class="img-background" />

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
        <img src="/static/activity-img/shjie.png" class="img-sj" />
      </div>
      <div class="s-right">
        <img src="/static/activity-img/shjie.png" class="img-sj" />
      </div>
    </div>
    <div class="cont-box">
       <div class="tran-title">根据拉新人数获得红包奖励</div>
      <div class="monery-warp">
        <span class="m-span" v-for="item in activityModel.newUserDetails" v-bind:key="item">
          <i class="i-text">
            <img class="hbao" src="/static/images/icon_amount_withdraw.png" alt="">
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
        <img src="/static/activity-img/shjie.png" class="img-sj" />
      </div>
      <div class="s-right">
        <img src="/static/activity-img/shjie.png" class="img-sj" />
      </div>
    </div>
    <div class="cont-box">
       <div class="tran-title">根据下单数数获得红包奖励</div>
      <div class="monery-warp">
        <span class="m-span" v-for="item in activityModel.orderDetails" v-bind:key="item">
          <i class="i-text">
            <img class="hbao" src="/static/images/icon_amount_withdraw.png" alt="">
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
          {{item.condition}}{{index==activityModel.rebateDetails.length-1?'元以上':'元'}}
        </span>
      </div>
      <div class="tran-dec">当前返现金额<i>{{activityModel.balanceAmount}}</i>元</div>
    </div>
    <div class="shjie">
      <div class="s-left">
        <img src="/static/activity-img/shjie.png" class="img-sj" />
      </div>
      <div class="s-right">
        <img src="/static/activity-img/shjie.png" class="img-sj" />
      </div>
    </div>
    <div class="cont-box">
       <div class="tran-title">根据返现金额获得红包奖励</div>
      <div class="monery-warp">
        <span class="m-span" v-for="item in activityModel.rebateDetails" v-bind:key="item">
          <i class="i-text">
            <img class="hbao" src="/static/images/icon_amount_withdraw.png" alt="">
            <div class="go-cl">￥{{item.rewardAmount}}</div>
          </i>
          <p class="text-p">
            满{{item.condition}}元
          </p>
        </span>
      </div>
    </div>
  </section>

  <div class="reul-warp">
    <h1 class="title">活动规则</h1>
    <text class="cont-dec">{{activityModel.activityDesc}}</text>
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
        activityModel:{}
      };
    },
    onShow() {
      
    },
    created() {},
    async mounted() {
      //加载活动数据
      this.loadActivity();
    },
    components: {},
    methods: {
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
              client.showToast({title:'活动报名成功'});
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
