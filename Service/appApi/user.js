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
  console.log('/register(这是分支测试456)' + JSON.stringify(newUser))
  await newUser.save().then(() => { // 用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    ctx.body = {
      code: 200, message: '注册成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500, message: error
    }
  })
})

router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body
  console.log('/loginUser' + JSON.stringify(loginUser))
  let userName = loginUser.userName
  let password = loginUser.password
  const User = mongoose.model('User')
  await User.findOne({userName: userName}).exec().then(async (result) => {
    console.log(JSON.stringify(result))
    if (result) {
      let newUser = new User()
      await newUser.comparePassword(password, result.password).then(isMatch => {
        console.log('isMatch=' + JSON.stringify(isMatch))
        ctx.body = {code: 200, message: isMatch}
      }).catch(error => {
        console.log(error)
        ctx.body = {code: 500, message: error}
      })
    } else {
      ctx.body = {code: 501, message: '用户名不存在'}
    }
  })
})

module.exports = router
