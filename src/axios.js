import axios from 'axios'
import store from './store'
import router from './router'
import { Dialog } from 'vant'
// 创建axios实例
let service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000
})
// 请求拦截器
service.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers.Authorization = `${store.state.token}`
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
  return response
},
error => {
  // store.dispatch('UserLogout') // 可能是token过期，清除它
  Dialog.alert({
    message: 'token已过期,请重新登录'
  }).then(() => {
    router.replace({ // 跳转到登录页面
      path: 'login'
    })
  })
  return Promise.reject(error)
}
)
export default service
