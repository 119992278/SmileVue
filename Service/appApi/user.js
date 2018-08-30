const moment = require('moment')
const Router = require('koa-router')
const mongoose = require('mongoose')
const checkToken = require('../jwt/checkToken')
const createToken = require('../jwt/createToken')
let router = new Router()
router.get('/register', async (ctx) => {
  ctx.body = '这是用户注册页面'
})
router.post('/register', async (ctx) => {
  const User = mongoose.model('User')
  let newUser = new User({
    userName: ctx.request.body.username,
    passWord: ctx.request.body.password,
    token: createToken(ctx.request.body.username)
  })
  await User.findOne({
    userName: newUser.userName
  }).then(async (hasUser) => {
    if (hasUser) {
      ctx.body = {
        code: 500,
        message: '用户已存在'
      }
    } else {
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
    }
  })
})

router.post('/login', async (ctx) => {
  try {
    const User = mongoose.model('User')
    let loginUser = ctx.request.body
    let userName = loginUser.username
    let passWord = loginUser.password
    let findOneResult = await User.findOne({
      userName: userName
    }).exec()
    if (findOneResult) {
      let isMatch = await new User().comparePassword(passWord, findOneResult.passWord)
      if (isMatch === true) {
        let result = await User.update({
          userName: userName
        }, {
          $set: {
            lastLoginAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            token: createToken(userName)
          }
        })
        ctx.body = {
          code: 200,
          userInfo: {
            userName: result.userName
          },
          token: createToken(userName)
        }
      } else {
        ctx.body = {
          code: 200,
          userInfo: null
        }
      }
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    }
  }

  return false
})

router.get('/find', checkToken, async (ctx) => {
  try {
    const User = mongoose.model('User')
    let result = await User.find().exec()
    ctx.body = {
      code: 200,
      details: result
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    }
  }
})

module.exports = router
