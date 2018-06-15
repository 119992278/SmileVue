const mongoose = require('mongoose') // 引入Mongoose
const Schema = mongoose.Schema // 数据库模型
let ObjectId = Schema.Types.ObjectId // 声明Object类型

// 创建我们的用户Schema
const friendSchema = new Schema({
  UserId: ObjectId,
  friendName: {unique: true, type: String},
  createAt: {type: Date, default: Date.now()}
}, {
  collection: 'friend'
})

// 发布模型
mongoose.model('Friend', friendSchema)
