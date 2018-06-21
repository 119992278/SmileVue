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
  const User = mongoose.model('User')
  let loginUser = ctx.request.body
  let userName = loginUser.username
  let passWord = loginUser.password
  await User.findOne({
    userName: userName
  }).then(async (result) => {
    if (result) {
      await new User().comparePassword(passWord, result.passWord).then(async (isMatch) => {
        if (isMatch === true) {
          await User.update({
            userName: userName
          }, {
            $set: {
              lastLoginAt: moment().format('YYYY-MM-DD HH:mm:ss'),
              token: createToken(userName)
            }
          }).then(() => {
            ctx.body = {
              code: 200,
              userInfo: {userName: result.userName},
              token: createToken(userName)
            }
          })
        } else {
          ctx.body = {
            code: 200,
            userInfo: null
          }
        }
      }).catch(error => {
        ctx.body = {
          code: 500,
          userInfo: null,
          error: error
        }
      })
    } else {
      ctx.body = {
        code: 501,
        userInfo: null
      }
    }
  })
})

router.get('/find', checkToken, async (ctx) => {
  const User = mongoose.model('User')
  await User.find().then((result) => {
    ctx.body = {
      code: 200,
      details: result
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

module.exports = router
