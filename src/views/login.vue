<template>
  <div class="login flex-main-column-center">
    <div class="login-wrap">
      <!-- 测试动态组件 -->
      <div class="button-wrap">
        <button
          class="button"
          @click="currentTabComponent='login-tab'"
        >登录注册</button>
        <button
          class="button"
          @click="currentTabComponent='modify-tab'"
        >修改密码</button>
      </div>
      <component
        class="tab"
        :is="currentTabComponent"
      ></component>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex"
export default {
  data() {
    return {
      currentTabComponent: "login-tab"
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  @include main-min-height($h-margin: 0px, $h-padding: 0px);
  margin: 0 auto;
  height: 600px;
  width: 100%;
  &-wrap {
    width: 350px;
    // height: 220px;
    background-color: #fff;
    // border-radius: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
  }
}
.button-wrap {
  margin: 20px;
  display: flex;
  border-bottom: solid 1px #e3e3e3;
  border-top: solid 1px #e3e3e3;
  .button {
    &:first-child {
      border-left: solid 1px #e3e3e3;
    }
  }
}
.button {
  border: 0;
  flex-basis: 50%;
  height: 40px;
  background-color: #fff;
  border-right: solid 1px #e3e3e3;
  outline: none;
  cursor: pointer;
}
.tab {
  margin: 10px 20px;
}
</style>
