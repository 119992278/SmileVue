const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')
// 读取json文件并写入数据库
router.get('/insertAllGoodsInfo', async (ctx) => {
  await fs.readFile('./database/json/goods.json', 'utf8', async (err, data) => {
    if (err) {
      return console.error(err)
    }
    data = JSON.parse(data)
    data.RECORDS.map((value, index) => {
      if (value.IMAGE1 != null) {
        const Goods = mongoose.model('Goods')
        let newGoods = new Goods(value)
        newGoods.save().then(() => {
          console.log('成功索引:' + index)
        }).catch(error => {
          console.log('失败：' + error)
        })
      }
    })
  })
  ctx.body = 'ok'
})
module.exports = router
