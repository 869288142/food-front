import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
// 获取cookie
import { getCookie } from "./util"
// axios配置
import axios from "axios"
// 拦截axios请求
axios.interceptors.request.use(function(config) {
  // let token = getCookie("token")
  // if (token) {
  //   config.headers.authorization = token
  // }
  return config
})
// axios.defaults.baseURL = '/api/'
window.axios = axios
import httpMixin from "./mixins/httpMixin"
Vue.mixin(httpMixin)
import utilMixin from "./mixins/utilMixin"
Vue.mixin(utilMixin)
// 导入全局重置样式
import "@/assets/scss/rest.scss"
// 导入全局样式
import "@/assets/scss/global.scss"
// 全局引入lodash
import _ from "lodash"
window._ = _

// 全局导入工具类
import * as util from "./util"

import "./plugins/element.js"
window.util = util

// 导入ramda
// import R from 'ramda'
// window.R = R
// 将components文件下的文件全局注册
util.autoLoadingGlobalComponent()

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
