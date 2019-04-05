<template>
  <div class="select-city">
    <el-form :inline="true">
      <el-form-item label="按省份筛选">
        <el-cascader
          expand-trigger="hover"
          :options="CitySelectOptions"
          v-model="selectedOptions"
          @change="handleChange"
        >
        </el-cascader>
      </el-form-item>
    </el-form>
    <!-- 已有城市首字母 -->
    <div class="letter-list">
      <h3>按字母选择: </h3>
      <router-link
        v-for="(ascFletter, index) in ascFletters"
        :key="index"
        :to="`#${ascFletter}`"
      >{{ascFletter}}</router-link>
    </div>
    <ul class="city-list" >
      <li
        class="city-list-item"
        v-for="(ascFletter, index) in ascFletters"
        :key="index"
      >
        <h3
          class="city-list-item-title"
          :id="ascFletter"
        >{{ascFletter}}</h3>
        <div class="city-list-item-body">
          <span
          @click="selectCity($event)"
            v-for="(city, index) in groupCity[ascFletter]"
            :key="index"
            :data-city="`${city.id},${city.name}`"
          >
            {{city.name}}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapMutations } from "vuex"
// 导入ramda
import * as R from "ramda"
export default {
  data() {
    return {
      input: "",
      selectedOptions: [],
      groupCity: {},
      provinceAndCityList: []
    }
  },
  computed: {
    ascFletters() {
      let fLetters = Object.keys(this.groupCity)
      let notEmptyfLetters = fLetters.filter(e =>
        this.isNotEmptyArray(this.groupCity[e])
      )
      let ascFletters = notEmptyfLetters.sort()
      return ascFletters
    },
    CitySelectOptions() {
      return this.provinceAndCityList.map(province => {
        let children = province.cities.map(city => ({
          value: city.id,
          label: city.name
        }))
        return {
          value: province.id,
          label: province.name,
          children
        }
      })
    },
    cityList() {
      let tmpArray = this.provinceAndCityList.map(province => province.cities)
      let city = R.flatten(tmpArray)
      return city
    }
  },
  methods: {
    ...mapMutations(["setCity"]),
    handleChange(selectedOptions) {
      let [, cityId] = selectedOptions
      let city = this.cityList.find(e => e.id === cityId)
      this.commitCurrentCityAndToHome(city)
    },
    selectCity(event) {
      let target = event.target
      if (this.getEventTargetName(target) === "span") {
        let cityStr = target.getAttribute("data-city")
        let [idStr, name] = cityStr.split(",")
        let id = parseInt(idStr, 10)
        // 将选择城市保存到Vuex
        let currentCity = { id, name }
        this.commitCurrentCityAndToHome(currentCity)
      }
    },
    getEventTargetName(dom) {
      let name = dom.nodeName.toLowerCase()
      return name
    },
    commitCurrentCityAndToHome({ id, name }) {
      let currentCity = { id, name }
      this.setCity(currentCity)
      this.$router.push({ path: "/" })
    }
  },
  async created() {
    this.groupCity = await this.apiGet("/getCityGroupByFirstLetter")
    this.provinceAndCityList = await this.apiGet("getProvinceAndCity")
  }
}
</script>
<style lang="scss" scoped>
.select-city {
  @include main-min-height($h-margin: 0px, $h-padding: 56px);
  width: 1000px;
  margin: 0 auto;
  background-color: #fff;
  padding: 56px 44px 0 46px;
}
.letter-list {
  margin: {
    bottom: 20px;
  }
  h3 {
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    color: #666;
    line-height: 22px;
  }
  a {
    text-decoration: none;
    vertical-align: middle;
    margin: 0 15px;
    color: #666;
    font-size: 14px;
  }
}
.city-list {
  &-item {
    display: flex;
    align-items: center;
    > h3 {
      width: 20px;
      margin-right: 30px;
      display: inline-block;
      font-size: 24px;
      color: #666;
    }
    &:hover {
      h3 {
        color: $theme-color;
      }
      .city-list-item-body {
        background-color: #f3f3f3;
        border-left-color: $theme-color;
      }
    }
    &-body {
      transition: border-left-color 0.5s;
      border-left: solid 8px #f8f8f8;
      > span {
        cursor: pointer;
        font-size: 14px;
        margin: 0 30px;
        padding: 13px 0;
        line-height: 50px;
      }
    }
  }
}
</style>
