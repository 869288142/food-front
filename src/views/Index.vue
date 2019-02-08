<template>
  <!-- 特色美食排行 -->
  <div class="root">
    <div class="wrapper">
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
        <div class="condition">
          <div class="feather-select clearfix">
            <span>特色:</span>
            <ul>
              <li v-for="(e,index) in 20" :key="index">
                <a href="">不限</a>
              </li>
            </ul>
          </div>
          <div class="category-select clearfix">
            <span>分类:</span>
            <ul>
              <li v-for="(e,index) in 20" :key="index">
                <a href="">不限</a>
              </li>
            </ul>
          </div>
          <div class="category-select clearfix">
            <span>商圈:</span>
            <ul>
              <li v-for="(e,index) in 20" :key="index">
                <a href="">不限</a>
              </li>
            </ul>
          </div>
          <div class="order-select">
            <a href="">
              评分
              <i></i>
            </a>
            <a href="">
              人均
              <i></i>
            </a>
            <a href="">
              点评数
              <i></i> 
            </a>
          </div>
        </div>
        <div class="r-show">
          <ul class="r-list">
            <li v-for="(r, index) in r_list" :key="index"  class="item">
              <div class="p">

              </div>
              <div class="text">
                <router-link :to="{ path: '/detail' , query: { id: r.id }}" class="r-name">{{r.name}}</router-link>  
                <div class="r-i">
                  <div>
                    <i class="star">{{r.score}}</i>
                    <span>{{r.comments.length}}条点评</span>
                    <span>人均 ￥{{r.avg_price}}</span>
                  </div>
                  <div>
                    <span>口味: {{r.taste}}</span>
                    <span>环境: {{r.environment}}</span>
                    <span>服务: {{r.service}}</span>
                  </div>
                </div>
                <div>
                  <span>{{r.cuisine.name}}</span>
                  <span>{{r.area.name}}</span>
                  <span>{{r.address}}</span>
                </div>
                <div>
                  <span>推荐菜:</span>
                  <span v-for="(dish, index) in r.dishes" :key="index">{{dish.name}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    // 生成列表数组
    return {
      r_list: []
    }
  },
  async mounted() {
    this.r_list = await this.apiGet("/getRestaurantList")
    // eslint-disable-next-line
    util.getRepeatElementArray(this.r_list, 10)
    // console.log(_)
  }
}
</script>
<style lang="scss" scoped>
.root{
  background: #fff; 
}
.wrapper {
  padding: 40px 0;
  width: 1000px;
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
}
.rank-list {
  .title {
    margin-bottom: 15px;
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
        cursor: pointer;
        color: #fff;
        font-size: 14px;
        vertical-align: middle;
      }
    }
  }
  .condition {
    margin-top: 20px;
    border-top: solid 1px #e9e9e9;
  }
  .category-select,
  .feather-select {
    border-bottom: solid 1px #e9e9e9;
    padding: 8px 0;
    > span {
      float: left;
      font-size: 14px;
      line-height: 24px;
      margin-right: 8px;
    }
    > ul {
      display: flex;
      flex-wrap: wrap;
      > li {
        line-height: 24px;
        margin-right: 8px;
        > a {
          text-decoration: none;
        }
        &:not(:first-child) {
          > a {
            border-left: solid 1px #c9c9c9;
            padding-left: 8px;
          }
        }
      }
    }
  }
}
.order-select {
  height: 40px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: solid 1px #eee;
  border-bottom: none;
  > a {
    color: #333;
    text-decoration: none;
    margin-right: 10px;
    padding-left: 10px;
    &:not(:first-child) {
      border-left: solid 1px #c9c9c9;
    }
    > i {
      display: inline-block;
      width: 10px;
      height: 6px;
      background: url(../assets/sprite.png) no-repeat -20px -98px;
    }
  }
}
.r-show {
}
.r-list {
  .item {
    border: solid 1px #f0f0f0;
    padding: 15px;
    display: flex;
    .p {
      width: 170px;
      height: 127px;
      background-color: aqua;
    }
    .text {
      width: 100%;
      padding: {
        left: 30px;
      }
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      .r-name {
        text-decoration: none;
        font-size: 16px;
        font-weight: normal;
        color: #ff8a00;
      }
      .r-i {
        width: 100%;
        display: flex;
        justify-content: space-between;
        > div {
          display: flex;
          align-items: center;
        }
        .star {
          display: inline-block;
          width: 68px;
          height: 12px;
          margin-right: 8px;
          background: url("../assets/icon.png") no-repeat -60px -34px;
        }
      }
      span {
        margin: {
          right: 10px;
        }
      }
    }
  }
}
</style>
