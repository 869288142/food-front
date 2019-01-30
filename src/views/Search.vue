<template>
  <div>
    <!-- 餐馆列表 -->
    <div class="r-show">
      <ul class="r-list">
      <li v-for="(r, index) in r_list" :key="index"  class="item">
        <div class="p">

        </div>
        <div class="text">
          <h4>{{r.name}}</h4>
          <div class="r-i">
            <div>
              <span>{{r.score}}</span>
              <span>{{r.comments.length}}条点评</span>
              <span>人均 ￥{{r.avg_price}}</span>
            </div>
            <div>
              <span>{{r.taste}}</span>
              <span>{{r.environment}}</span>
              <span>{{r.service}}</span>
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
</template>
<script>
import { ArrayHelper } from '../util'
export default {
  name: 'search',
  data() {
    return {
      // 生成列表数组
      r_list: [],
      item: {
        name: ' 佛山皇冠假日酒店',
        cuisine: '私房菜',
        a_district: '祖庙',
        address: '广州市荔湾区十五甫三巷2-2',
        dishes: [
          { name: '红烧牛肉面' },
          { name: '红烧牛肉面' },
          { name: '红烧牛肉面' }
        ],
        score: 5,
        taste: 9.0,
        environment: 9.0,
        service: 9.0,
        c_count: 107,
        avg_price: 689
      }
    }
  },
  // 控制生命周期来避免数组非响应
  async mounted() {
    let [item] = await this.apiGet('/r')
    this.r_list = ArrayHelper.getRepeatElementArray(item, 10)
  }
}
</script>
<style lang="scss" scoped>
.r-show {
  width: 950px;
  margin: 0 auto;
}
.r-list {
  background-color: #fff9f7;
  .item {
    border: solid 1px #f0f0f0;
    padding: 15px;
    list-style-type: none;
    display: flex;
    .p {
      width: 170px;
      height: 127px;
      background-color: aqua;
    }
    .text {
      padding: {
        left: 30px;
      }
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      .r-i {
        width: 720px;
        display: flex;
        justify-content: space-between;
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
