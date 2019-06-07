<template>
<div>
    <div @click="goodsDetail(item.goodsId,item.goodsType.type,item.goodsName)" class="shop-list" v-for="(item,index) in goodList" :key="index">
      <image class="imgs" :src="item.thumbnailImgUrl" alt="" />
      <div class="list-cont">
        <div class="goods_title">
        <span class="platform">{{item.goodsType.name}}</span> {{item.goodsName}}
        </div>
          <div class="col-yuan">
          <span>
            <span class="afprice">
              <i>{{item.hasCoupon?'券后:':'售价'}}¥</i>{{item.couponAfterPrice}}
            </span>
            <span :style="item.hasCoupon?'display:block':'display:none'" class="price">原价:¥{{item.salePrice}} </span>
          </span>
          <span class="fr">已售{{item.volume}}件</span>
        </div>
        <div class="col-money">
          <p class="p-fr">
            <i class="quan">{{item.couponPrice}}元券</i>
          </p>
          <span class="s-k" :style="item.showPromotion?'display:block':'display:none'">
            <i>佣金 ¥</i>{{item.promotionPrice}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { client,mta,api } from "../../utils";
export default {
  props: ['goodList','eventName'],
  mounted() {
    console.log(22222222222221);
  },
  methods: {
    goodsDetail(id,type,goodsName) {
      mta.Event.stat(this.eventName,{goodsName:goodsName,goodsId:id});
      client.navigateTo({
        url:"/pages/goods/main?goodsId="+id+"&goodsType="+type
      });
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
