import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login',
    meta: { title: '登录', noCache: true },
    component: () => import('@/pages/login'),
    hidden: true
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('@/pages/shopHome/shopHome'),
    hidden: true
  }
]
const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export default router
