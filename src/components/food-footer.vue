<template>
  <div class="footer flex-main-center">
    <ul class="list flex-main-around">
      <li v-for="(e, index) in list" :key="index">{{e}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        "关于网站",
        "网站帮助",
        "推广服务",
        "人才招聘",
        "联系我们",
        "开发者"
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.footer {
  background-color: #333;
  height: 100px;
}
.list {
  margin: 0 auto;
  width: 1190px;
  color: #c2c2c2;
}
</style>
