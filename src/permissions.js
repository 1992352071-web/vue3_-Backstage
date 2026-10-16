import { router, addRoutes } from '~/router/index.js'
import { getToken } from '~/composables/auth.js'

import store from '~/store/index.js'
import { toast, showFullLoading, hideFullLoading } from '~/composables/util.js'
//全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 显示全局loading
  showFullLoading()
  const token = getToken()
  // 如果没有token(没有登录)，且不是登录页，跳转到登录页
  if (!token && to.path !== '/login') {
    toast('请先登录', 'error')
    return next({ path: '/login' })
  }
  //防止重复登录
  if (token && to.path === '/login') {
    toast('您已登录，无需重复登录', 'error')
    return next({ path: from.path })
  }
  //如果已经登录，自动获取用户信息，存储在vuex
  let hasNewRoutes = false
  if (token) {
    let { menus } = await store.dispatch('getinfo')
    //动态添加路由
    hasNewRoutes = addRoutes(menus)
  }
  //设置页面标题
  console.log(to.meta.title)
  const title = to.meta.title ? to.meta.title : '' + `-后台管理系统`
  document.title = title

  // 放行
  hasNewRoutes ? next(to.fullPath) : next()
})
//全局后置守卫
router.afterEach((from, to) => {
  // 隐藏全局loading
  hideFullLoading()
})

