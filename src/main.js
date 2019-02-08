import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
// 获取cookie
// import { Cookie } from './util'
// axios配置
import axios from "axios"
// 拦截axios请求
axios.interceptors.request.use(function(config) {
  // let csrfToken = Cookie.get('csrfToken')
  // axios.defaults.headers['x-csrf-token'] = csrfToken
  return config
})
window.axios = axios
import httpMixin from "./mixins/httpMixin"
Vue.mixin(httpMixin)
// 导入全局重置样式
import "./rest.scss"
// 导入全局样式
import "./global.scss"
// 全局引入lodash
import _ from "lodash"
window._ = _

// 全局导入工具类
import * as util from "./util"

import './plugins/element.js'
window.util = util
// 将components文件下的文件全局注册
util.autoLoadingGlobalComponent()

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
