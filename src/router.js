import Vue from "vue"
import Router from "vue-router"
import index from "./views/index.vue"
import detail from "./views/detail.vue"
import comment from "./views/comment.vue"
import login from "./views/login.vue"
import addRes from "./views/add-res.vue"
import modifyRes from "./views/modify-res.vue"
import selectCity from "./views/select-city.vue"
import commentIndex from "./views/comment-index.vue"
import commentReply from "./views/comment-reply.vue"
import userTab from "./views/user-tab.vue"
import userComment from "./views/user-comment.vue"
import userRestaurant from "./views/user-restaurant.vue"
import userReply from "./views/user-reply.vue"
import userCollection from "./views/user-collection.vue"
import upload from "./views/upload.vue"

Vue.use(Router)
// eslint-disable-next-line
let scrollBehavior = function scrollBehavior(to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior,
  routes: [
    {
      path: "/",
      component: index,
      meta: {
        title: "首页"
      }
    },
    {
      path: "/detail",
      component: detail,
      children: [
        {
          path: "",
          component: commentIndex,
          meta: {
            title: "详情"
          }
        },
        {
          path: "reply",
          component: commentReply,
          meta: {
            title: "回复"
          }
        }
      ],
      meta: {
        title: "餐馆详情"
      }
    },
    {
      path: "/comment",
      name: "comment",
      component: comment,
      meta: {
        title: "评论"
      }
    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: {
        title: "登录"
      }
    },
    {
      path: "/add-res",
      name: "add-res",
      component: addRes,
      meta: {
        title: "添加餐馆"
      }
    },
    {
      path: "/modify-res",
      name: "modify-res",
      component: modifyRes,
      meta: {
        title: "修改餐馆信息"
      }
    },
    {
      path: "/select-city",
      name: "select-city",
      component: selectCity,
      meta: {
        title: "选择城市"
      }
    },
    {
      path: "/upload",
      name: "upload",
      component: upload,
      meta: {
        title: "文件上传"
      }
    },
    {
      path: "/user",
      component: userTab,
      children: [
        {
          path: "comment",
          component: userComment,
          meta: {
            title: "我的点评"
          }
        },
        {
          path: "reply",
          component: userReply,
          meta: {
            title: "我的回复"
          }
        },
        {
          path: "restaurant",
          component: userRestaurant,
          meta: {
            title: "我的餐馆"
          }
        },
        {
          path: "collection",
          component: userCollection,
          meta: {
            title: "我的收藏"
          }
        }
      ]
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

// 路由hook
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  // console.log(to)
  // if(to.path === '/add-res' || to.path === '/comment'){
  //   if(util.isEmptyObj(store.state.user)){
  //     router.push({path: "/"})
  //     next(vm => {
  //       vm.$message("请先登录")
  //     })
  //   }
  // }
  next()
})
export default router
