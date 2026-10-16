import { createRouter, createWebHashHistory } from 'vue-router'
import admin from '~/layouts/admin.vue'
//默认路由，通用路由页面
const routes = [
  {
    path: '/',
    component: admin,
    name: "admin"

  },
  {
    path: '/about',
    component: () => import('~/pages/about.vue')
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('~/pages/404.vue') },
  {
    path: '/login',
    component: () => import('~/pages/login.vue'),
    meta: {
      title: '登录页'
    }
  },

]
//动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [
  {
    path: '/',
    name: "/",
    component: () => import('~/pages/index.vue'),
    meta: {
      title: '后台首页'
    }
  },
  {

    path: '/goods/list',
    name: '/goods/list',
    component: () => import('~/pages/goods/list.vue'),
    meta: {
      title: '商品管理'
    }
  },
  {

    path: '/category/list',
    name: '/category/list',
    component: () => import('~/pages/category/list.vue'),
    meta: {
      title: '分类管理'
    }
  }
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes

})
//动态添加路由方法
export function addRoutes(menus) {
  //是否有新路由
  let hasNewRoutes = false
  const findAndAddRoutesByMenus = (arr) => {
    arr.forEach(e => {
      const item = asyncRoutes.find(o => o.path === e.frontpath)
      if (item && !router.hasRoute(item.path)) {
        router.addRoute("admin", item)
        hasNewRoutes = true
      }
      if (e.child && e.child.length > 0) {
        findAndAddRoutesByMenus(e.child)
      }
    })
  }
  findAndAddRoutesByMenus(menus)
  console.log(router.getRoutes())

  return hasNewRoutes
}
