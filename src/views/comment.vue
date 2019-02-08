<template>
  <div class="root">
    <div class="comment flex-main-column-around">
      <h2>陈添记(十五甫三巷店)</h2>
      <div class="score">
        <label>评分</label> 
        <i></i>
      </div>
      <div class="content">
        <label>评价</label>
        <textarea v-model="content" name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div class="avg">
        <label>人均</label>
        <input v-model.number="avg_price" type="text" name="" id="">
        <span>元</span>
      </div>
      <div class="favorite">
        <label>喜欢的菜</label>
        <span v-for="(e, index) in 5" :key="index">红烧牛肉面</span>
      </div>
      <div class="photo">
        <label>图片</label>
        <img v-for="(e, index) in 3" :key="index" src="" alt="">
      </div>
      <div class="sumbit">
        <label></label>
        <button @click="submit">提交评论</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "comment",
  data() {
    return {
      id: 0,
      content: "",
      avg_price: 0
    }
  },
  methods: {
    submit() {
      let comment = {
        restaurant_id: this.id,
        content: this.content,
        avg_price: this.avg_price
      }
      this.apiPost("/submitComment", comment)
    }
  },
  mounted() {
    ;({ id: this.id } = this.$route.query)
  }
}
</script>
<style lang="scss" scoped>
.root {
  background-color: #f3f3f3;
  padding: 40px 0;
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
    > i {
      display: inline-block;
      width: 68px;
      height: 12px;
      margin-right: 8px;
      background: url("../assets/icon.png") no-repeat -60px -34px;
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
    > label {
      vertical-align: top;
    }
    > img {
      margin-right: 20px;
      display: inline-block;
      width: 120px;
      height: 120px;
      background-color: aqua;
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
      background-color: #ffa800;
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
</style>
