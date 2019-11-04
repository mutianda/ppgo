import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login',
    meta: { title: '登录', noCache: true },
    component: () => import('@/pages/login')
  },
  {
    path: '/',
    name: 'shop',
    component: () => import('@/pages/shopHome/shopHome')
  },
  {
    path: '/myorder',
    name: 'myorder',
    component: () => import('@/pages/myOrder/MyOrder')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/pages/checkOut/checkOut')
  },
  {
    path: '/pay/finished',
    name: 'payfinished',
    component: () => import('@/pages/payFinished/payFinished')
  }
]
const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export default router
