import { createRouter, createWebHistory } from 'vue-router'
import stores from '@/stores'
import type { StateAll } from '@/stores'

const Login = () => import('@/views/Login/Login.vue')
const Home = () => import('@/views/Home/Home.vue')
const Sign = () => import('@/views/Sign/Sign.vue')
const Execption = () => import('@/views/Execption/Execption.vue')
const Apply = () => import('@/views/Apply/Apply.vue')
const Check = () => import('@/views/Check/Check.vue')

declare module 'vue-router' {
  interface RouteMeta {
    menu?: boolean
    title?: string
    icon?: string
    auth?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/sign',
      meta: {
        menu: true,
        title: '考勤管理',
        icon: 'document-copy',
        auth: true
      },
      children: [
        {
          path: 'sign',
          name: 'sign',
          component: Sign,
          meta: {
            menu: true,
            title: '在线打卡签到',
            icon: 'Position',
            auth: true
          }
        },
        {
          path: 'execption',
          name: 'execption',
          component: Execption,
          meta: {
            menu: true,
            title: '添加考勤审批',
            icon: 'Clock',
            auth: true
          }
        },
        {
          path: 'apply',
          name: 'apply',
          component: Apply,
          meta: {
            menu: true,
            title: '我的考勤审批',
            icon: 'CircleCheck',
            auth: true
          }
        },
        {
          path: 'check',
          name: 'check',
          component: Check,
          meta: {
            menu: true,
            title: '异常考勤查询',
            icon: 'Edit',
            auth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = (stores.state as StateAll).users.token
  if (to.meta.auth) {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    if (token && to.path === '/login') {
      next('/')
    } else {
      next()
    }
  }
})

export default router
