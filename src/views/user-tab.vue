<template>
  <div class="user-tab">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane name="first" ref="first" class="item">
        <router-link to="/user/restaurant" slot="label" class="router-link">餐馆管理</router-link>
      </el-tab-pane>
      <el-tab-pane name="second" ref="second" class="item">
        <router-link to="/user/comment" slot="label" class="router-link">点评</router-link>
      </el-tab-pane>
      <el-tab-pane name="third" ref="third" class="item">
        <router-link to="/user/reply" slot="label" class="router-link">回复</router-link>
      </el-tab-pane>
      <el-tab-pane name="fourth" ref="fourth" class="item">
        <router-link to="/user/collection" slot="label" class="router-link">收藏</router-link>
      </el-tab-pane>
      <router-view></router-view>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: ""
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab)
    }
  },
  watch: {
    async $route() {
      if (Object.keys(this.$route.query).length !== 0) {
        await this.$nextTick()
        ;({ activeName: this.activeName } = this.$route.query)
      }
    }
  },
  created() {
    ;({ activeName: this.activeName } = this.$route.query)
  }
}
</script>
<style lang="scss" scoped>
.router-link {
  text-decoration: none;
  color: #909399;
  display: inline-block;
  width: 100%;
  height: 100%;
}
.user-tab {
  width: 800px;
  margin: 20px auto;
  @include main-min-height($h-margin: 40px, $h-padding: 0px);
}
.item {
  /deep/ {
    .el-tabs__item {
      padding: 0;
    }
  }
}
</style>
