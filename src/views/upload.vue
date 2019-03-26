<template>
  <div>
    <el-upload
      ref="upload"
      class="upload-demo"
      drag
      action="/upload"
      multiple
      :on-remove="handleRemove"
      :on-change="handleChange"
      :on-success="success"
      :on-error="error"
      :auto-upload="false"
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleChange(file, fileList) {
      console.log("change", fileList)
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log("remove", fileList)
    },
    success(response, file, fileList) {
      console.log(response)
    },
    error(err, file, fileList) {
      console.log(error)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
