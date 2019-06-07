<template>
  <div class="withdraw"> 
    <div class="order-nav">
      <ul>
        <li :class="currentStatus==0?'cur':''" v-on:click="loadData(0,true)">全部</li>
        <li :class="currentStatus==1?'cur':''" v-on:click="loadData(1,true)">待审核</li>
        <li :class="currentStatus==2?'cur':''" v-on:click="loadData(2,true)">已审核</li>
      </ul>
    </div>
     <div class="cartlist">
      <div class="item" v-for="(item,index) in listData" :key="index" @click="audit(item)">
        <!--我的订单-->
        <div class="con">
          <div class="left">
            <div class="img">
              <img :src="item.icon" alt="">
            </div>
            <div class="info">
              <p>{{item.nickname}} ({{item.wechatNo}})</p>
              <p class="odr-time">申请时间:{{item.createTime}}</p>
              <p class="odr-numb" v-if="item.status!=1">审核时间:{{item.withdrawTime}}</p>
              <div class="monery-bom">
                <span class="order-price">提现金额: <span class="price">¥{{item.amount}}</span></span>
              </div>
              <p class="odr-numb" v-if="item.status==3">原因:{{item.remark}}</p>
            </div>
          </div>
        </div>
         <!-- 状态 -->
        <div class="state">{{item.statusText}}</div>
      </div>
     </div>

  <!--审核-->
  <div class="wx-shouquan" v-if="auditModel.showAudit">
      <div class="concant">
        <h1>提现审核</h1>
        <div class="sq-info">
          <div class="user-info">
            <img :src="auditModel.userInfo.icon" class="img" />
            <span class="nick">
              <span>{{auditModel.userInfo.nickname}}</span>
              <span>微信号:<label class="height">{{auditModel.userInfo.wechatNo}}</label></span>
              <span>金额:<label class="height">￥{{auditModel.userInfo.amount}}</label></span>
            </span>
          </div>
          <div class="withdraw">
            <div class="div-radio">
             <switch checked @change="switchChange" />{{auditModel.auditStatus?'审核通过':'审核不通过'}}
            </div>
            <textarea v-show="!auditModel.auditStatus" class="div-text" v-model="auditModel.auditMsg" placeholder="审核不通过原因"></textarea>
          </div>
        </div>
        <div class="bnt-info">
          <button  @click="subAudit(false)">取消</button>
          <button class="bnt-rihgt" @click="subAudit(true)">确定</button>
        </div>
      </div>
      <div class="wx-gallery"></div>
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
        currentStatus:0,
        canLoad:true,
        pageIndex:1,
        currentCount:0,
        listData:[],
        auditModel:{
           showAudit:false,
           auditMsg:'',
           auditStatus:true,
           userInfo:{nickname:'',wechatNo:'',amount:0,icon:''} 
          }
      };
    },
    async onShow() {
       await this.loadData(this.currentStatus);
    },
    created() {},
    mounted() {},
    components: {},
    //滚动底部
    async onReachBottom(){
      if(this.listData.length!=0){
       await this.loadData(this.currentStatus,false);
      }
    },
    methods: {
      async loadData(status,clearPageIndex,refresh) {
         if(this.canLoad==false){
          return;
        }
        //清空pageIndex
        if(clearPageIndex==true){
          //重复点击
          if(this.currentStatus==status && refresh==undefined){
            return;
          }
          this.pageIndex=1;
          this.listData=[];
        }
        this.currentStatus = status;
        //请求参数
        let req = {
          pageSize:10,
          pageIndex:this.pageIndex,
          condition:{status:status}
        };
        this.canLoad==false;
        //获取数据
        let resultData = await api.withdrawList(req)
        //当前获取条数
        this.currentCount=resultData.length;
        this.canLoad==true;
        //+1
        if(this.currentCount>0){
          this.pageIndex++;
          resultData.forEach(element => {
            this.listData.push(element);
          });
        }
      },
      audit(item){
        if(item.status==1){
          this.auditModel ={
             showAudit:true,
             auditMsg:'',
             auditStatus:true,
             userInfo:item
            };
        }
      },
     async subAudit(success){
        if(success){
          let data = await api.auditWithdraw({
            id:this.auditModel.userInfo.id,
            userId:this.auditModel.userInfo.userId,
            status:this.auditModel.auditStatus?2:3,
            remark:this.auditModel.auditMsg
            });
          this.auditModel.showAudit=false;
          if(data==true){
            await this.loadData(this.currentStatus,true,true);
          }
        }else{
          this.auditModel.showAudit=false;
        }
        
      },
      switchChange(e){
          this.auditModel.auditStatus = e.target.value;
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
