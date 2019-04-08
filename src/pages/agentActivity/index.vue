<template>
<div class="page background" :style="'background-image:url('+backgroundImg+')'">


  <!--内容-->
  <div class="content"> 

    <div class="title">赏金活动</div>

    <div class="date">2019-04-08 至 2019-04-16</div>

    <div class="task">
        <div class="t-title">拉新任务</div>
        <div class="prize">
          <div class="item" v-for="(item,index) in items" v-bind:key="item">
            <div class="icon" style="background-image:url('/static/activity-img/activity_a_icon.png')">
              <span class="price"><span>￥</span>10</span>
              <span class="continue">5人</span>
            </div>
            <div class="center-line" v-if="items.length!=(index+1)"></div>
          </div>
        </div>
        <div class="current"><span class="center">当前拉新人数<span class="num">5</span></span></div>
    </div>

    <div class="task">
        <div class="t-title">订单任务</div>
        <div class="prize">
          <div class="item" v-for="(item,index) in items" v-bind:key="item">
            <div class="icon" style="background-image:url('/static/activity-img/activity_a_icon.png')">
              <span class="price"><span>￥</span>10</span>
              <span class="continue">10单</span>
            </div>
            <div class="center-line" v-if="items.length!=(index+1)"></div>
          </div>
        </div>
        <div class="current"><span class="center">当前拉新人数<span class="num">5</span></span></div>
    </div>

    <div class="task">
        <div class="t-title">返现任务</div>
        <div class="prize">
          <div class="item" v-for="(item,index) in items" v-bind:key="item">
            <div class="icon" style="background-image:url('/static/activity-img/activity_a_icon.png')">
              <span class="price"><span>￥</span>10</span>
              <span class="continue">满10￥</span>
            </div>
            <div class="center-line" v-if="items.length!=(index+1)"></div>
          </div>
        </div>
        <div class="current"><span class="center">当前拉新人数<span class="num">5</span></span></div>
    </div>

    <div class="desc">
      <p>1. 活动区间内、渠道商首次打开本页面即为参与本次活动。</p>
      <p>2. 订单活动和返现活动以订单结算后统计数据为准。</p>
      <p>3. 订单活动和返现活动包含直属粉丝、推荐粉丝的订单和返现。</p>
      <p>4. 以上活动解释权归网购宝所有。</p>
  </div>

  </div>



 </div>
</template>

<script>
  import {
   api,
   userOption
  } from "../../utils";
  export default {
    data() {
      return {
        backgroundImg:'/static/activity-img/activity_a_back.png',
       items:[{},{},{}]
      };
    },
    onShow() {
      
    },
    created() {},
    mounted() {
      
    },
    components: {},
    methods: {
      //加载当前活动
      async loadActivity(){

      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
