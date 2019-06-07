<template>
<form @submit="formSubmit" report-submit="true">
  <div class="withdraw">
   <!-- 提现步骤 -->
    <div class="user-title block">
      <div class="u-left">
        <span>&nbsp;</span> 提现步骤
      </div>
    </div>
    <div class="step">
      <p class="indent">
        <span>步骤1：</span>必须先添加客服微信，客服微信号：<span class="num">{{withdrawInfo.customerWechatNo}}</span>
      </p>
      <p class="indent">
        <span>步骤2：</span>填写您当前登录的微信号，客服只会给当前微信号发送红包哦！
      </p>
      <p class="indent">
        <span>步骤3：</span>点击下方申请提现按钮、西瓜零钱在2天之内审核、审核通过客服给您填写的微信号发送提现红包。
      </p>
    </div>

    <div class="user-title block">
      <div class="u-left">
        <span>&nbsp;</span> 提现金额
      </div>
       <div class="u-right">
         <span>￥{{withdrawInfo.surplusAmount}}</span>
      </div>
    </div>
    <div class="user-title">
      <div class="u-left">
        <span>&nbsp;</span> 微信号
      </div>
      <div class="u-right u-form" v-if="editWechat">
        <input type="text" placeholder="请输入您的微信号" v-model="withdrawInfo.wechatNo" />
        <button class="code-btn" @click="saveNo">保存</button>
      </div>
      <div class="u-right" v-else>
        <span>{{withdrawInfo.wechatNo}} <span @click="modifyNo" class="up">修改</span></span>
      </div>
    </div>
      <p class="btn block">
        <button class="code-btn" @click="subWithdraw">申请提现</button>
      </p>
  </div>
</form>
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
        withdrawInfo:{surplusAmount:0,wechatNo:'yjfgh5t',customerWechatNo:'xglq'},
        editWechat:false
      };
    },
    async onShow() {
       await this.loadData();
    },
    created() {},
    mounted() {},
    components: {},
    methods: {
      async loadData() {
       let withdrawInfo = await api.userWithdrawInfo();
       if(withdrawInfo){
         this.withdrawInfo = withdrawInfo;
         if(this.withdrawInfo.wechatNo==null || this.withdrawInfo.wechatNo===''){
           this.editWechat=true;
         }
       }
      },
      async copyCode(){
        await client.setClipboardData(this.withdrawInfo.withdrawCode);
      },
      modifyNo(){
        this.editWechat=true;
      },
      async saveNo(){
        console.log(this.withdrawInfo.wechatNo)
        if(!this.withdrawInfo.wechatNo){
          client.showToast({title:'请输入您的微信号',icon:'none'});
          return;
        }
        //保存微信号
        let success = await api.modifyWechatNo({wechatNo:this.withdrawInfo.wechatNo});
        if(success){
           this.editWechat=false;
        }
      },
      //提现申请
      async subWithdraw(){
         if(!this.withdrawInfo.wechatNo){
          client.showToast({title:'请输入您的微信号',icon:'none'});
          return;
        }
        let message = await api.userWithdraw();
        if(message!=''){
           client.showToast({title:message,icon:'none'});
        }else{
          client.showToast({title:'提现申请成功',icon:'success'});
        }
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
<style lang='scss' scoped>
  @import "./style";

</style>
