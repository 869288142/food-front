<template>
  <div id="app">
    <food-header :cityName="cityName"></food-header>
    <router-view></router-view>
    <div id="container"></div>
    <food-footer></food-footer>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
export default {
  data() {
    return {
      cities: []
    }
  },
  computed: {
    ...mapGetters(["cityName"])
  },
  methods: {
    ...mapMutations(["setCity"]),
    // 解析定位错误信息
    onError() {
      console.log("定位失败")
    },
    //解析定位结果
    onComplete(data) {
      let {
        addressComponent: { city }
      } = data
      // 找到Geolocation与后台数据库匹配到项
      let r = this.cities.find(c => c.name === city.replace(/(.*)市$/g, "$1"))
      console.log(this)
      // 只有初次打开页面才定位
      if (!sessionStorage.getItem("vuex")) {
        this.setCity(r)
      }
    },
    setCityToVuex() {
      let map, geolocation
      //加载地图，调用浏览器定位服务
      map = new AMap.Map("container", {
        resizeEnable: true
      })
      map.plugin("AMap.Geolocation", () => {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          buttonPosition: "RB"
        })
        map.addControl(geolocation)
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, "complete", this.onComplete) //返回定位信息
        AMap.event.addListener(geolocation, "error", this.onError) //返回定位出错信息
      })
    }
  },
  async created() {
    // this.cities = await this.apiGet("city")
    // this.setCityToVuex()
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
#container {
  display: none;
}
</style>
