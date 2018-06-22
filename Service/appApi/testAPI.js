const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()
const findUser = (userName) => {
  const User = mongoose.model('User')
  return new Promise((resolve, reject) => {
    User.findOne({ userName }, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
router.get('/', async (ctx) => {
  ctx.body = '请设置对应接口.'
})
// 插入数据
router.get('/insertUser', async (ctx) => {
  const User = mongoose.model('User')
  let newUser = new User({
    'userName': 'chanjoey1',
    'passWord': '123456'
  })
  let hasUser = await findUser(newUser.userName)
  console.log('JSON.stringify(hasUser)')
  console.log(JSON.stringify(hasUser))
  if (hasUser) {
    ctx.body = '用户名已经存在'
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
// 查询ONE数据
router.get('/findOne', async (ctx) => {
  const User = mongoose.model('User')
  let results = await User.findOne({
    userName: 'chanjoey'
  }).exec()
  ctx.body = results
})
// 查询ALL数据
router.get('/findAll', async (ctx) => {
  const User = mongoose.model('User')
  let results = await User.find()
  ctx.body = results
})

// 更新数据
router.get('/updateOne', async (ctx) => {
  const User = mongoose.model('User')
  await User.updateOne({
    userName: 'test12345'
  }, {
    $set: {
      userName: 'test'
    }
  }).then(() => {
    ctx.body = {
      code: 200,
      message: '更新成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

// 更新数据
router.get('/updateSave', async (ctx) => {
  const User = mongoose.model('User')
  await User.update({
    userName: 'chanjoey'
  }, {
    $set: {
      token: 'test123456'
    }
  }).then(() => {
    ctx.body = {
      code: 200,
      message: '更新成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

// 删除某条数据
router.get('/remove', async (ctx) => {
  const User = mongoose.model('User')
  await User.remove({
    userName: 'test12345'
  }).then(() => {
    ctx.body = {
      code: 200,
      message: '删除成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})
module.exports = router
