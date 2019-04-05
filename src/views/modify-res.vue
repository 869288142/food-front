<template>
  <div class="update-res">

    <el-form
      :label-position="labelPosition"
      label-width="120px"
      size="medium"
    >
      <el-form-item
        class="item"
        label="名称"
      >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item
        class="item"
        label="餐馆图片"
      >
        <el-upload
          class="avatar-uploader"
          action="/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload>
      </el-form-item>
      <el-form-item
        class="item"
        label="简介"
      >
        <el-input
          v-model="form.introduction"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="item"
        label="特色"
      >
        <el-select
          v-model="form.feature_id"
          placeholder="请选择"
        >
          <el-option
            v-for="item in feature_list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        class="item"
        label="菜系"
      >
        <el-select
          v-model="form.cuisine_id"
          placeholder="请选择"
        >
          <el-option
            v-for="item in cuisine_list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        class="item"
        label="推荐菜"
      >
        <el-tag
          v-if="dishes.length !== 0"
          :key="tag.id"
          v-for="tag in dishes"
          :closable="false"
          :disable-transitions="false"
        >
          <span>{{tag.name}}</span>
        </el-tag>
        <span v-if="dishes.length === 0">暂无</span>
        <el-button
          size="small"
          class="edit-dishes"
          @click="editDishes"
        >编辑</el-button>
      </el-form-item>
      <el-form-item
        class="item"
        label="详细区域"
      >
        <el-cascader
          :options="cascadeOption"
          v-model="selectedOptions"
          @change="detailAreaChange"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item
        class="item"
        label="地址"
      >
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item
        class="item"
        label="电话"
      >
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item
        class="item"
        label="营业时间"
      >
        <el-input v-model="form.business_hours"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          @click="updateRes"
        >保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex"
export default {
  data() {
    return {
      imageUrl: "",
      labelPosition: "right",
      form: {
        introduction: "",
        name: "",
        feature_id: null,
        cuisine_id: null,
        address: "",
        tel: "",
        business_hours: ""
      },
      feature_list: [],
      cuisine_list: [],
      province_link_list: [],
      selectedOptions: [],
      restaurant: {},
      dishes: []
    }
  },
  computed: {
    ...mapGetters(["user_id"]),
    ...mapState(["r_id"]),
    cascadeOption() {
      let options = this.province_link_list.map(province => {
        let cities = province.cities.map(city => {
          let a_districts = city.a_districts.map(a_district => {
            let areas = a_district.areas.map(area => {
              let areaOption = {
                value: area.id,
                label: area.name
              }
              return areaOption
            })
            let a_district_option = {
              value: a_district.id,
              label: a_district.name,
              children: areas
            }
            return a_district_option
          })
          let cityOption = {
            value: city.id,
            label: city.name,
            children: a_districts
          }
          return cityOption
        })
        let provinceOption = {
          value: province.id,
          label: province.name,
          children: cities
        }
        return provinceOption
      })
      return options
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.filepath
    },
    updateRes() {
      let [province_id, city_id, a_district_id, area_id] = this.selectedOptions
      // eslint-disable-next-line
      let data = Object.assign(this.form, {
        province_id,
        city_id,
        a_district_id,
        area_id,
        avatar_url: this.imageUrl,
        update_user_id: this.user_id
      })
      this.apiPut("/restaurant", {
        id: this.restaurant.id,
        restaurant: data
      })
      // this.$router.go(-1)
    },
    detailAreaChange(options) {
      // console.log(options)
    },
    async init() {
      this.restaurant = await this.apiGet("getRestaurantDetail", {
        id: this.r_id
      })
      // let [pro]
      let { province_id, city_id, a_district_id, area_id } = this.restaurant

      this.selectedOptions = [province_id, city_id, a_district_id, area_id]
      ;({
        introduction: this.form.introduction,
        avatar_url: this.imageUrl,
        name: this.form.name,
        feature_id: this.form.feature_id,
        cuisine_id: this.form.cuisine_id,
        address: this.form.address,
        tel: this.form.tel,
        business_hours: this.form.business_hours
      } = this.restaurant)
    },
    editDishes() {
      this.$router.push({
        path: "/restaurant-dishes",
        query: { name: this.restaurant.name }
      })
    }
  },
  async created() {
    let p1 = this.apiGet("/getFeatureList")
    let p2 = this.apiGet("/getCuisineList")
    let p3 = this.apiGet("/getProvinceLinkList")
    let p4 = this.apiGet("/dishes", { id: this.r_id })
    ;[
      this.feature_list,
      this.cuisine_list,
      this.province_link_list,
      { rows: this.dishes }
      // eslint-disable-next-line
    ] = await util.asyncPromise(p1, p2, p3, p4)
    await this.init()
  }
}
</script>
<style lang="scss" scoped>
.update-res {
  padding: 20px 0;
  width: 1000px;
  margin: 0 auto;
  @include main-min-height($h-margin: 0px, $h-padding: 40px);
}
.item {
  width: 500px;
}
.avatar-uploader {
  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.edit-dishes {
  margin-left: 20px;
}
</style>
