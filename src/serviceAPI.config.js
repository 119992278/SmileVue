const BASEURL = 'https://www.easy-mock.com/mock/5af413a232ed8e24247d0135/smileVue/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURL + 'getShoppingMallInfo',
  getGoodsInfo: LOCALURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register' // 用户注册接口
}
module.exports = URL
