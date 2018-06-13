const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const {connect, initSchemas} = require('./database/init.js')
let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
app.use(bodyParser()) // 解析POST请求
app.use(cors()) // 设置代理
let router = new Router() // 装载所有子路由
router.use('/user', user.routes()) // http://localhost:3000/user 调用路由.
router.use('/home', home.routes())
app.use(router.routes()) // 加载路由中间件
app.use(router.allowedMethods())
;(async () => {
  connect()
  initSchemas()
})()
// const mongoose = require('mongoose')
// ;(async () => {
//   await connect()
//   initSchemas()
//   console.log('----------monogo启动成功!!!!!!!!!!!!!--------')
//   const User = mongoose.model('User')
//   let oneUser = new User({userName: 'jspan71', password: '5555555'})
//   oneUser.save().then(() => {
//     console.log('插入成功')
//   })
//   let users = await User.find() // 查询所有数据
//   console.log('------------------')
//   console.log(users)
//   console.log('------------------')
// })()
app.use(async (ctx) => {
  ctx.body = '<h1>Hello Koa234567</h1>'
})
app.listen(3000, () => {
  console.log('[Server] starting at http://localhost:3000/')
})
