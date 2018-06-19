const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()
router.get('/', async (ctx) => {
  ctx.body = '请设置对应接口.'
})
// 插入数据
router.get('/insertUser', async (ctx) => {
  const User = mongoose.model('User')
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
// 插入数据
router.get('/insertFriend', async (ctx) => {
  const Friend = mongoose.model('Friend')
  let newFriend = new Friend({'friendName': '朋友123'})
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
// 查询ONE数据
router.get('/findOne', async (ctx) => {
  const User = mongoose.model('User')
  let results = await User.findOne({userName: 'chanjoey'}).exec()
  ctx.body = results
})
// 查询ALL数据
router.get('/findAll', async (ctx) => {
  const User = mongoose.model('User')
  let results = await User.find()
  ctx.body = results
})

module.exports = router
