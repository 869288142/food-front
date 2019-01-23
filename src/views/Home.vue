<template>
  <div class="home">
    <input class="username" v-model="username" type="text" name="" id="" placeholder="用户名">
    <input class="password" v-model="password" type="text" name="" id="" placeholder="密码">
    <input class="showLogin" v-model="isLogin" type="text" name="" id="">
    <button @click="login">登录</button>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.proxy = false || {
  host: '127.0.0.1',
  port: 7001
}
export default {
  name: "home",
  data (){
    return {
      username: '',
      password: '',
      isLogin: false
    }
  },
  methods: {
    async login() {
      ({data:this.isLogin} = await axios.post('/login',{username: this.username, password: this.password}))
      if(this.isLogin){
        this.$router.push({name:'about'})
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .home{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .username{
    width: 300px;
  }
  .password{
    width: 300px;
  }
</style>
