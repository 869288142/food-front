<template>
  <div class="r">
    <ul class="r-list">
      <li
        v-for="(restaurant, index) in restaurants"
        :key="index"
        class="r-list-item"
      >
        <img
          src="/public/img/default-photo.jpeg"
          alt=""
        >
        <div class="r-list-item-wrap">
          <h3 @click="gotoRestaurant(restaurant.id)">{{restaurant.name}}</h3>
          <span
            class="modify"
            @click="modify(restaurant.id)"
          >修改</span>
          <span>{{restaurant.city.name}}</span>
          <span
            class="delete"
            @click="remove(restaurant.id)"
          >删除</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
import * as R from "ramda"
export default {
  name: "user-restaurant",
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
    async remove(restaurant_id) {
      await this.apiDelete("/restaurant", {
        id: restaurant_id
      })
      this.getRestaurants()
    },
    modify(restaurant_id) {
      this.setRId(restaurant_id)
      this.$router.push({ path: "/modify-res" })
    },
    async getRestaurants() {
      ;({rows: this.restaurants} = await this.apiGet("/restaurant", { id: this.user_id }))
    }
  },
  computed: {
    ...mapGetters(["user_id"])
  },
  async created() {
    this.getRestaurants()
  }
}
</script>
<style lang="scss" scoped>
.r {
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
      border-radius: 4px;
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
.modify {
  color: $theme-color;
  position: absolute;
  right: 10px;
  top: 8px;
  cursor: pointer;
}
</style>
