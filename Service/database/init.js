const mongoose = require('mongoose')
const glob = require('glob')
const {resolve} = require('path')
const db = 'mongodb://localhost/smile-db'

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}
exports.connect = () => {
  mongoose.connect(db) // 连接数据库
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    mongoose.connection.on('disconnected', err => {
      console.log('***********数据库断开***********')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })
    mongoose.connection.on('error', err => {
      console.log('***********数据库错误***********')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })
    // 链接打开的时
    mongoose.connection.once('open', () => {
      console.log('MongoDB connected successfully')
      resolve()
    })
  })
}
