<template>
  <div class="order">
    <div class="order-nav">
      <ul>
        <li :class="currentStatus==0?'cur':''" v-on:click="orderList(0,true)">全部</li>
        <li :class="currentStatus==2?'cur':''" v-on:click="orderList(2,true)">已付款</li>
        <li :class="currentStatus==3?'cur':''" v-on:click="orderList(3,true)">待结算</li>
        <li :class="currentStatus==5?'cur':''" v-on:click="orderList(5,true)">已结算</li>
        <li :class="currentStatus==4?'cur':''" v-on:click="orderList(4,true)">已失效</li>
      </ul>
    </div>
    <div class="cartlist">
      <div class="item" v-for="(item,index) in listData" :key="index">
        <!--我的订单-->
        <div class="con" v-if="item.balanceType<3" v-on:click="orderDetail(item.goodsId,item.goodsType,item.orderId)">
          <div class="left">
            <div class="img">
              <img :src="item.goodsImgUrl" alt="">
            </div>
            <div class="info">
              <p><span class="platform">{{item.balanceTypeText}}</span>{{item.goodsName}}</p>
              <!-- <p>￥{{item.retail_price}}</p> -->
              <p class="odr-time">创建时间:{{item.createTime}}</p>
              <p class="odr-numb" v-if="item.orderStatus!=4">结算日期:{{item.balanceDate}}</p>
              <div class="monery-bom">
                <span class="order-price">订单金额 ¥{{item.orderPrice}}</span>
                <span class="price">预估返现 <i>¥{{item.balanceAmount}}</i></span>
              </div>
            </div>
          </div>
        </div>

        <!--活动奖励-->
        <div class="con" v-if="item.balanceType==3">
          <div class="left">
            <div class="min-img">
              <img v-if="item.activityType==1"  :src="imgs.lanxinAct"  alt="">
              <img v-else-if="item.activityType==2" :src="imgs.orderAct"  alt="">
              <img v-else :src="imgs.fanxianAct" alt="">
            </div>
            <div class="info">
              <p v-if="item.activityType==1">拉新活动</p>
              <p v-else-if="item.activityType==2">订单活动</p>
              <p v-else>返现活动</p>
              <p class="odr-time">创建时间:{{item.createTime}}</p>
              <p class="odr-numb" v-if="item.orderStatus!=4">结算日期:{{item.balanceDate}}</p>
              <div class="monery-bom">
              <span class="price"> 奖励金额 <i> ¥{{item.balanceAmount}}</i></span>
              </div>
            </div>
          </div>
        </div>
        <!-- 状态 -->
        <div class="state">{{item.orderStatusText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    api,
    client,
    constant
  } from "../../utils";
  export default {
    onShow() {
     
    },
    created() {},
    async mounted() {
     await this.orderList(0,true)
    }, 
    //滚动底部
    async onReachBottom(){
      if(this.listData.length!=0){
       await this.orderList(this.currentStatus,false);
      }
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
        currentStatus:-1,
        canLoadGoods:true,
        imgs:{
          lanxinAct: constant.SHost +'/static/order/lanxin-act.png',
          orderAct: constant.SHost +'/static/order/order-act.png',
          fanxianAct: constant.SHost +'/static/order/fanxian-act.png'
        }
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
        if(this.canLoadGoods==false){
          return;
        }
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
        this.canLoadGoods==false;
        //获取数据
        let ordesList = await api.orderList(req);
        //当前获取条数
        this.currentCount=ordesList.length;
        this.canLoadGoods==true;
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
      },
      goodsDetail(goodsId,goodsType) {
      client.navigateTo({
          url: "/pages/goods/main?goodsId=" + goodsId+"&goodsType="+goodsType
        });
      },
      orderDetail(goodsId,goodsType,orderId){
        client.navigateTo({
          url: "/pages/orderDetail/main?goodsId=" + goodsId+"&goodsType="+goodsType+"&orderId="+orderId
        });
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
