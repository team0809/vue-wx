<template>
  <div class="order">
    <div class="order-nav">
      <ul>
        <li :class="currentType==-1?'cur':''" v-on:click="loadList(-1,true)">全部</li>
        <li :class="currentType==0?'cur':''" v-on:click="loadList(0,true)">收入</li>
        <li :class="currentType==1?'cur':''" v-on:click="loadList(1,true)">支出</li>
      </ul>
    </div>
    <div class="cartlist">
      <div class="item" v-for="(item,index) in listData" :key="index">
        <div class="con">
          <div class="left">
            <div class="img">
              <img :src="item.icon" />
            </div>
            <div class="info">
              <p class="price">￥{{item.amount}}</p>
              <p class="odr-desc">时间：{{item.createTime}}</p>
              <p class="odr-desc">{{item.orderText}}</p>
              <span class="type">{{item.typeText}}</span>
            </div>
          </div>
        </div>
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
        listData: [],
        currentType:0,
        searchParams:{
          pageSize:20,
          pageIndex:1
        }
      };
    },
    onShow() {
      
    },
    created() {},
    mounted() {
      this.loadList(-1,true);
    },
    components: {},
    methods: {
      async loadList(type,clearPageIndex) {
        //清空pageIndex
        if(clearPageIndex==true){
          if(this.currentType==type){
            return;
          }
          this.pageIndex=1;
          this.listData=[];
        }
        this.currentType = type;
        //请求参数
        let req = {
          pageSize:this.searchParams.pageSize,
          pageIndex:this.searchParams.pageIndex,
          condition:{type:type}
        };
        //获取数据
        let accountList = await api.accountDetails(req);
        //当前获取条数
        this.currentCount=accountList.length;
        if(this.currentCount>0){
          this.pageIndex++;
          accountList.forEach(item => {
            switch(item.refType){
              case 1: item.icon = "/static/images/icon_amount_order.png";item.orderText='订单返利';break;
              case 2: item.icon = "/static/images/icon_amount_reward.png";item.orderText='活动赏金';break;
              case 3: item.icon = "/static/images/icon_amount_withdraw.png";item.orderText='提现';break;
              default: item.icon = "/static/images/icon_amount_order.png";item.orderText='订单返利';break;
            }
            item.typeText= item.inOrOut==0?'收入':'支出';
            this.listData.push(item);
          });
        }
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
