import Vue from "vue"
import Vuex from "vuex"
import VuexPersistence from "vuex-persist"
Vue.use(Vuex)
// 每次提交mutation时，保存到localStorge ,重启应用时重新读取
let vuexLocal = new VuexPersistence()
export default new Vuex.Store({
  state: {
    user: {
      id: 1,
      name: "卷卷"
    },
    selectCity: {
      id: 4,
      name: "广州"
    },
    scoreTips: ["千万别去", "不推荐", "一般般", "值得一去", "必须推荐"],
    r_id: 0
  },
  getters: {
    city_id(state) {
      return state.selectCity.id
    },
    cityName(state) {
      return state.selectCity.name
    },
    getTips(state) {
      return function(index) {
        return state.scoreTips[index]
      }
    },
    user_id(state) {
      return state.user.id
    },
    isLogin(state) {
      return state.user.id !== undefined
    },
    userName(state) {
      return state.user.name
    }
  },
  mutations: {
    initUser(state, user) {
      state.user = user
    },
    setCity(state, city) {
      state.selectCity = city
    },
    setRId(state, r_id) {
      state.r_id = r_id
    }
  },
  actions: {},
  plugins: [vuexLocal.plugin]
})
