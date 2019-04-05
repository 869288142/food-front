<template>
  <div class="reply">
    <ul class="reply-list">
      <li v-for="(userComment, index) in userComments" :key="index" class="reply-list-item">
        <!-- <img src="/public/img/default-avatar.png" alt=""> -->
        <div class="reply-list-item-wrap">
          <h3>{{userComment.restaurant_name}}</h3>
          <span>@{{userComment.user_name}}</span>
          <div @click="gotoUserReplyComment(userComment.restaurant_id, userComment.comment_id)">
            {{userComment.content}}
          </div>
          <span>{{userComment.create_time}}</span>
        </div>
        <span class="delete" @click="remove(userComment.id)">删除</span>
      </li>  
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
import * as R from "ramda"
export default {
  name: "user-reply",
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
    isUserComment(comment) {
      return R.not(this.isRestaurantComment(comment))
    },
    gotoUserReplyComment(restaurant_id, comment_id) {
      this.setRId(restaurant_id)
      this.$router.push({ path: "/detail/reply", query: { comment_id } })
    },
    async remove(id) {
      await this.apiDelete("/reply", { id })
      this.comments = await this.apiGet("/getUserReplyDetailComment", {
        id: this.user_id
      })
    }
  },
  computed: {
    ...mapGetters(["user_id"]),
    userComments() {
      let userComments = R.filter(this.isUserComment, this.comments)
      return userComments
    }
  },
  async created() {
    this.comments = await this.apiGet("/getUserReplyDetailComment", {
      id: this.user_id
    })
  }
}
</script>
<style lang="scss" scoped>
.reply {
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
          margin: 10px 0;
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
