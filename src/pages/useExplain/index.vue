<template>
<form @submit="formSubmit" report-submit="true">
  <div class="withdraw">
   <!-- 提现步骤 -->
    <div class="user-title">
      <div class="u-left">
        <span>&nbsp;</span> 领优惠券使用介绍:
      </div>
    </div>
    <div class="step">
      <p class="indent">
        <span>步骤1：收藏西瓜零钱</span>
      </p>
      <p class="indent">
          <img :src="imgs.explain_0" mode="widthFix" />
      </p>
      <p class="indent right">
        <span>步骤2：打开拼多多复制需要购买的商品标题</span>
      </p>
      <p class="indent right">
          <img :src="imgs.explain_1" mode="widthFix" />
      </p>
      <p class="indent">
        <span>步骤3：返回微信下滑打开西瓜零钱</span>
      </p>
      <p class="indent">
          <img :src="imgs.explain_2" mode="widthFix" />
      </p>
      <p class="indent right">
        <span>步骤4：在西瓜零钱中搜索商品</span>
      </p>
      <p class="indent right">
          <img :src="imgs.explain_3" mode="widthFix" />
      </p>
      <p class="indent">
        <span>步骤5：领取优惠券后下单购买</span>
      </p>
      <p class="indent">
          <img :src="imgs.explain_4" mode="widthFix" />
      </p>
    </div>
  </div>
</form>
</template>

<script>
  import {
   api,
   userOption,
   client,
   constant,
   mta
  } from "../../utils";
  export default {
    data() {
      return {
          imgs:{
              explain_0: constant.SHost +'/static/images/img_explain_0.jpg',
              explain_1: constant.SHost +'/static/images/img_explain_1.jpg',
              explain_2: constant.SHost +'/static/images/img_explain_2.jpg',
              explain_3: constant.SHost +'/static/images/img_explain_3.jpg',
              explain_4: constant.SHost +'/static/images/img_explain_4.jpg'
          }
      };
    },
    mounted() {
        mta.Page.init();
    },
    components: {},
    methods: {
    }
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
