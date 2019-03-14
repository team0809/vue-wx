global.webpackJsonp([13],{

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(240);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_2c65f158_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(243);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(241)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2c65f158"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_2c65f158_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\index\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c65f158", Component.options)
  } else {
    hotAPI.reload("data-v-2c65f158", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 241:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_amap_wx__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_amap_wx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__utils_amap_wx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex__ = __webpack_require__(23);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  onShow: function onShow() {},

  computed: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_5_vuex__["c" /* mapState */])(["cityName"])),
  mounted: function mounted() {
    this.getCityName();
    this.getData();
  },
  data: function data() {
    return {
      banner: [],
      channel: [],
      brandList: [],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: []
    };
  },

  components: {},
  methods: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_5_vuex__["b" /* mapMutations */])(["update"]), {
    toMappage: function toMappage() {
      var _this = this;
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      wx.getSetting({
        success: function success(res) {
          //如果没有同意授权,打开设置
          if (!res.authSetting["scope.userLocation"]) {
            wx.openSetting({
              success: function success(res) {
                _this.getCityName();
              }
            });
          } else {
            wx.navigateTo({
              url: "/pages/mappage/main"
            });
          }
        }
      });
    },
    getCityName: function getCityName() {
      var _this = this;
      var myAmapFun = new __WEBPACK_IMPORTED_MODULE_3__utils_amap_wx___default.a.AMapWX({
        key: "e545e7f79a643f23aef187add14e4548"
      });
      myAmapFun.getRegeo({
        success: function success(data) {
          //成功回调
          console.log(data);
          // data[0].regeocodeData.formatted_address
          // _this.cityName = data[0].regeocodeData.formatted_address;
          _this.update({ cityName: data[0].regeocodeData.formatted_address });
        },
        fail: function fail(info) {
          //失败回调
          console.log(info);
          //如果用户拒绝授权
          // 默认为北京
          _this.cityName = "北京市";
          _this.update({ cityName: "北京市" });
        }
      });
    },
    toSearch: function toSearch() {
      wx.navigateTo({
        url: "/pages/search/main"
      });
    },
    getData: function getData() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
        var data;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Object(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* get */])("/index/index");

              case 2:
                data = _context.sent;

                _this2.banner = data.banner;
                _this2.channel = data.channel;
                _this2.brandList = data.brandList;
                _this2.newGoods = data.newGoods;
                _this2.hotGoods = data.hotGoods;
                _this2.topicList = data.topicList;
                _this2.newCategoryList = data.newCategoryList;

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }))();
    },
    goodsDetail: function goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id
      });
    },
    categoryList: function categoryList(id) {
      wx.navigateTo({
        url: "/pages/categorylist/main?id=" + id
      });
    },
    goodsList: function goodsList(info) {
      if (info == "hot") {
        wx.navigateTo({
          url: "/pages/newgoods/main?isHot=" + 1
        });
      } else {
        wx.navigateTo({
          url: "/pages/newgoods/main?isNew=" + 1
        });
      }
    },
    topicdetail: function topicdetail(id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      });
    },
    totopic: function totopic() {
      wx.navigateTo({
        url: "/pages/topic/main"
      });
    },
    tobrandList: function tobrandList() {
      wx.navigateTo({
        url: "/pages/brandlist/main"
      });
    },
    branddetail: function branddetail(id) {
      wx.navigateTo({
        url: "/pages/branddetail/main?id=" + id
      });
    }
  }),
  created: function created() {}
});

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "index"
  }, [_c('div', {
    staticClass: "search"
  }, [_c('div', {
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.toMappage
    }
  }, [_vm._v(_vm._s(_vm.cityName))]), _vm._v(" "), _c('div', {
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.toSearch
    }
  }, [_c('input', {
    attrs: {
      "type": "text",
      "placeholder": "搜索商品"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon iconfont iconsousuo"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "swiper"
  }, [_c('swiper', {
    staticClass: "swiper-container",
    attrs: {
      "indicator-dots": "true",
      "autoplay": "true",
      "interval": "3000",
      "circular": "true",
      "duration": "500"
    }
  }, _vm._l((_vm.banner), function(item, index) {
    return _c('block', {
      key: index
    }, [_c('swiper-item', {
      staticClass: "swiper-item",
      attrs: {
        "mpcomid": '0-' + index
      }
    }, [_c('image', {
      staticClass: "slide-image",
      attrs: {
        "src": item.image_url
      }
    })])], 1)
  }))], 1), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "our-cont"
  }), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm._l((_vm.hotGoods), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "shop-list",
      attrs: {
        "eventid": '2-' + index
      },
      on: {
        "click": function($event) {
          _vm.goodsDetail(item.id)
        }
      }
    }, [_c('image', {
      staticClass: "imgs",
      attrs: {
        "src": item.list_pic_url,
        "alt": ""
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "list-cont"
    }, [_c('div', {
      staticClass: "goods_title"
    }, [_vm._v("\n        " + _vm._s(item.name) + "\n      ")]), _vm._v(" "), _vm._m(2, true), _vm._v(" "), _vm._m(3, true), _vm._v(" "), _c('div', {
      staticClass: "col-money"
    }, [_c('p', {
      staticClass: "p-fr"
    }, [_c('i', {
      staticClass: "quan"
    }, [_vm._v("10元券")])], 1), _vm._v("\n        券后 \n        "), _c('span', {
      staticClass: "s-k"
    }, [_c('i', [_vm._v("¥")]), _vm._v("5.1\n        ")], 1)], 1)])])
  })], 2)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user-title"
  }, [_c('div', {
    staticClass: "u-left"
  }, [_c('span', [_vm._v(" ")]), _vm._v(" 大家都在领\n    ")]), _vm._v(" "), _c('div', {
    staticClass: "u-right"
  }, [_c('span', [_vm._v("1111119999")]), _vm._v("  大家都在领\n    ")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user-title"
  }, [_c('div', {
    staticClass: "u-left"
  }, [_c('span', [_vm._v(" ")]), _vm._v(" 优惠列表\n    ")]), _vm._v(" "), _c('div', {
    staticClass: "u-right"
  }, [_c('span', [_vm._v("1111119999")]), _vm._v("  更多\n    ")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "result_tm icon"
  }, [_c('image', {
    staticClass: "imgs-icon",
    attrs: {
      "src": "../../../static/list-img/1.jpg",
      "alt": ""
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon"
  }, [_vm._v("包邮")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-yuan"
  }, [_c('span', [_vm._v(" 原价 ¥59.8")]), _vm._v(" "), _c('span', {
    staticClass: "fr"
  }, [_vm._v("已售2.6万件")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2c65f158", esExports)
  }
}

/***/ })

},[239]);
//# sourceMappingURL=main.js.map