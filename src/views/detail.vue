<template>
  <div class="root">
    <div class="detail">
      <!-- 餐馆信息 -->
      <div class="information">
        <div class="text flex-main-column-around">
          <h1>{{r.name}}</h1>
          <div class="evaluate flex-main-between">
            <i>{{r.score}}</i>
            <span>条点评</span>
            <span>人均{{r.avg_price}}元</span>
          </div>
          <div class="flex-main-between">
            <!-- <span>{{r.area.name}}</span> -->
            <span>地址: {{r.address}}</span>
          </div>
          <div>
            <span>电话: {{r.tel}}</span>
          </div>
          <div>
            <span>营业时间: {{r.business_hours}}</span>
          </div>
          <button @click="gotoComment(r.id)">我要点评</button>
        </div>
        <img src="" alt="">
      </div>
      <!-- 推荐菜 -->
      <div class="recommand">
        <h2>
          <span>推荐菜</span>
        </h2>
        <ul class="list">
          <li v-for="(dish, index) in r.dishes" :key="index" class="item">
            <img src="" alt="">
            <span>{{dish.name}}</span>
            <span class="price">￥{{dish.price}}</span>
          </li>
        </ul>
      </div>
      <!-- 评论列表 -->
      <div class="comment">
        <ul class="list">
          <li v-for="(comment, index) in comments" :key="index" class="item flex-main-around">
            <img src="" alt="">
            <div class="article flex-main-column-around">
              <span class="name">{{comment.user.name}}</span>
              <div class="evaluate">
                <i></i>
                <span>人均:323元</span>
              </div>
              <div class="content">
                {{comment.content}}
              </div>
              <div class="favorite">
                <span>喜欢的菜:</span>
                <span v-for="(e, index) in 5" :key="index">鱼皮</span>
              </div>
              <div class="photo flex-main-between">
                <img v-for="(e, index) in 5" :key="index" src="" alt="">
              </div>
              <span>2019-01-23 22:23</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "detail",
  data() {
    return {
      r: {},
      comments: []
    }
  },
  methods: {
    gotoComment(id) {
      console.log(id)
      this.$router.push({ path: "/comment", query: { id } })
    }
  },
  async mounted() {
    let { id } = this.$route.query
    this.r = await this.apiGet("/getRestaurantDetail", { id })
    this.comments = await this.apiGet("/getRestaurantCommentList", { id })
  }
}
</script>
<style lang="scss" scoped>
.root {
  padding: 40px 0;
}
.detail {
  width: 800px;
  margin: 0 auto;
}
.information {
  height: 250px;
  padding: 18px;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  background-color: #fff;
  > img {
    width: 170px;
    flex-basis: 50%;
    background-color: aquamarine;
  }
  .text {
    > h1 {
      font-weight: normal;
      color: #333;
    }
    .evaluate {
      > i {
        display: inline-block;
        width: 68px;
        height: 12px;
        margin-right: 8px;
        background: url("../assets/icon.png") no-repeat -60px -34px;
      }
    }
    > button {
      border: none;
      height: 30px;
      color: #fff;
      cursor: pointer;
      background-color: #ffa800;
    }
  }
}
.recommand {
  background-color: #fff;
  margin-top: 10px;
  > h2 {
    border-bottom: solid 1px #f0f0f0;
    line-height: 40px;
    > span {
      margin-left: 10px;
    }
  }
  .list {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    .item {
      position: relative;
      margin-left: 60px;
      margin-bottom: 30px;
      text-align: center;
      > img {
        display: block;
        width: 90px;
        height: 70px;
        background-color: aqua;
      }
      .price {
        position: absolute;
        right: 0;
        top: 0;
        margin: 8px 8px 0 0;
        color: #fff;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.65);
      }
    }
  }
}
.comment {
  background-color: #fff;
  margin-top: 20px;
  .list {
    .item {
      margin: 0 20px;
      padding: 20px 10px;
      align-items: flex-start;
      border-bottom: dashed 1px #cecece;
      > img {
        width: 60px;
        height: 60px;
        background-color: aqua;
        display: inline-block;
      }
      .article {
        > span {
          &:not(:last-child) {
            margin-bottom: 20px;
          }
        }
        > div {
          margin-bottom: 20px;
        }
        .name {
          color: #ff7200;
        }
        .evaluate {
          display: flex;
          align-items: center;
          > i {
            display: inline-block;
            width: 68px;
            height: 12px;
            margin-right: 8px;
            background: url("../assets/icon.png") no-repeat -60px -34px;
          }
        }
        .content {
        }
        .favorite {
          > span {
            margin-right: 10px;
          }
        }
        .photo {
          > img {
            display: inline-block;
            width: 60px;
            height: 60px;
            background-color: aqua;
          }
        }
      }
    }
  }
}
</style>
