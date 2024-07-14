import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const Login = () => import('@/views/Login/Login.vue')
const Home = () => import('@/views/Home/Home.vue')
const Sign = () => import('@/views/Sign/Sign.vue')
const Execption = () => import('@/views/Execption/Execption.vue')
const Apply = () => import('@/views/Apply/Apply.vue')
const Check = () => import('@/views/Check/Check.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'sign',
          name: 'sign',
          component: Sign
        },
        {
          path: 'execption',
          name: 'execption',
          component: Execption
        },
        {
          path: 'apply',
          name: 'apply',
          component: Apply
        },
        {
          path: 'check',
          name: 'check',
          component: Check
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

export default router
