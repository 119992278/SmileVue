const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors') // 设置代理
app.use(bodyParser())
let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
let router = new Router() // 装载所有子路由
router.use('/user', user.routes())
router.use('/home', home.routes())
app.use(router.routes()) // 加载路由中间件
app.use(router.allowedMethods())
app.use(cors())

// 测试插入数据..
// const {connect, initSchemas} = require('./database/init.js')
// const mongoose = require('mongoose')
// ;(async () => {
//   await connect()
//   initSchemas()
//   const User = mongoose.model('User')
//   let oneUser = new User({userName: 'jspang4', password: '5555555'})
//   oneUser.save().then(() => {
//     console.log('插入成功')
//   })
//   let users = await User.find()
//   console.log('------------------')
//   console.log(users)
//   console.log('------------------')
// })()

app.use(async (ctx) => {
  ctx.body = '<h1>Hello Koa2</h1>'
})
app.listen(3000, () => {
  console.log('[Server] starting at http://localhost:3000/')
})
