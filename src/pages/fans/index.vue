<template>
  <div class="order">
    <div class="order-nav">
      <ul>
        <li class="cur">全部粉丝</li>
        <li>直属粉丝</li>
        <li>推荐粉丝</li>
      </ul>
    </div>
    <div class="cartlist">
      <div class="item" v-for="(item,index) in listData" :key="index">
        <div class="con">
          <div class="left">
            <div class="img">
              <img :src="item.list_pic_url" alt="">
            </div>
            <div class="info">
              <p>{{item.goods_name}}</p>
              <!-- <p>￥{{item.retail_price}}</p> -->
              <p class="odr-time">日期：10100011</p>
              <p class="odr-numb">电话：111110100011 </p>
              <!-- <div class="monery-bom">
                <span>消费金额 ¥100</span><i>预估价 ¥1008</i>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    get,
    post,
    login,
    getStorageOpenid
  } from "../../utils";
  export default {
    onShow() {
      if (wx.getStorageSync("addressId")) {
        this.addressId = wx.getStorageSync("addressId");
      }
      this.openId = getStorageOpenid();

      this.getDetail();
    },
    created() {},
    mounted() {},
    data() {
      return {
        addressId: "",
        openId: "",
        allprice: "",
        listData: [],
        address: {}
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
      async getDetail() {
        const data = await get("/order/detailAction", {
          openId: this.openId,
          addressId: this.addressId
        });
        console.log(data);

        if (data) {
          this.allprice = data.allPrise;
          this.listData = data.goodsList;
          this.address = data.address;
        }
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
