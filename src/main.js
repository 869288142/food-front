import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 获取cookie
// import { Cookie } from './util'
// axios配置
import axios from 'axios'
// 拦截axios请求
axios.interceptors.request.use(function(config) {
  // let csrfToken = Cookie.get('csrfToken')
  // axios.defaults.headers['x-csrf-token'] = csrfToken
  return config
})
window.axios = axios
import httpMixin from './mixins/httpMixin'
Vue.mixin(httpMixin)
// 导入全局重置样式
import './rest.scss'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
