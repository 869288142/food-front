<template>
  <div id="app">
    <food-header :cityName="cityName"></food-header>
    <router-view></router-view>
    <food-footer></food-footer>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  computed: {
    ...mapGetters(["cityName"])
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
