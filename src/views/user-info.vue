<template>
  <div class="info">
    <el-form label-position="top">
      <el-form-item
        label="头像"
        label-width="50"
      >
        <el-upload
          class="avatar-uploader"
          action="/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
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
      </el-form-item>
      <el-form-item
        label="名称"
        label-width="50"
      >
        <el-input v-model="userName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="modify">确定修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      imageUrl: "",
      userName: "",
      id: 0
    }
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.filepath
    },
    async modify() {
      await this.apiPut("/user", {
        id: this.id,
        name: this.userName,
        avatar: this.imageUrl
      })
    }
  },
  created() {
    this.userName = this.user.name
    this.imageUrl = this.user.avatar
    this.id = this.user.id
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader {
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
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.avatar {
  width: 60px;
  height: 60px;
  display: block;
}
.info {
  width: 50%;
}
</style>

