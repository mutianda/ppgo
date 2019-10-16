import router from './router'
// import store from '@/store'
const whiteList = ['/login','/demo']// no redirect whitelist

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  let token ='123'
  if (token) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({ path: '/' })
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

// export const loadMenus = (next, to, menus) => {
//   // 查询当前用户的所有菜单
//   // 对后台返回的数据转换后使用
//   const rs = []
//   const ms = menus
//   if (ms && ms.length > 0) {
//     for (let i = 0; i < ms.length; i++) {
//       const m = ms[i]
//       const r = {
//         redirect: m.children.length !== 1 ? 'noredirect' : m.children[0].authAuthUrl,
//         path: m.authAuthUrl,
//         name: m.authName,
//         component: Layout,
//         meta: {
//           title: m.authName,
//           icon: m.authIcon
//         },
//         children: []
//       }
//       if (r.children === undefined && r.children.length === 0) {
//         return
//       }
//
//       if (m.children && m.children.length > 0) {
//         for (let j = 0; j < m.children.length; j++) {
//           const mc = m.children[j]
//           const rc = {
//             path: mc.authAuthUrl,
//             name: mc.authName,
//             // component: () => import(`@/views${mc.authPageUrl}`),
//             component: mc.authPageUrl,
//             meta: {
//               title: mc.authName,
//               icon: mc.authIcon
//             }
//           }
//           r.children.push(rc)
//         }
//       }
//       rs.push(r)
//     }
//   }
//   console.log(rs)
//
//   const asyncRouter = filterAsyncRouter(rs)
//   asyncRouter.push({
//     path: '*',
//     component: () => import('@/views/features/404'),
//     hidden: true
//   })
//   store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
//     sessionStorage.setItem('menus', JSON.stringify(asyncRouter))
//     router.addRoutes(asyncRouter) // 动态添加可访问路由表
//     // console.log(asyncRouter)
//     next({ ...to, replace: true })// hack方法 确保addRoutes已完成
//   })
// }

router.afterEach(() => {
  // NProgress.done() // finish progress bar
  console.log('跳转')
})
