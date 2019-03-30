module.exports = {
  devServer: {
    proxy: "http://127.0.0.1:7001"
    // proxy: {
    //   "/api": {
    //     target: "localhost:7001",
    //     pathRewrite: {
    //       "^/api": " "
    //     }
    //   },
    //   "/public": {
    //     target: "localhost:7001"
    //   }
    // }
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `@import "@/assets/scss/variables.scss", "@/assets/scss/mixin.scss";`
      }
    }
  },
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/"
}
