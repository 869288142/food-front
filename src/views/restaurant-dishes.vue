<template>
  <div class="dishes">
    <div class="main">
      <h2>{{restaurantName}}推荐菜</h2>
      <el-form :inline="true">
        <!-- <el-form-item>
          <el-input
            class="input"
            v-model="name"
            placeholder="输入特色名称"
          ></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button @click="add()">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="dishes"
        border=""
      >
        <el-table-column
          label="名字"
          prop="name"
          width="180"
        >
        </el-table-column>
        <el-table-column
          label="价格"
          prop="price"
          width="180"
        >
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :total="count"
        :page-size="limit"
      >
      </el-pagination>
      <!-- 对话框 -->
      <el-dialog
        class="dialog"
        title="编辑"
        :visible.sync="isShowDialog"
        width="30%"
      >
        <el-form label-position="top">
          <el-form-item label="图片">
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
          <el-form-item label="菜名">
            <el-input v-model="dishName"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model.number="price"></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="cancel">取 消</el-button>
          <el-button
            type="primary"
            @click="submit"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      dishes: [],
      dishName: "",
      price: 0,
      isShowDialog: false,
      id: 0,
      count: 0,
      limit: 4,
      currentPage: 1,
      restaurantName: "",
      dialogAction: "",
      imageUrl: ""
    }
  },
  computed: {
    ...mapState(["r_id"]),
    isAdd() {
      return this.dialogAction === "add"
    }
  },
  methods: {
    async add(name) {
      this.dialogAction = "add"
      this.dishName = ""
      this.price = 0
      this.imageUrl = ""
      this.isShowDialog = true
    },
    async remove(id) {
      await this.apiDelete("/dishes", { id })
      this.getDishes()
    },
    async edit({ id, name, price, img }) {
      this.dialogAction = "update"
      this.id = id
      this.dishName = name
      this.price = price
      this.imageUrl = img
      this.isShowDialog = true
    },
    async submit() {
      if (!this.isAdd) {
        let id = this.id
        let name = this.dishName
        console.log("update")
        await this.apiPut("/dishes", { id, name, price: this.price, img: this.imageUrl })
      } else {
        await this.apiPost("/dishes", {
          name: this.dishName,
          id: this.r_id,
          price: this.price,
          img: this.imageUrl
        })
      }
      this.getDishes()
      this.isShowDialog = false
    },
    cancel() {
      this.dishName = ""
      this.price = 0
      this.imageUrl = ""
      this.isShowDialog = false
    },
    async getDishes() {
      ;({ rows: this.dishes, count: this.count } = await this.apiGet(
        "/dishes",
        {
          currentPage: this.currentPage,
          limit: this.limit,
          id: this.r_id
        }
      ))
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.filepath
    }
  },
  watch: {
    currentPage() {
      this.getDishes()
    }
  },
  async created() {
    this.restaurantName = this.$route.query.name
    this.getDishes()
  }
}
</script>
<style lang="scss" scoped>
.dishes {
  background-color: #fff;
  @include main-min-height($h-margin: 0px, $h-padding: 0px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  width: 800px;
  > h2 {
    margin-bottom: 20px;
  }
}
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
</style>
