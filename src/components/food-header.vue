<template>
  <div class="header flex-main-around">
    <router-link to="">首页</router-link>
    <ul class="nav flex-main-around">
      <li v-for="(e, index) in 10">用户</li>
    </ul>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.header {
  position: relative; 
  z-index: 100;
  height: 40px;
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, .4);
  color: #333;
}
.nav{
  width: 50%;
}
</style>
