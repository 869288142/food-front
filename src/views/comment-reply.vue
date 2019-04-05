<template>
  <div class="comment">
    <div class="item flex-main-around">
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
            >
              <i></i>
            </span>
            <span class="like-count">{{comment.like_count}}</span>
          </div>
        </div>
        <p class="content">
          {{comment.content}}
        </p>
        <div class="photo">
          <img
              v-for="(img, index) in getImgs(comment.imgs)"
              :key="index"
              :src="img.filepath"
              alt=""
            >
        </div>
        <div class="comment-footer flex-main-between">
          <span class="time">{{comment.create_time}}</span>
        </div>
      </div>
    </div>
    <div class="reply-comment">
      <h2>网友回复</h2>
      <ul>
        <li v-for="(replyComment, index) in replyComments" :key="index" class="reply-comment-item">
          <img src="/public/img/default-avatar.png" alt="">
          <div class="reply-comment-item-text">
            <span>{{replyComment.user.name}}</span>
            <div>
              {{replyComment.content}}
            </div>
            <span>{{replyComment.create_time}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="reply">
      <textarea v-model="content" name="" id="" cols="30" rows="10"></textarea>
      <button @click="submitReply">回复</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex"
export default {
  data() {
    return {
      comment: {
        user: {}
      },
      comment_id: 0,
      content: "",
      replyComments: []
    }
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
    async submitReply() {
      let comment = {
        p_id: this.comment_id,
        user_id: this.user_id,
        restaurant_id: this.r_id,
        content: this.content
      }
      await this.apiPost("/submitReplyComment", comment)
      this.replyComments = await this.apiGet("/getReplyComment", {
        id: this.comment_id
      })
    },
    getImgs(imgJSON) {
      return imgJSON ? JSON.parse(imgJSON ) : []
    }
  },
  computed: {
    ...mapState(["r_id"]),
    ...mapGetters(["user_id"])
  },
  async created() {
    let { comment_id } = this.$route.query
    console.log(this.$route.query)
    this.comment_id = comment_id
    this.comment = await this.apiGet("/getComment", { id: comment_id })
    this.replyComments = await this.apiGet("/getReplyComment", {
      id: comment_id
    })
  }
}
</script>
<style lang="scss" scoped>
.comment {
  background-color: #fff;
  margin-top: 20px;
}
.reply-comment {
  margin: 20px;
  > h2 {
    margin-bottom: 20px;
  }
  &-item {
    border-top: dashed 1px #cecece;
    padding: 20px 0;
    display: flex;
    align-items: flex-start;
    > img {
      display: inline-block;
      width: 40px;
      height: 40px;
    }
    &-text {
      > span:first-child {
        color: #ff7200;
      }
      > div {
        margin: 20px 0;
      }
      margin-left: 30px;
    }
  }
}
.reply {
  width: 80%;
  margin: 0 auto;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  > textarea {
    resize: none;
    height: 60px;
    width: 100%;
  }
  > button {
    margin-top: 5px;
    border: none;
    display: inline-block;
    width: 50px;
    height: 24px;
    background-color: $theme-color;
    vertical-align: middle;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
}
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
</style>
