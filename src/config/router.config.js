// eslint-disable-next-line
import { RouteView, UserLayout } from '@/layouts'

/* 存在问题解决，之前操作步骤会存在返回原来的页签刷新页签的问题，通过评论区网友的建议，替换router.config.js中的RouterView能解决这个问题
  const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
} */

export const asyncRouterMap = [
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/result',
    name: 'result',
    component: RouteView,
    redirect: '/result/success',
    meta: { title: '结果页', icon: 'check-circle-o', permission: ['result'] },
    children: [
      {
        path: '/result/success',
        name: 'ResultSuccess',
        component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
        meta: { title: '成功页', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
      },
      {
        path: '/result/fail',
        name: 'ResultFail',
        component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
        meta: { title: '失败页', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
      }
    ]
  },

  // Exception
  {
    path: '/exception',
    name: 'exception',
    component: RouteView,
    redirect: '/exception/403',
    meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
    children: [
      {
        path: '/exception/403',
        name: 'Exception403',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
        meta: { title: '403', permission: ['exception'] }
      },
      {
        path: '/exception/404',
        name: 'Exception404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
        meta: { title: '404', permission: ['exception'] }
      },
      {
        path: '/exception/500',
        name: 'Exception500',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
        meta: { title: '500', permission: ['exception'] }
      }
    ]
  },
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
