import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login/index.vue'), // 注意这里要带上 文件后缀.vue
  },
  {
    path: '/:pathMatch(.*)',
    name: 'notfound',
    component: () => import('@/pages/NotFound/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
