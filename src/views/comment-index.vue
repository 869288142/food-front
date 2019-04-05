<template>
  <div>
    <!-- 评论列表 -->
    <div class="comment">
      <h2>
        <span>网友点评</span>
      </h2>
      <ul
        v-if="noEmpty(comments)"
        class="list"
      >
        <li
          v-for="(comment, index) in comments"
          :key="index"
          class="item flex-main-around"
        >
          <img
            src="/public/img/default-avatar.png"
            alt=""
          >
          <div class="article flex-main-column-around">
            <div class="flex-main-between">
              <div class="comment-header-left flex-main-v-center">
                <span class="name">
                  {{comment.user.name}}
                  <i></i>
                </span>
                <span class="nostar">
                  <i :class="star(comment.score)"></i>
                </span>
                <span>人均: ￥{{comment.avg_price}}</span>
              </div>
              <div class="like-wrap">
                <span
                  class="like-icon-wrap"
                  @click="addLike(comment)"
                >
                  <i></i>
                </span>
                <span class="like-count">{{comment.like_count}}</span>
              </div>
            </div>
            <p class="content">
              {{comment.content}}
            </p>
            <!-- <div class="favorite">
                <span>喜欢的菜:</span>
                <span v-for="(e, index) in 5" :key="index">鱼皮</span>
              </div> -->
            <div class="photo">
              <!-- {{comment.imgs}} -->
              <img
                v-for="(img, index) in JSON.parse(comment.imgs)"
                :key="index"
                :src="img.filepath"
                alt=""
              >
              <!-- {{img.}} -->
              <!-- </span> -->
            </div>
            <div class="comment-footer flex-main-between">
              <span class="time">{{comment.create_time}}</span>
              <a
                class="reply"
                href="javascript:void(0);"
                @click="gotoReply(comment.id)"
              >
                回应
              </a>
              <!-- <router-link
                @click="gotoReply(comment.id)"
                class="reply"
              >回应</router-link> -->
            </div>
          </div>
        </li>
      </ul>
      <h2 v-else>
        <span>暂无</span>
      </h2>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :total="count"
        :page-size="limit"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex"
export default {
  data() {
    return {
      comments: [],
      currentPage: 1,
      limit: 2,
      count: 10
    }
  },
  computed: {
    ...mapState(["r_id"]),
    ...mapGetters(["isLogin"])
  },
  methods: {
    noEmpty(arr) {
      return arr && arr.length !== 0
    },
    star(score) {
      let floorScore = Math.floor(score)
      return {
        [`star${floorScore}`]: true
      }
    },
    async addLike(comment) {
      console.log("click")
      if (!this.isLogin) {
        this.$router.push({ path: "/login" })
      } else {
        let { id, like_count } = comment
        like_count++
        let postData = {
          id,
          updateField: {
            like_count
          }
        }
        await this.apiPost("/updateComment", postData)
        this.getComment()
      }
    },
    gotoReply(comment_id) {
      this.$router.push({ path: "/detail/reply", query: { comment_id } })
    },
    async pageChange() {
      this.getComment()
    },
    async getComment() {
      this.comments = await this.apiGet("/getRestaurantCommentList", {
        currentPage: this.currentPage,
        limit: this.limit,
        id: this.r_id
      })
    },
    async getCommentCount() {
      let comemnts = await this.apiGet("/getRestaurantCommentList", {
        id: this.r_id
      })
      this.count = comemnts.length
    }
  },
  async created() {
    await this.getCommentCount()
    await this.getComment()
  }
}
</script>
<style lang="scss" scoped>
.comment {
  background-color: #fff;
  margin-top: 20px;
  > h2 {
    border-bottom: solid 1px #f0f0f0;
    line-height: 40px;
    > span {
      margin-left: 10px;
    }
  }
  .list {
    .item {
      margin: 0 20px;
      padding: 20px 0;
      align-items: flex-start;
      border-bottom: dashed 1px #cecece;
      > img {
        width: 60px;
        height: 60px;
        display: inline-block;
      }
      .article {
        width: calc(100% - 10px - 10px - 60px);
        > span {
          &:not(:last-child) {
            margin-bottom: 10px;
          }
        }
        .comment-header-left {
          > span {
            margin-right: 8px;
          }
        }
        .like-wrap {
          .like-icon-wrap {
            display: inline-block;
            padding: 2px;
            background-color: #ffa420;
            text-align: center;
            > i {
              display: inline-block;
              width: 14px;
              height: 12px;
              vertical-align: middle;
              @include sprite-bg(0px, -28px);
            }
          }
          .like-count {
            margin-left: 8px;
          }
        }
        // > span {
        //   margin-top: 10px;
        // }
        > div {
          // margin-bottom: 20px;
        }
        .name {
          color: #ff7200;
          > i {
          }
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
        .content {
          line-height: 24px;
        }
        .favorite {
          > span {
            margin-right: 10px;
          }
        }
        .photo {
          display: flex;
          justify-content: flex-start;
          > img {
            display: inline-block;
            margin-right: 10px;
            width: 96px;
            height: 96px;
          }
        }
        .comment-footer {
          margin-top: 8px;
          .reply {
            text-decoration: none;
            color: #ff7200;
          }
        }
      }
    }
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  padding: 10px 15px;
  // margin-top: 20px;
  // margin-bottom: 20px;
}
</style>
