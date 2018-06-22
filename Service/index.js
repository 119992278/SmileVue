const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const {connect, initSchemas} = require('./database/init.js')
let user = require('./appApi/user.js')
let goods = require('./appApi/goods.js')
let home = require('./appApi/home.js')
let test = require('./appApi/testAPI.js')
app.use(bodyParser()) // 解析POST请求
app.use(cors()) // 设置代理
let router = new Router() // 装载所有子路由
router.use('/user', user.routes()) // http://localhost:3000/user 调用路由.
router.use('/home', home.routes())
router.use('/goods', goods.routes())
router.use('/test', test.routes())
router.get('*', async (ctx, next) => {
  ctx.body = { status: '请请求对应接口' }
})
app.use(router.routes()) // 加载路由中间件
app.use(router.allowedMethods())
;(async () => {
  connect()
  initSchemas()
})()
// app.use(async (ctx) => {
//   ctx.body = '<h1>Hello Koa2</h1>'
// })
app.listen(3000, () => {
  console.log('[Server] starting at http://localhost:3000/')
})
