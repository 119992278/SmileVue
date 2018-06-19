const BASEURL = 'https://www.easy-mock.com/mock/5af413a232ed8e24247d0135/smileVue/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURL + 'getShoppingMallInfo',
  getGoodsInfo: LOCALURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register', // 注册接口
  loginUser: LOCALURL + 'user/login' // 登录接口
}
module.exports = URL
