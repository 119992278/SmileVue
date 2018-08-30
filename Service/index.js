const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const logger = require('koa-logger')
const compress = require('koa-compress')
const {
  connect,
  initSchemas
} = require('./database/init.js')

let readFile = require('./appApi/readFile.js') // 上传图片,读取json文件到数据库
let user = require('./appApi/user.js')
let goods = require('./appApi/goods.js')
let home = require('./appApi/home.js')
let test = require('./appApi/testAPI.js')
app.use(bodyParser()) // 解析POST请求
app.use(cors()) // 设置代理
let router = new Router() // 装载所有子路由
router.use('/user', user.routes()) // http://localhost:3000/user 调用路由.
router.use('/goods', goods.routes())
router.use('/home', home.routes())
router.use('/readFile', readFile.routes())
router.use('/test', test.routes())
router.get('*', async (ctx, next) => {
  ctx.body = {
    status: '请请求对应接口'
  }
})
// 数据压缩
app.use(compress({
  filter: function (contentType) {
    return /text/i.test(contentType)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))
// 打印请求信息
app.use(logger())
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`) // 输出请求响应结果
})

app.use(router.routes()) // 加载路由中间件
app.use(router.allowedMethods());
(async () => {
  connect()
  initSchemas()
})()

app.listen(3000, () => {
  console.log('[Server] starting at http://localhost:3000/')
})
