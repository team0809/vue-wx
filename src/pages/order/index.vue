<template>
  <div class="order">
    <div class="order-nav">
      <ul>
        <li :class="currentStatus==0?'cur':''" v-on:click="orderList(0,true)">全部</li>
        <li :class="currentStatus==2?'cur':''" v-on:click="orderList(2,true)">已付款</li>
        <li :class="currentStatus==5?'cur':''" v-on:click="orderList(5,true)">已结算</li>
        <li :class="currentStatus==4?'cur':''" v-on:click="orderList(4,true)">已失效</li>
      </ul>
    </div>
    <div class="cartlist">
      <div class="item" v-for="(item,index) in listData" :key="index">
        <!--我的订单-->
        <div class="con" v-if="item.balanceType==0">
          <div class="left">
            <div class="img">
              <img :src="item.goodsImgUrl" alt="">
            </div>
            <div class="info">
              <p>{{item.goodsName}}</p>
              <!-- <p>￥{{item.retail_price}}</p> -->
              <p class="odr-time">创建日期：{{item.createTime}}</p>
              <p class="odr-numb">订单号：{{item.orderNum}} <span v-on:click="copyOrderNum(item.orderNum)">复制</span></p>
              <div class="monery-bom">
                <span>订单金额 ¥{{item.orderPrice}}</span><i>预估返现 ¥{{item.userPromotionAmount}}</i>
              </div>
            </div>
          </div>
        </div>

        <!--粉丝订单-->
         <div class="con" v-if="item.balanceType==1 || item.balanceType==2">
            <div class="left">
            <div class="img">
              <img :src="item.goodsImgUrl" alt="">
            </div>
            <div class="info">
              <p>{{item.balanceType==1?'直属粉丝订单':'推荐粉丝订单'}}</p>
              <!-- <p>￥{{item.retail_price}}</p> -->
              <p class="odr-time">创建日期：{{item.createTime}}</p>
              <p class="odr-numb">订单号：{{item.orderNum}} <span v-on:click="copyOrderNum(item.orderNum)">复制</span></p>
              <div class="monery-bom">
                <span>订单金额 ¥{{item.orderPrice}}</span><i>预估返现 ¥{{item.balanceAmount}}</i>
              </div>
            </div>
          </div>
         </div>

         <!--活动奖励-->
         <div class="con" v-if="item.balanceType==3">
            <div class="left">
            <div class="img">
              <img :src="item.goodsImgUrl" alt="">
            </div>
            <div class="info">
              <p v-if="item.activityType==1">拉新活动</p>
              <p v-else-if="item.activityType==2">订单活动</p>
              <p v-else>返现活动</p>
              <!-- <p>￥{{item.retail_price}}</p> -->
              <p class="odr-time">发放日期：{{item.createTime}}</p>
              <div class="monery-bom">
                <i>奖励金额 ¥{{item.balanceAmount}}</i>
              </div>
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
    client
  } from "../../utils";
  export default {
    onShow() {
     
    },
    created() {},
    mounted() {
      this.orderList(0,true)
    },
    data() {
      return {
        addressId: "",
        openId: "",
        allprice: "",
        listData: [],
        address: {},
        pageIndex:1,
        currentCount:0,
        currentStatus:-1
      };
    },
    components: {},
    methods: {
      pay() {
        wx.showToast({
          title: "支付功能暂未开发", //提示的内容,
          icon: "none", //图标,
          duration: 1500, //延迟时间,
          mask: false, //显示透明蒙层，防止触摸穿透,
          success: res => {}
        });
      },
      toAddressList() {
        wx.navigateTo({
          url: "/pages/addressSelect/main"
        });
      },
      toAdd() {
        wx.navigateTo({
          url: "/pages/addaddress/main"
        });
      },
      async orderList(status,clearPageIndex) {
        //清空pageIndex
        if(clearPageIndex==true){
          //重复点击
          if(this.currentStatus==status){
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
          condition:{orderStatus:status}
        };
        //获取数据
        let ordesList = await api.orderList(req);
        //当前获取条数
        this.currentCount=ordesList.length;
        //+1
        if(this.currentCount>0){
          this.pageIndex++;
          ordesList.forEach(element => {
            this.listData.push(element);
          });
        }
      },
      copyOrderNum(orderNum){
        client.setClipboardData(orderNum);
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
