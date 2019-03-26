<template>
  <div class="login flex-main-column-center">
    <span v-show="isLoginError">账号或密码有误</span>
    <div>
      <label for="">账号</label>
      <el-input v-model="username" type="text" name=""></el-input>
    </div>
    <div>
      <label for="">密码</label>
      <el-input v-model="password" type="password" name=""></el-input>
    </div>
    <div>
      <el-button @click="login()">登录</el-button>
      <el-button @click="register()">注册</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex"
export default {
  data() {
    return {
      username: "",
      password: "",
      isLoginError: false
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
        this.$router.push({ path: "/" })
      }
    },
    async register() {
      const pData = {
        username: this.username,
        password: this.password
      }
      await this.apiPost("/register", pData)
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  @include main-min-height($h-margin: 0px, $h-padding: 0px);
  margin: 0 auto;
  background-color: #fff;
  height: 600px;
  width: 100%;
}
</style>
