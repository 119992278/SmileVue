const mongoose = require('mongoose') // 引入Mongoose
const Schema = mongoose.Schema // 数据库模型
let ObjectId = Schema.Types.ObjectId // 声明Object类型
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10 // 定义加密密码计算强度

// 创建我们的用户模式
const userSchema = new Schema({
  UserId: ObjectId,
  userName: {unique: true, type: String},
  password: String,
  createAt: {type: Date, default: Date.now()},
  lastLoginAt: {type: Date, default: Date.now()}
}, {
  collection: 'user'
})
// 使用pre中间件在用户信息存储前进行密码加密
userSchema.pre('save', function (next) {
  console.log('save=' + JSON.stringify(this))
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})
userSchema.methods = {
  // 密码比对的方法
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}
// 发布模型
mongoose.model('User', userSchema)
