import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/',
      name: 'ShoppingMall',
      component: ShoppingMall
      // meta: {
      //   requiresAuth: true
      // }
    },
    {path: '/register',
      name: 'Register',
      component: Register},
    {path: '/login',
      name: 'Login',
      component: Login}
  ]
})
// 注册全局钩子用来拦截导航
// router.beforeEach((to, from, next) => {
//   next()
// })
export default router
