const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()
router.get('/', async (ctx) => {
  ctx.body = '请设置对应接口.'
})
router.get('/insertUser', async (ctx) => {
  const User = mongoose.model('User')// 取得Model
  let newUser = new User({'userName': 'test.js', 'password': '32'})
  console.log('/insert' + JSON.stringify(newUser))
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

router.get('/insertFriend', async (ctx) => {
  const Friend = mongoose.model('Friend')// 取得Model
  let newFriend = new Friend({'friendName': '朋友123'})
  console.log('/insert' + JSON.stringify(newFriend))
  await newFriend.save().then(() => {
    ctx.body = {
      code: 200,
      message: '新增朋友成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})
router.get('/findAll', async (ctx) => {
  const Friend = mongoose.model('Friend')// 取得Model
  let results = await Friend.find()
  ctx.body = results
})

module.exports = router
