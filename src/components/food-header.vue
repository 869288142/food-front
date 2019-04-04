<template>
  <div class="header flex-main-around">
    <div class="position ">
      <router-link to="/">首页</router-link>
      <i></i>
      <router-link to="/select-city">{{cityName}}</router-link>
    </div>
    <ul class="nav flex-main-around">
      <!-- <li v-for="(e, index) in 10" :key="index" >用户</li> -->
      <router-link
        v-if="notLogin"
        to="/login"
      >登录</router-link>
      <el-dropdown v-if="isLogin">
        <div class="dropdown-menu">
          <div class="user-avatar-wrap">
            <img
              :src=" userAvatar || '/public/img/default-avatar.png'"
              :title="userName"
            >
          </div>
          <i class="icon-drop-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="showOwnRestaurant">我上传的餐馆</el-dropdown-item>
          <el-dropdown-item @click.native="showOwnComment">我的点评</el-dropdown-item>
          <el-dropdown-item @click.native="showOwnReply">我的回复</el-dropdown-item>
          <el-dropdown-item @click.native="showOwnCollection">我的收藏</el-dropdown-item>
          <el-dropdown-item @click.native="showOwnInfo">个人信息</el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native="exitLogin"
          >注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
export default {
  props: ["cityName"],
  computed: {
    ...mapGetters(["isLogin", "userName", "userAvatar"]),
    notLogin() {
      return !this.isLogin
    }
  },
  methods: {
    ...mapMutations(["initUser"]),
    showOwnRestaurant() {
      console.log("res")
      this.$router.push({
        path: "/user/restaurant",
        query: { activeName: "first" }
      })
    },
    showOwnComment() {
      console.log("comment")
      this.$router.push({
        path: "/user/comment",
        query: { activeName: "second" }
      })
    },
    showOwnReply() {
      this.$router.push({
        path: "/user/reply",
        query: { activeName: "third" }
      })
    },
    showOwnCollection() {
      this.$router.push({
        path: "/user/collection",
        query: { activeName: "fourth" }
      })
    },
    showOwnInfo() {
      this.$router.push({
        path: "/user/info",
        query: { activeName: "fifth" }
      })
      console.log("info")
    },
    exitLogin() {
      this.initUser({})
    }
  },
  created() {}
}
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #333;
}
.header {
  position: relative;
  z-index: 100;
  height: 50px;
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
  color: #333;
}
.nav {
  width: 50%;
  justify-content: flex-end;
}
.dropdown-menu {
  &:hover {
    .icon-drop-down {
      border-top-color: #ff9d00;
    }
    .user-avatar-wrap {
      border-color: #ff9d00;
    }
  }
}
.user-avatar-wrap {
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #fff;
  > img {
    display: inline-block;
    width: 32px;
    height: 32px;
  }
  vertical-align: middle;
}
.icon-drop-down {
  display: inline-block;
  height: 0;
  width: 0;
  border-top: 4px solid #666;
  border-left: 4px dashed transparent;
  border-right: 4px dashed transparent;
  overflow: hidden;
  vertical-align: middle;
  margin-left: 5px;
}
.position {
  > i {
    display: inline-block;
    width: 30px;
    height: 35px;
    background-image: url("#{$img-url}/p-icon.png");
    background-size: 35px auto;
    vertical-align: middle;
  }
  > span {
  }
}
</style>
