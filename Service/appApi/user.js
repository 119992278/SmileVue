const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()
router.get('/', async (ctx) => {
  console.log(JSON.stringify(ctx.request.body))
  ctx.body = '这是用户操作首页'
})
router.get('/register', async (ctx) => {
  ctx.body = '这是用户注册页面'
})

router.post('/register', async (ctx) => {
  const User = mongoose.model('User')// 取得Model
  let newUser = new User(ctx.request.body)// 把从前端接收的POST数据封装成一个新的user对象
  console.log('/register' + JSON.stringify(newUser))
  await newUser.save().then(() => { // 用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    ctx.body = {// 成功返回code=200，并返回成功信息
      code: 200,
      message: '注册成功'
    }
  }).catch(error => {
    ctx.body = {// 失败返回code=500，并返回错误信息
      code: 500,
      message: error
    }
  })
})

module.exports = router
