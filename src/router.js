import Vue from "vue"
import Router from "vue-router"
import index from "./views/index.vue"
import detail from "./views/detail.vue"
import comment from "./views/comment.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: index
    },
    {
      path: "/detail",
      name: "detail",
      component: detail
    },
    {
      path: "/comment",
      name: "comment",
      component: comment
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
})
