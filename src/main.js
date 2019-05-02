import Vue from 'vue'
import App from './App'

//全局处理重复页面跳转详情初始化,和详情跳详情返回的bug
import MyPlugin from './minxins'
Vue.use(MyPlugin)


//引入store
import store from './store/index'
//把store挂载到全局
Vue.prototype.$store = store;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    "pages": ["^pages/index/main", "pages/order/main","pages/orderDetail/main","pages/agentActivity/main","pages/myPayDetail/main", "pages/goods/main","pages/categorylist/main", "pages/fans/main","pages/search/main", "pages/my/main","pages/category/main", ],
    "window": {
      "backgroundTextStyle": "light",
      "navigationBarBackgroundColor": "#fff",
      "navigationBarTitleText": "西瓜零钱",
      "navigationBarTextStyle": "black"
    },
    "tabBar": {
      "backgroundColor": "#fafafa",
      "borderStyle": "white",
      "selectedColor": "#FE0000",
      "color": "#666",
      "list": [{
          "pagePath": "pages/index/main",
          "iconPath": "static/images/ic_menu_choice_nor.png",
          "selectedIconPath": "static/images/ic_menu_choice_pressed.png",
          "text": "首页"
        },
        // {
        //   "pagePath": "pages/topic/main",
        //   "iconPath": "static/images/ic_menu_topic_nor.png",
        //   "selectedIconPath": "static/images/ic_menu_topic_pressed.png",
        //   "text": "专题"
        // },
        {
          "pagePath": "pages/category/main",
          "iconPath": "static/images/ic_menu_sort_nor.png",
          "selectedIconPath": "static/images/ic_menu_sort_pressed.png",
          "text": "分类"
        },
        // {
        //   "pagePath": "pages/cart/main",
        //   "iconPath": "static/images/ic_menu_shoping_nor.png",
        //   "selectedIconPath": "static/images/ic_menu_shoping_pressed.png",
        //   "text": "购物车"
        // },
        {
          "pagePath": "pages/my/main",
          "iconPath": "static/images/ic_menu_me_nor.png",
          "selectedIconPath": "static/images/ic_menu_me_pressed.png",
          "text": "我的"
        }
      ]
    },
    "navigateToMiniProgramAppIdList":["wx32540bd863b27570"]
  }
}
