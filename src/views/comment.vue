<template>
  <div class="root">
    <div class="comment flex-main-column-around">
      <h2>{{restaurantName}}</h2>
      <div class="flex-main-v-center">
        <label>评分</label> 
        <div class="score">
          <span class="star-bg" :class="star" ></span>
          <div class="click-star">
            <a v-for="(e, index) in 5" :key="index" @click="clickStar(e)" href="javascript:void(0);"></a>
          </div>
          <span class="startips">{{text}}</span>
        </div>
      </div>
      <div class="flex-main-v-center">
        <label>口味</label> 
        <div class="no-little-star">
          <span class="little-star-bg" :class="tatseStar" ></span>
          <div class="click-star">
            <a v-for="(e, index) in 5" :key="index" @click="clickTasteStar(e)" href="javascript:void(0);"></a>
          </div>
          <span class="startips">{{tatseText}}</span>
        </div>
      </div>
      <div class="flex-main-v-center">
        <label>环境</label> 
        <div class="no-little-star">
          <span class="little-star-bg" :class="envStar" ></span>
          <div class="click-star">
            <a v-for="(e, index) in 5" :key="index" @click="clickENVStar(e)" href="javascript:void(0);"></a>
          </div>
          <span class="startips">{{envText}}</span>
        </div>
      </div>
      <div class="flex-main-v-center">
        <label>服务</label> 
        <div class="no-little-star">
          <span class="little-star-bg" :class="serviceStar" ></span>
          <div class="click-star">
            <a v-for="(e, index) in 5" :key="index" @click="clickServiceStar(e)" href="javascript:void(0);"></a>
          </div>
          <span class="startips">{{serviceText}}</span>
        </div>
      </div>
      <div class="content">
        <label>评价</label>
        <textarea v-model="comment.content" name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div class="avg">
        <label>人均</label>
        <input v-model.number="comment.avg_price" type="text" name="" id="">
        <span>元</span>
      </div>
      <!-- <div class="favorite">
        <label>喜欢的菜</label>
        <span v-for="(e, index) in 5" :key="index">红烧牛肉面</span>
      </div> -->
      <div class="photo">
        <label>图片</label>
       <!--  <img v-for="(e, index) in 3" :key="index" src="/public/img/default-photo.jpeg" alt=""> -->
        <el-upload
          class="avatar-uploader"
          action="/upload"
          :on-preview="handlePictureCardPreview"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          list-type="picture-card"
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
      </div>
      <div class="sumbit">
        <label></label>
        <button @click="submit">提交评论</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex"
export default {
  name: "comment",
  data() {
    return {
      restaurantName:'',
      imageUrl: "",
      dialogVisible: false,
      fileList: [],
      comment: {
        restaurant_id: 0,
        content: "",
        avg_price: 0
      },
      scoreCount: 0,
      text: "点击星星打分",
      // scoreTips: ['千万别去', '不推荐', '一般般', '值得一去', '必须推荐'],
      normTips: ["特别差", "不太好", "一般般", "很棒", "超出预期"],
      tatseCount: 0,
      tatseText: "给口味打分",
      envCount: 0,
      envText: "给环境打分",
      serviceCount: 0,
      serviceText: "给服务打分"
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    ...mapGetters(["getTips"]),
    star() {
      return {
        [`star${this.scoreCount}`]: true
      }
    },
    tatseStar() {
      return {
        [`little-star${this.tatseCount}`]: true
      }
    },
    envStar() {
      return {
        [`little-star${this.envCount}`]: true
      }
    },
    serviceStar() {
      return {
        [`little-star${this.serviceCount}`]: true
      }
    }
  },
  methods: {
    submit() {
      let commentPost = this.assign(this.comment, {
        user_id: this.user.id,
        score: this.scoreCount,
        taste: this.tatseCount,
        service: this.serviceCount,
        environment: this.envCount,
        imgs: JSON.stringify(this.fileList)
      })
      console.log(commentPost)
      // const comment = {
      //   user_id: this.user.id,
      //   ...this.comment
      // }
      this.apiPost("/submitComment", commentPost)
    },
    clickStar(count) {
      this.scoreCount = count
      let index = count 
      this.text = this.getTips(index)
    },
    clickTasteStar(tatseCount) {
      this.tatseCount = tatseCount
      this.tatseText = this.normTips[tatseCount - 1]
    },
    clickENVStar(envCount) {
      this.envCount = envCount
      this.envText = this.normTips[envCount - 1]
    },
    clickServiceStar(serviceCount) {
      this.serviceCount = serviceCount
      this.serviceText = this.normTips[serviceCount - 1]
    },
    handleAvatarSuccess(res, file) {
      this.fileList.push(res)
    },
    handleRemove(file) {
      let { fileName } = file
      let index = this.fileList.findIndex(file => file.name === fileName)
      this.fileList.splice(index, 1)
    },
    handlePictureCardPreview(file) {
      this.imageUrl = file.url
      this.dialogVisible = true
    },
    // hover(count) {
    //   this.scoreCount = count
    //   let index = count 
    //   this.text = this.getTips(index)
    // },
    // clearHover() {
    //   this.scoreCount = 0
    //   this.text = this.getTips(0)
    // }
  },
  mounted() {
    ;({ id: this.comment.restaurant_id,
        name: this.restaurantName
    } = this.$route.query)
  }
}
</script>
<style lang="scss" scoped>
@for $i from 1 through 5 {
  .star#{$i} {
    width: #{$i * 26}px;
  }
}
.star-bg {
  height: 23px;
  display: inline-block;
  background: url("../assets/img/mfo-sprite.png") -300px -30px;
}
.little-star-bg {
  height: 18px;
  display: inline-block;
  background: url("../assets/img/mfo-sprite.png") -300px -85px;
}
@for $i from 1 through 5 {
  .little-star#{$i} {
    width: 18 + ($i - 1) * 21px;
  }
}
.no-little-star {
  position: relative;
  width: 102px;
  height: 18px;
  background: url("../assets/img/mfo-sprite.png") -300px -60px;
}
.startips {
  width: 100px;
  margin-left: 20px;
  transform: translateY(-50%);
  position: absolute;
  left: 127px;
  top: 50%;
}
.click-star {
  width: 110px;
  height: 18px;
  position: absolute;
  top: 0;
  left: 0;
  > a {
    cursor: pointer;
    display: inline-block;
    width: 18px;
    height: 18px;
    padding-right: 3px;
  }
}
.root {
  background-color: #f3f3f3;
  padding: 40px 0;
  @include main-min-height($h-margin: 0px, $h-padding: 80px);
}
.comment {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  margin: 0 auto;
  width: 700px;
  height: 500px;
  > h2 {
    font-size: 22px;
    font-weight: normal;
    color: #444;
  }
  .score {
    position: relative;
    display: inline-block;
    width: 127px;
    height: 23px;
    margin-right: 8px;
    background: url("../assets/img/mfo-sprite.png") -300px 0;
    .click-star {
      position: absolute;
      left: 0;
      top: 0;
      width: 132px;
      height: 23px;
      > a {
        cursor: pointer;
        display: inline-block;
        width: 23px;
        height: 23px;
        padding-right: 3px;
      }
    }
  }
  .content {
    > label {
      vertical-align: top;
    }
    > textarea {
      height: 60px;
      width: 80%;
      resize: none;
    }
  }
  .avg {
    > span {
      margin-left: 8px;
    }
    > input {
      width: 60px;
    }
  }
  .favorite {
    > span {
      margin-left: 8px;
    }
  }
  .photo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // align-self: center;
    > label {
      vertical-align: top;
    }
    > img {
      margin-right: 20px;
      display: inline-block;
      width: 120px;
      height: 120px;
    }
  }
  .sumbit {
    > button {
      border-radius: 2px;
      font-size: 16px;
      color: #fff;
      width: 130px;
      height: 36px;
      border: none;
      background-color: $theme-color;
    }
  }
  > div {
    > label {
      color: #666;
      font-size: 14px;
      box-sizing: border-box;
      text-align: right;
      padding-right: 8px;
      display: inline-block;
      width: 100px;
    }
  }
}
.avatar-uploader {
  // width: 300px;
  // height: 300px;
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
