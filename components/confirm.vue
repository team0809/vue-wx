<template>
  <section>
      {{isShow}}---isShow
    <div class="confirm-warp"
        v-if="isShow">
        <header class="h-title">{{ title }}</header>
        <p class="my-contant">
            <slot>{{ contant }}</slot>
            <!-- <img src="../assets/images/referralM7/7/pic_1@2x.png" class="bg-img" alt=""> -->
        </p>
        <div class="con-bnt-foot">
            <button class="ok-bnt" @click="save()">{{ okBntText }}</button>
            <button class="cancel-bnt _leftbr" @click="close()">{{ cancelBntText }}</button>
        </div>
    </div>
    <!--蒙层-->
    <div class="fix-warp-mask" v-if="isShow"></div>
  </section>
</template>
<script>
export default {
  /**
   * 参考: https://bootstrap-vue.js.org/docs/components/modal
   * @param {boolean} isShow 是否显示modal框
   * @param {string|number} title 展示内容
   * @param {boolean} hideHeaderClose 是否展示右上角关闭按钮 默认展示
   * @param {string} cancelBntText 取消按钮文字
   * @param {string} okBntText 确定按钮文字
   * @param {boolean} noCloseOnBackdrop 能否通过点击外部区域关闭弹框
   * @param {boolean} noCloseOnEsc 能否通过键盘Esc按键关闭弹框
   * @param {function} change 事件触发顺序： show -> change -> shown -> cancel | ok -> hide -> change -> hidden
   * @param {function} show before modal is shown
   * @param {function} shown modal is shown
   * @param {function} hide before modal has hidden
   * @param {function} hidden after modal is hidden
   * @param {function} ok 点击'确定'按钮
   * @param {function} cancel 点击'取消'按钮
   * @param {Boolean} destroy 组件是否销毁 在官方并没有找到手动销毁组件的方法，只能通过v-if来实现
   */
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: [String, Number],
      default: ''
    },
    contant: {
      type: [String, Number],
      default: ''
    },
    hideHeaderClose: {
      type: Boolean,
      default: false
    },
    cancelBntText: {
      type: String,
      default: '取消'
    },
    okBntText: {
      type: String,
      default: '确定'
    },
    noCloseOnBackdrop: {
      type: Boolean,
      default: true
    },
    noCloseOnEsc: {
      type: Boolean,
      default: true
    },
    change: {
      type: Function,
      default: null
    },
    show: {
      type: Function,
      default: null
    },
    shown: {
      type: Function,
      default: null
    },
    hide: {
      type: Function,
      default: null
    },
    hidden: {
      type: Function,
      default: null
    },
    ok: {
      type: Function,
      default: null
    },
    cancel: {
      type: Function,
      default: null
    },
    destroy: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    modalChange () {
      if (this.change) this.change()
    },
    modalShow () {
      if (this.show) this.show()
    },
    modalShown () {
      if (this.shown) this.shown()
    },
    modalHide () {
      if (this.hide) this.hide()
    },
    modalHidden () {
      if (this.hidden) this.hidden()
      this.destroy = true
    },
    modalOk () {
      if (this.ok) this.ok()
    },
    modalCancel () {
      if (this.cancel) this.cancel()
    },
    save () {},
    close () {}
  }
}
</script>
<style lang="less" scoped>
    .confirm-warp{
        background: #fff;
        min-height: 200px;
        min-width: 320px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);  /* 使用css3的transform来实现 */
        z-index: 10006;
        border-radius: 3px;
    }
    .my-contant{
        min-height: 160px;
        padding: 0 24px 22px;
        font-size: 17px;
        line-height: 1.4;
        word-wrap: break-word;
        word-break: break-all;
        color: rgba(0, 0, 0, 0.5);
        img{
            width: 100%;
        }
    }
    .con-bnt-foot{
        position: relative;
        min-height: 52px;
        line-height: 52px;
        font-size: 17px;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        button{
            display: block;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
            color: #576B95;
            font-weight: 700;
            text-decoration: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            position: relative;
            font-size: 18px;
            background: none;
        }
    }
    .con-bnt-foot:after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        color: rgba(0, 0, 0, 0.1);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
    .con-bnt-foot .ok-bnt{
        color: rgba(0, 0, 0, 0.9);
    }
    .con-bnt-foot .cancel-bnt{
        
    }
    ._leftbr:after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 1px;
        bottom: 0;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        color: rgba(0, 0, 0, 0.1);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
    }
    .h-title{
        padding: 22px 6px;
        font-weight: bold;
        text-align: center;
        font-size: 18px;
    }
    .fix-warp-mask{
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index:10001;
    }
</style>
