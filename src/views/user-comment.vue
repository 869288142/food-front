<template>
  <div class="r-comment">
    <ul class="r-comment-list">
      <li v-for="(restaurantComment, index) in restaurantComments" class="r-comment-list-item">
        <img src="/public/img/default-photo.jpeg" alt="">
        <div class="r-comment-list-item-wrap">
          <h3>{{restaurantComment.restaurant.name}}</h3>
          <div @click="gotoRestaurantComment(restaurantComment.restaurant_id)">
            {{restaurantComment.content}}
          </div>
          <span>{{restaurantComment.create_time}}</span>
        </div>
        <span class="delete" @click="remove(restaurantComment.id)">删除</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
import * as R from "ramda"
export default {
  name: "user-comment",
  data() {
    return {
      comments: []
    }
  },
  methods: {
    ...mapMutations(["setRId"]),
    isRestaurantComment(comment) {
      return comment.p_id === 0
    },
    gotoRestaurantComment(restaurant_id) {
      this.setRId(restaurant_id)
      this.$router.push({ path: "/detail" })
    },
    async remove(id) {
      await this.apiDelete("/comment", { id })
      this.comments = await this.apiGet("/getUserComment", { id: this.user_id })
    }
  },
  computed: {
    ...mapGetters(["user_id"]),
    restaurantComments() {
      let restaurantComment = R.filter(this.isRestaurantComment, this.comments)
      return restaurantComment
    }
  },
  async created() {
    this.comments = await this.apiGet("/getUserComment", { id: this.user_id })
  }
}
</script>
<style lang="scss" scoped>
.r-comment {
  > h2 {
    padding: 10px 0;
  }
  &-list {
    &-item {
      display: flex;
      align-items: flex-start;
      position: relative;
      // margin: 0 10%;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
      padding: 5px;
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
.delete {
  color: $theme-color;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
