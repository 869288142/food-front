<template>
  <div class="root">
    <div class="detail">
      <!-- 餐馆信息 -->
      <div class="information">
        <div class="text flex-main-column-around">
          <h1>{{r.name}}</h1>
          <div class="evaluate">
            <span  class="r-tips">{{getRTips(r.score)}}</span>
            <!-- <span v-else  class="r-tips">暂无评价</span> -->
            <span class="nostar">
              <i :class="star(r.score)"></i>  
            </span>
            <span>{{r.score}}分</span>
            <span>{{r.comment_count}}条点评</span>
            <span>人均{{r.avg_price}}元</span>
          </div>
          <div class="flex-main-between">
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
        <div class="photo">
          <img :src="r.avatar_url || `/public/img/default-photo.jpeg`" alt="">
          <span v-if="isCollecion(r.id)" @click="addCollection(r.id, user_id)">
            收藏
            <i></i>
          </span>
        </div>
      </div>
      <!-- 简介 -->
      <div class="introduction">
        <h2>
          <span>简介</span>
        </h2>
        <p>{{r.introduction}}</p>
        <!-- <h2 >
          <span>暂无</span> 
        </h2> -->
      </div>
      <!-- 推荐菜 -->
      <!-- <div class="recommand">
        <h2>
          <span>推荐菜</span>
        </h2>
        <ul v-if="noEmpty(r.dishes)" class="list">
          <li v-for="(dish, index) in r.dishes" :key="index" class="item">
            <img src="/public/img/default-photo.jpeg" alt="">
            <span>{{dish.name}}</span>
            <span class="price">￥{{dish.price}}</span>
          </li>
        </ul>
        <h2 v-else>
          <span>暂无</span> 
        </h2>
      </div> -->
    <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from "vuex"
export default {
  name: "detail",
  data() {
    return {
      r: {},
      restaurants: []
    }
  },
  computed: {
    ...mapGetters(["getTips", "user_id"]),
    ...mapState(["r_id"])
    // isCollecion() {
    //   let r = (id) => {
    //     console.log("tigger")
    //     return !~this.restaurants.findIndex( restaurant => restaurant.id === id)
    //   }
    //   return r
    // }
  },
  methods: {
    ...mapMutations(["setRId"]),
    gotoComment(id) {
      console.log(id)
      let { name } = this.r
      this.$router.push({ path: "/comment", query: { id, name } })
    },
    noEmpty(arr) {
      return arr && arr.length !== 0
    },
    star(score) {
      let floorScore = Math.floor(score)
      return {
        [`star${floorScore}`]: true
      }
    },
    getRTips(n) {
      let floorN = Math.floor(n)
      return this.getTips(floorN)
    },
    async addCollection(restaurant_id, user_id) {
      await this.apiPost("/addCollection", {
        restaurant_id,
        user_id
      })
      this.restaurants = await this.apiGet("/getCollection", { id: this.user_id })
    },
    isCollecion(restaurant_id) {
      return !~this.restaurants.findIndex(
        restaurant => restaurant.id === restaurant_id
      )
    }
  },
  async created() {
    // let p1 = this.apiGet("/getRestaurantDetail", { id })
    // let p2 = this.apiGet("/getRestaurantCommentList", { id })
    // eslint-disable-next-line
    // ;[this.r, this.comments] = await util.asyncPromise(p1, p2)
    this.r = await this.apiGet("/getRestaurantDetail", { id: this.r_id })
    this.restaurants = await this.apiGet("/getCollection", { id: this.user_id })
    // ;[this.r] = await util.asyncPromise(p1)
  }
}
</script>
<style lang="scss" scoped>
.r-tips {
  font-weight: bold;
  color: #ff7200;
}
.root {
  padding: 40px 0;
  @include main-min-height($h-margin: 0px, $h-padding: 80px);
}
.detail {
  width: 800px;
  margin: 0 auto;
}
.information {
  // height: 250px;
  padding: 18px;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  background-color: #fff;
  .photo {
    height: 250px;
    position: relative;
    > img {
      width: 350px;
      height: 250px;
      background-color: aquamarine;
    }
    &:hover {
      > span {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    > span {
      cursor: pointer;
      font-size: 16px;
      display: none;
      position: absolute;
      width: 30%;
      height: 30%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.6);
      color: #fff;
      > i {
        display: inline-block;
        width: 16px;
        height: 16px;
        @include icon-bg(-110px, -230px);
      }
    }
  }
  .text {
    width: calc(100% - 300px);
    > h1 {
      font-weight: normal;
      color: #333;
    }
    .evaluate {
      display: flex;
      align-items: center;
      > i {
        display: inline-block;
        width: 68px;
        height: 12px;
        margin-right: 8px;
        @include icon-bg(-60px, -34px);
      }
      > span {
        margin-right: 30px;
      }
    }
    > button {
      width: 100px;
      border: none;
      height: 30px;
      color: #fff;
      cursor: pointer;
      background-color: $theme-color;
    }
  }
}
.introduction {
  background-color: #fff;
  margin-top: 10px;
  > h2 {
    border-bottom: solid 1px #f0f0f0;
    line-height: 40px;
    > span {
      margin-left: 10px;
    }
  }
  > p {
    margin: 0;
    padding: 20px 10px;
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
</style>
