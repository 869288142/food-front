<template>
  <div class="modify-tab">
    <el-input
      v-model="username"
      type="text"
      name=""
      placeholder="请输入用户名"
    ></el-input>
    <el-input
      class="password"
      v-model="password"
      type="password"
      name=""
      placeholder="请输入旧密码"
    ></el-input>
    <el-input
      class="password"
      v-model="newPassword"
      type="password"
      name=""
      placeholder="请输入新密码"
    ></el-input>
    <el-button
      class="modify-button"
      size="medium"
      @click="modifyPassword"
    >修改密码</el-button>
  </div>
</template>
<script>
import * as util from "../util"
export default {
  data() {
    return {
      username: "",
      password: "",
      newPassword: ""
    }
  },
  methods: {
    async modifyPassword() {
      let user = await this.apiPost("/modifyPassword", {
        username: this.username,
        password: this.password,
        newPassword: this.newPassword
      })
      if (util.isEmptyObj(user)) {
        this.$message({
          message: "账号或密码错误",
          center: true,
          type: "error"
        })
      } else {
        this.$message({
          message: "修改成功",
          center: true,
          type: "success"
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.modify-tab {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.password {
  margin-top: 10px;
}
.modify-button {
  margin-top: 10px;
}
</style>
