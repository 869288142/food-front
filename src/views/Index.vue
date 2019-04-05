<template>
  <!-- 特色美食排行 -->
  <div class="root">
    <div class="wrapper">
      <div>
        <div class="rank-list">
        <div class="title">
          <i></i>
          <span>广州特色美食排行</span>
        </div>
        <ul>
          <li v-for="(dishes, index) in sp_dishes_list" :key="index" class="item">
            <em>{{index+1}}</em>
            <h3>{{dishes.name}}</h3>
          </li>
        </ul>
        </div>
        <!-- <button class="new">推荐</button> -->
        <router-link class="new-res" to="/add-res">
          <i></i>
          推荐新地点
        </router-link>
      </div>
      <!-- 搜索区 -->
      <div class="search">
        <div class="header">
          <div class="title">
            <i></i>
            <h1>广州美食推荐</h1>
          </div>
          <div class="form">
            <input v-model="query.where.name" type="text" name="" id="">
            <input @click="searchBykey" type="button" value="搜索">
          </div>
        </div>
        <div class="condition">
          <div class="feather-select clearfix">
            <span>特色:</span>
            <ul>
               <li>
                <a :class="activeClass(selectFeatureId, 0)" href="javascript:void(0);" @click="selectFeature(0)">不限</a>
              </li>
              <li v-for="(feature,index) in f_list" :key="index">
                <a :class="activeClass(selectFeatureId, feature.id)" href="javascript:void(0);" @click="selectFeature(feature.id)">{{feature.name}}</a>
              </li>
            </ul>
          </div>
          <div class="category-select clearfix">
            <span>分类:</span>
            <ul>
              <li>
                <a :class="activeClass(selectCuisineId, 0)" href="javascript:void(0);" @click="selectCategory(0)">不限</a>
              </li>
              <li v-for="(category,index) in categorys" :key="index">
                <a :class="activeClass(selectCuisineId, category.id)" href="javascript:void(0);" @click="selectCategory(category.id)">{{category.name}}  </a>
              </li>
            </ul>
          </div>
          <div class="area-select">
            <span>商圈:</span>
            <el-tabs class="tab" v-model="activePaneName" @tab-click="tabClick">
              <el-tab-pane label="不限" name="0"></el-tab-pane>
              <el-tab-pane 
              v-for="(district, index) in a_district_list" 
              :key="index" 
              :label="district.name" 
              :name="district.id + ''"
              >
                <ul>
                  <li>
                    <a :class="activeClass(selectAreaId, 0)" href="javascript:void(0);" @click="selectArea(0)">不限</a>
                  </li>
                  <li v-for="(area,index) in district.areas" :key="index">
                    <a :class="activeClass(selectAreaId, area.id)" href="javascript:void(0);" @click="selectArea(area.id)">{{area.name}}</a>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="order-select">
            <a @click="noOrder" href="javascript:void(0);">
              默认
            </a>
            <a @click="scoreOrder" href="javascript:void(0);">
              评分
              <i class="arrow-down" :class="{'active-arrow-down': isScoreActive}"></i>
            </a>
            <a @click="commentOrder" href="javascript:void(0);">
              点评数
              <i class="arrow-down" :class="{'active-arrow-down': isCommentActive}"></i> 
            </a>
            <a @click="priceOrder" href="javascript:void(0);">
              人均
              <i class="arrow-up" :class="{'active-arrow-up': isPriceActive}"></i>
            </a>
          </div>
        </div>
        <div class="r-show">
          <ul class="r-list">
            <li v-for="(r, index) in r_list" :key="index"  class="item">
              <img :src="r.avatar_url || `/public/img/default-photo.jpeg`" alt="" class="p">
              <div class="text">
                <span class="r-name" @click="gotoDetail(r.id)">{{r.name}}</span>  
                <div class="r-i">
                  <div>
                    <span class="nostar">
                      <i :class="star(r.score)"></i>  
                    </span>
                    <span>{{r.score}}分</span>
                    <span>{{r.comment_count}}条点评</span>
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
          <el-pagination class="pagination"
            background
            layout="prev, pager, next"
            :current-page.sync="query.currentPage"
            :total="r_count"
            :page-size="2"
            @current-change="pageChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
export default {
  data() {
    // 生成列表数组
    return {
      r_list: [],
      r_count: 0,
      categorys: [],
      a_district_list: [],
      sp_dishes_list: [],
      f_list: [],
      price_desc: true,
      activePaneName: "0",
      isScoreActive: false,
      isPriceActive: false,
      isCommentActive: false,
      selectFeatureId: 0,
      selectCuisineId: 0,
      selectAreaId: 0,
      query: {
        where: {
          feature_id: 0,
          cuisine_id: 0,
          area_id: 0,
          name: ""
        },
        order: [["score","DESC"], ["comment_count", "DESC"]],
        currentPage: 1
      }
    }
  },
  computed: {
    ...mapGetters(["city_id"])
  },
  methods: {
    ...mapMutations(["setRId"]),
    selectArea(area_id) {
      this.selectAreaId = area_id
      this.query.where.area_id = area_id
      this.getRestaurantList()
    },
    selectCategory(cuisine_id) {
      this.selectCuisineId = cuisine_id
      this.query.where.cuisine_id = cuisine_id
      this.getRestaurantList()
    },
    selectFeature(feature_id) {
      this.selectFeatureId = feature_id
      this.query.where.feature_id = feature_id
      this.getRestaurantList()
    },
    searchBykey() {
      this.getRestaurantList()
    },
    scoreOrder() {
      this.query.order = []
      this.query.order.push(["score", "DESC"])
      this.resetActiveOrder()
      this.isScoreActive = true
      this.getRestaurantList()
    },
    priceOrder() {
      this.query.order = []
      this.query.order.push(["comment_count", "DESC"], ["score", "DESC"], ["avg_price", "ASC"])
      this.resetActiveOrder()
      this.isPriceActive = true
      this.getRestaurantList()
    },
    commentOrder() {
      this.query.order = []
      this.query.order.push(["comment_count", "DESC"],["score", "DESC"])
      this.resetActiveOrder()
      this.isCommentActive = true
      this.getRestaurantList()
    },
    noOrder() {
      this.query.order = []
      this.query.order.push(["score","DESC"], ["comment_count", "DESC"])
      this.resetActiveOrder()
      this.getRestaurantList()
    },
    async getRestaurantList() {
      this.query.where.a_district_id = parseInt(this.activePaneName, 10)
      this.query.where.city_id = this.city_id
      ;({ rows: this.r_list, count: this.r_count } = await this.apiGet(
        "/getRestaurantList",
        { queryJSON: JSON.stringify(this.query) }
      ))
    },
    resetActiveOrder() {
      this.isScoreActive = false
      this.isPriceActive = false
      this.isCommentActive = false
    },
    activeClass(sid, cid) {
      // console.log("active")
      return {
        active: sid === cid
      }
    },
    tabClick() {
      this.selectAreaId = 0
      this.query.where.area_id = 0
      this.getRestaurantList()
    },
    pageChange() {
      this.getRestaurantList()
    },
    star(score) {
      let floorScore = Math.floor(score)
      return {
        [`star${floorScore}`]: true
      }
    },
    gotoDetail(r_id) {
      this.setRId(r_id)
      let r = this.r_list.find(r => r.id === r_id)
      this.$router.push({ path: "/detail"})
    }
  },
  watch: {
    async city_id() {
      this.sp_dishes_list = await this.apiGet("/getSpDishesList", { city_id: this.city_id}) 
      await this.getRestaurantList()
    }
  },
  async created() {
    this.getRestaurantList()
    // eslint-disable-next-line
    let p1 = this.apiGet("/getSpDishesList", { city_id: this.city_id})
    let p2 = this.apiGet("/getCuisineList")
    let p3 = this.apiGet("/getDistrictAndArea", { city_id: this.city_id })
    let p4 = this.apiGet("/getFeatureList")
    ;[
      this.sp_dishes_list,
      this.categorys,
      this.a_district_list,
      this.f_list
      // eslint-disable-next-line
    ] = await util.asyncPromise(p1, p2, p3, p4)
  }
}
</script>
<style lang="scss" scoped>
.nostar {
  display: inline-block;
  width: 68px;
  height: 12px;
  margin-right: 8px;
  @include icon-bg(-60px, -34px);
}
@for $i from 1 through 5 {
  .star#{$i} {
    @include icon-bg(-60px, -22px);
    width: #{(14 * $i)}px;
    display: inline-block;
    height: 12px;
  }
}
.root {
  background: #fff;
  @include main-min-height($h-margin: 0px, $h-padding: 0px);
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
      @include icon-bg(-132px, -125px);
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
.new-res {
  text-decoration: none;
  font-size: 16px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  background-color: $theme-color;
  height: 34px;
  > i {
    display: inline-block;
    width: 18px;
    height: 18px;
    @include icon-bg(-20px, -200px);
    margin-right: 5px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.search {
  width: 680px;
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
        @include icon-bg(-60px, -125px);
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
        background-color: $theme-color;
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
          color: #333;
        }
        .active {
          color: $theme-color;
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
.area-select {
  display: flex;
  align-items: flex-start;
  > span {
    line-height: 40px;
    font-size: 14px;
    margin-right: 8px;
  }
  .tab {
    width: calc(100% - 40px);
    /deep/ .el-tabs__nav {
      > div {
        font-size: 12px;
      }
    }
    /deep/ ul {
      display: flex;
      flex-wrap: wrap;
      > li {
        line-height: 24px;
        margin-right: 8px;
        > a {
          color: #333;
          text-decoration: none;
        }
        .active {
          color: #ff8a00;
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
    .arrow-down {
      @include sprite-bg(-40px, -160px);
    }
    .arrow-up {
      @include sprite-bg(-50px, -160px);
    }
    .active-arrow-up {
      background-position: -70px -160px;
    }
    .active-arrow-down {
      background-position: -60px -160px;
    }
    > i {
      display: inline-block;
      width: 7px;
      height: 9px;
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
    }
    .text {
      width: calc(100% - 15px - 15px - 170px);
      padding: {
        left: 30px;
      }
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      .r-name {
        cursor: pointer;
        text-decoration: none;
        font-size: 16px;
        font-weight: normal;
        color: $theme-color;
      }
      .r-i {
        width: 100%;
        display: flex;
        justify-content: space-between;
        > div {
          display: flex;
          align-items: center;
        }
        .score {
          font-size: 16px;
          color: #0d89e3;
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
