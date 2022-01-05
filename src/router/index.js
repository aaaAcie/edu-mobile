import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'course',
    component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index'),
    meta: { requiresAuth: true }
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: 'learn' */ '@/views/learn/index'),
    meta: { requiresAuth: true }
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */ '@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('to:', to)
  console.log('from:', from)

  // 官⽅示例，检测路由是否需要登录
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 检测 store 中的 user是否存在
    if (!store.state.user) {
      // 未登录，导航跳转到登录⻚
      console.log('没有在store中检查到state.user信息，跳转登录页面')
      next({
        name: 'login',
        // 通过 query 属性给 URL 设置查询字符串参数（键值均为⾃定义）
        query: {
          // path 仅包含路径，fullpath 为完整 url（包含查询字符串参数等信息）
          // 存到 redirect中去。通过 this.$route.query.redirect 访问
          redirect: to.fullPath
        }
      })
    } else {
      // 已经登录，允许通过
      next()
    }
  } else {
    // ⽆需登录，允许通过
    next()
  }
})

export default router
