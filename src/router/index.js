import { createRouter, createWebHashHistory } from 'vue-router'
import admin from '~/layouts/admin.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: admin,
      children: [
        {
          path: '/',
          component: () => import('~/pages/index.vue'),
          meta: {
            title: '后台首页'
          }
        }
      ]
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
})
export default router