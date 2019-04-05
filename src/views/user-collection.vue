<template>
  <div class="r-collection">
    <ul class="r-collection-list">
      <li v-for="(restaurant, index) in restaurants" :key="index" class="r-collection-list-item">
        <img src="/public/img/default-photo.jpeg" alt="">
        <div class="r-collection-list-item-wrap">
          <h3 @click="gotoRestaurant(restaurant.id)">{{restaurant.name}}</h3>
          <span>{{restaurant.city_name}}</span>
          <span class="delete" @click="deleteCollection(restaurant.id, user_id)">删除</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
import * as R from "ramda"
export default {
  name: "user-collection",
  data() {
    return {
      restaurants: []
    }
  },
  methods: {
    ...mapMutations(["setRId"]),
    gotoRestaurant(restaurant_id) {
      this.setRId(restaurant_id)
      this.$router.push({ path: "/detail" })
    },
    async deleteCollection(restaurant_id, user_id) {
      await this.apiDelete("/collection", {
        restaurant_id,
        user_id
      })
      this.restaurants = await this.apiGet("/getCollection", {
        id: this.user_id
      })
    }
  },
  computed: {
    ...mapGetters(["user_id"])
  },
  async created() {
    this.restaurants = await this.apiGet("/getCollection", { id: this.user_id })
  }
}
</script>
<style lang="scss" scoped>
.r-collection {
  > h2 {
    padding: 10px 0;
  }
  &-list {
    &-item {
      display: flex;
      align-items: flex-start;
      // margin: 0 10%;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
      padding: 5px;
      position: relative;
      > img {
        display: inline-block;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        margin-right: 20px;
      }
      &-wrap {
        display: flex;
        flex-direction: column;
        > h3 {
          margin-bottom: 10px;
          cursor: pointer;
        }
        > div {
          margin-bottom: 10px;
          cursor: pointer;
          color: $theme-color;
        }
        > span {
        }
      }
    }
  }
}
.detail {
  align-self: flex-end;
}
.delete-wrap {
  position: absolute;
  top: 5px;
  right: 5px;
}
.delete {
  color: $theme-color;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
