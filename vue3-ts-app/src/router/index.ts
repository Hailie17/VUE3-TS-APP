import { createRouter, createWebHistory } from 'vue-router'
import stores from '@/stores'
import type { StateAll } from '@/stores'
import _ from 'lodash'

const Login = () => import('@/views/Login/Login.vue')
const Home = () => import('@/views/Home/Home.vue')
const Sign = () => import('@/views/Sign/Sign.vue')
const Execption = () => import('@/views/Execption/Execption.vue')
const Apply = () => import('@/views/Apply/Apply.vue')
const Check = () => import('@/views/Check/Check.vue')
const NotFound = () => import('@/views/NotFound/NotFound.vue')
const NotAuth = () => import('@/views/NotAuth/NotAuth.vue')
const NotServer = () => import('@/views/NotServer/NotServer.vue')

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
          },
          beforeEnter: async (to, from, next) => {
            const usersInfos = (stores.state as StateAll).users.infos
            const signsInfos = (stores.state as StateAll).signs.infos
            const newsInfos = (stores.state as StateAll).news.info
            if (_.isEmpty(signsInfos)) {
              const res = await stores.dispatch('signs/getTime')
              if (res.data.errcode === 0) {
                stores.commit('signs/updateInfos', res.data.infos)
                next()
              } else {
                return
              }
            }
            if (_.isEmpty(newsInfos)) {
              const res = await stores.dispatch('news/getInfo')
              if (res.data.errcode === 0) {
                stores.commit('news/updateInfo', res.data.info)
              } else {
                return
              }
            }
            else {
              next()
            }
          }
        },
        {
          path: 'exception',
          name: 'exception',
          component: Execption,
          meta: {
            menu: true,
            title: '异常考勤查询',
            icon: 'Clock',
            auth: true
          },
          beforeEnter:async  (to, from, next) => {
            const usersInfos = (stores.state as StateAll).users.infos
            const signsInfos = (stores.state as StateAll).signs.infos
            const checksApplyList = (stores.state as StateAll).check.applyList
            const newsInfos = (stores.state as StateAll).news.info
            if (_.isEmpty(signsInfos)) {
              const res = await stores.dispatch('signs/getTime',{userid:usersInfos._id})
              if (res.data.errcode === 0) {
                stores.commit('signs/updateInfos', res.data.infos)
              } else {
                return
              }
            }
            if (_.isEmpty(checksApplyList)) {
              const res = await stores.dispatch('check/getApply',{applicantid: usersInfos._id})
              if (res.data.errcode === 0) {
                stores.commit('check/updateApply', res.data.rets)
              }else {
                return
              }
            }
            if (_.isEmpty(newsInfos)) {
              const res = await stores.dispatch('news/getInfo')
              if (res.data.errcode === 0) {
                stores.commit('news/updateInfo', res.data.info)
              } else {
                return
              }
            }
            next()
          }
        },
        {
          path: 'apply',
          name: 'apply',
          component: Apply,
          meta: {
            menu: true,
            title: '添加考勤审批',
            icon: 'CircleCheck',
            auth: true
          },
          beforeEnter:async  (to, from, next) => {
            const usersInfos = (stores.state as StateAll).users.infos
            const signsInfos = (stores.state as StateAll).signs.infos
            const checksApplyList = (stores.state as StateAll).check.applyList
            const newsInfos = (stores.state as StateAll).news.info
            if (_.isEmpty(signsInfos)) {
              const res = await stores.dispatch('signs/getTime',{userid:usersInfos._id})
              if (res.data.errcode === 0) {
                stores.commit('signs/updateInfos', res.data.infos)
              } else {
                return
              }
            }
            if (_.isEmpty(checksApplyList)) {
              const res = await stores.dispatch('check/getApply',{applicantid: usersInfos._id})
              if (res.data.errcode === 0) {
                stores.commit('check/updateApply', res.data.rets)
              }else {
                return
              }
            }
            if(newsInfos.applicant) {
              const res = await stores.dispatch('news/putInfo', {userid: usersInfos._id,applicant: false})
              console.log(res)
              if (res.data.errcode === 0) {
                stores.commit('news/updateInfo', res.data.info)
              }else {
                return
              }
            }
            next()
          }
        },
        {
          path: 'check',
          name: 'check',
          component: Check,
          meta: {
            menu: true,
            title: '我的考勤审批',
            icon: 'Edit',
            auth: true
          },
          beforeEnter:async  (to, from, next) => {
            const usersInfos = (stores.state as StateAll).users.infos
            const checksCheckList = (stores.state as StateAll).check.checkList
            const newsInfos = (stores.state as StateAll).news.info
            if (_.isEmpty(checksCheckList)) {
              const res = await stores.dispatch('check/getApply',{approverid:usersInfos._id})
              if (res.data.errcode === 0) {
                stores.commit('check/updateCheck', res.data.rets)
                next()
              } else {
                return
              }
            }
            if(newsInfos.approver) {
              const res = stores.dispatch('news/putInfo', {userid: usersInfos._id,approver: false})
              if (res.data.errcode === 0) {
                stores.commit('news/updateInfo', res.data.info)
              }else {
                return
              }
            }
            next()
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
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '/403',
      name: '403',
      component: NotAuth
    },
    {
      path: '/500',
      name: '500',
      component: NotServer
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = (stores.state as StateAll).users.token
  const infos = (stores.state as StateAll).users.infos
  if (to.meta.auth && _.isEmpty(infos)) {
    if (token) {
      stores.dispatch('users/infos').then((res) => {
        if (res.data.errcode === 0) {
          stores.commit('users/updateInfos', res.data.infos)
          next()
        }
      })
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
