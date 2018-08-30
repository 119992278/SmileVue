import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import TestUpload from '@/components/pages/TestUpload'
import CategoryList from '@/components/pages/CategoryList'
import TestJsonp from '@/components/pages/TestJsonp'
import Cart from '@/components/pages/Cart'
import Test from '@/components/test'
Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'ShoppingMall',
    component: ShoppingMall,
    meta: {
      requiresAuth: true
    }
  },
  { path: '/register', name: 'Register', component: Register },
  { path: '/CategoryList', name: 'CategoryList', component: CategoryList },
  { path: '/login', name: 'Login', component: Login },
  { path: '/Goods', name: 'Goods', component: Goods },
  { path: '/Upload', name: 'Upload', component: TestUpload },
  { path: '/Jsonp', name: 'Jsonp', component: TestJsonp },
  {path: '/Cart', name: 'Cart', component: Cart},
  { path: '/Test', name: 'Test', component: Test }
  ]
})
// 注册全局钩子用来拦截导航
// router.beforeEach((to, from, next) => {
//   next()
// })
export default router
