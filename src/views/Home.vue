<template>
  <div class="home">
    <form method="POST" action="/upload" enctype="multipart/form-data">
      <input type="file" name="file" id="" >
      <button type="submit">上传</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      username: "",
      password: "",
      isLogin: false
    }
  },
  methods: {
    async login() {
      try {
        this.isLogin = await this.apiPost("/login", {
          username: this.username,
          password: this.password
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.username {
  width: 300px;
}
.password {
  width: 300px;
}
</style>
