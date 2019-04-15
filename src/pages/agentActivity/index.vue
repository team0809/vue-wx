<template>
 <div class="page">
  <!-- :style="'height:'+windowHeight" -->
  <img src="/static/activity-img/active-top-bg.png" class="img-background" />
  <section class="wai-warp">
    <div class="list-pors">
      <div class="title">
        —— 拉新邀请进度 ——
      </div>
      <div class="pors-warp">
        <span class="pors-warp-act"></span>
      </div>
      <div class="transparent-warp">
        <span class="tran-box">
          <i></i>
          1人
        </span>
        <span class="tran-box">
          <i></i>
          3人
        </span>
        <span class="tran-box">
          <i></i>
          5人
        </span>
        <span class="tran-box">
          <i></i>
          10人以上
        </span>
      </div>
      <div class="tran-dec">根据邀请人数获得相应奖励</div>
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
      <div class="monery-warp">
        <span class="m-span" v-for="(o,nm) in 3">
          <i class="i-text">
            <img class="hbao" src="/static/images/icon_amount_withdraw.png" alt="">
            <div class="go-cl">去拉新</div>
          </i>
          <p class="text-p">
            满{{nm+1}}人<br>可领{{nm+1}}毛红包
          </p>
        </span>
        <!-- <span class="m-span">
          <i class="i-text">
            <img class="hbao" src="/static/images/icon_amount_withdraw.png" alt="">
          </i>
          <p class="text-p">
            满2人领1元红包
          </p>
        </span>
        <span class="m-span">
          <i class="i-text">
            <img class="hbao" src="/static/images/icon_amount_withdraw.png" alt="">
          </i>
          <p class="text-p">
            满3人领1.5元红包
          </p>
        </span> -->
      </div>
    </div>
  </section>
  <section class="wai-warp">
    <div class="list-pors">
      <div class="title">
        —— 拉新邀请进度 ——
      </div>
      <div class="pors-warp">
        <span class="pors-warp-act"></span>
      </div>
      <div class="transparent-warp">
        <span class="tran-box">
          <i></i>
          1人
        </span>
        <span class="tran-box">
          <i></i>
          3人
        </span>
        <span class="tran-box">
          <i></i>
          5人
        </span>
        <span class="tran-box">
          <i></i>
          10人以上
        </span>
      </div>
      <div class="tran-dec">根据邀请人数获得相应奖励</div>
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
      <div class="monery-warp">
        <span class="m-span" v-for="(o,nm) in 3">
          <i class="i-text">
            <img class="hbao" src="/static/images/icon_amount_withdraw.png" alt="">
            <div class="go-cl">去拉新</div>
          </i>
          <p class="text-p">
            满{{nm+1}}人<br>可领{{nm+1}}毛红包
          </p>
        </span>
        <!-- <span class="m-span">
          <i class="i-text">
            <img class="hbao" src="/static/images/icon_amount_withdraw.png" alt="">
          </i>
          <p class="text-p">
            满2人领1元红包
          </p>
        </span>
        <span class="m-span">
          <i class="i-text">
            <img class="hbao" src="/static/images/icon_amount_withdraw.png" alt="">
          </i>
          <p class="text-p">
            满3人领1.5元红包
          </p>
        </span> -->
      </div>
    </div>
  </section>
  <section class="wai-warp">
    <div class="list-pors">
      <div class="title">
        —— 拉新邀请进度 ——
      </div>
      <div class="pors-warp">
        <span class="pors-warp-act"></span>
      </div>
      <div class="transparent-warp">
        <span class="tran-box">
          <i></i>
          1人
        </span>
        <span class="tran-box">
          <i></i>
          3人
        </span>
        <span class="tran-box">
          <i></i>
          5人
        </span>
        <span class="tran-box">
          <i></i>
          10人以上
        </span>
      </div>
      <div class="tran-dec">根据邀请人数获得相应奖励</div>
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
      <div class="monery-warp">
        <span class="m-span" v-for="(o,nm) in 3">
          <i class="i-text">
            <img class="hbao" src="/static/images/icon_amount_withdraw.png" alt="">
            <div class="go-cl">去拉新</div>
          </i>
          <p class="text-p">
            满{{nm+1}}人<br>可领{{nm+1}}毛红包
          </p>
        </span>
        <!-- <span class="m-span">
          <i class="i-text">
            <img class="hbao" src="/static/images/icon_amount_withdraw.png" alt="">
          </i>
          <p class="text-p">
            满2人领1元红包
          </p>
        </span>
        <span class="m-span">
          <i class="i-text">
            <img class="hbao" src="/static/images/icon_amount_withdraw.png" alt="">
          </i>
          <p class="text-p">
            满3人领1.5元红包
          </p>
        </span> -->
      </div>
    </div>
  </section>
  <div class="reul-warp">
    <h1 class="title">活动规则</h1>
    <div class="cont-dec">
      • 活动时间 北京时间：2019年4月1日0<br>
      • 活动时间 北京时间：2019年4月1日0<br>
      • 活动时间 北京时间：2019年4月1日0<br>
      • 活动时间 北京时间：2019年4月1日0<br>
      • 活动时间 北京时间：2019年4月1日0<br>
      • 活动时间 北京时间：2019年4月1日0<br>
      • 活动时间 北京时间：2019年4月1日0<br>
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
              client.showToast({title:'活动报名成功'});
            }
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
