<template>
  <div class="login-tab">
    <el-input
      v-model="username"
      type="text"
      placeholder="请输入用户名"
    ></el-input>
    <el-input
      class="password"
      v-model="password"
      type="password"
      placeholder="请输入密码"
    ></el-input>
    <div class="button-wrap">
      <el-button
        size="medium"
        @click="login()"
      >登录</el-button>
      <el-button
        size="medium"
        @click="register()"
      >注册</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex"
export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    ...mapMutations(["initUser"]),
    async login() {
      const pData = {
        username: this.username,
        password: this.password
      }
      const user = await this.apiPost("/login", pData)
      // eslint-disable-next-line
      this.isLoginError = util.isEmptyObj(user)
      if (!this.isLoginError) {
        this.initUser(user)
        this.$router.go(-1)
      } else {
        this.$message({
          message: "账号或密码错误",
          center: true,
          type: "error"
        })
      }
    },
    async register() {
      const pData = {
        username: this.username,
        password: this.password
      }
      let user = await this.apiPost("/register", pData)
      let isInLegal = util.isEmptyObj(user)
      if (isInLegal) {
        this.$message({
          message: "用户名已存在",
          center: true,
          type: "error"
        })
      } else {
        this.$message({
          message: "注册成功",
          center: true,
          type: "success"
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login-tab {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.button-wrap {
  margin: 10px auto;
  display: flex;
  justify-content: center;
}
.password {
  margin-top: 10px;
}
</style>
