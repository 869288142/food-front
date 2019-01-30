<template>
  <div class="index">
    <!-- 特色美食排行 -->
    <div class="rank-list">
      <div class="title">
        <i></i>
        <span>广州特色美食排行</span>
      </div>
      <ul>
        <li v-for="(e, index) in 10" :key="index" class="item">
          <em>1</em>
          <h3>汤</h3>
        </li>
      </ul>
    </div>
    <!-- 搜索区 -->
    <div class="search">
      <div class="header">
        <div class="title">
          <i></i>
          <h1>广州美食推荐</h1>
        </div>
        <div class="form">
          <input type="text" name="" id="">
          <input type="button" value="搜索">
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.index {
  width: 1000px;
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
}
.rank-list {
  .title {
    > i {
      display: inline-block;
      width: 16px;
      height: 21px;
      background: url(../assets/icon.png) -132px -125px;
      vertical-align: middle;
      margin: {
        right: 7px;
      }
    }
    > span {
      color: #ff9d00;
      font-size: 16px;
      vertical-align: middle;
    }
  }
  ul {
    border-top: dotted 1px #dcdcdc;
  }
  .item {
    padding: 15px 2px;
    display: flex;
    border-bottom: dotted 1px #dcdcdc;
    justify-content: space-between;
    > em {
      text-align: center;
      display: inline-block;
      width: 25px;
      height: 25px;
      background-color: #ff8b00;
      line-height: 25px;
      font-size: 16px;
      color: #fff;
      font-weight: bold;
      font-family: verdana;
    }
    > h3 {
      height: 24px;
      line-height: 24px;
      color: #333;
      font-weight: normal;
    }
  }
}
.search {
  width: 680px;
  // background-color: aqua;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      display: flex;
      align-items: center;
      > i {
        margin-right: 10px;
        display: inline-block;
        width: 16px;
        height: 20px;
        background: url(../assets/icon.png) -60px -125px;
      }
      > h1 {
        font-size: 18px;
      }
    }
    .form {
      input[type="text"] {
        vertical-align: middle;
        height: 20px;
        border: solid 1px #b6b6b6;
      }
      input[type="button"] {
        width: 50px;
        height: 24px;
        background-color: #ffa800;
        border: none;
        color: #fff;
        font-size: 14px;
        vertical-align: middle;
      }
    }
  }
}
</style>
