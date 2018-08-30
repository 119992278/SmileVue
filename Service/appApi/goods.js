const Router = require('koa-router')
const mongoose = require('mongoose')
//* **获取商品详细信息的接口
let router = new Router()
router.post('/getDetailGoodsInfo', async (ctx) => {
  const Goods = mongoose.model('Goods')
  let result = await Goods.findOne({ID: ctx.request.body.goodsId}).exec()
  ctx.body = {code: 200, message: result}
})
router.get('/getDetailGoodsInfo', async (ctx) => {
  const Goods = mongoose.model('Goods')
  let result = await Goods.findOne({ID: ctx.request.body.goodsId}).exec()
  ctx.body = {code: 200, message: result}
})
router.get('/getCategoryList', async (ctx) => {
  try {
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    ctx.body = {code: 200, message: result}
  } catch (err) {
    ctx.body = {code: 500, message: err}
  }
})
router.post('/getCategorySubList', async (ctx) => {
  try {
    let categoryId = ctx.request.body.categoryId
    // let categoryId = 1
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({MALL_CATEGORY_ID: categoryId}).exec()
    ctx.body = {code: 200, message: result}
  } catch (err) {
    ctx.body = {code: 500, message: err}
  }
})
router.post('/getGoodsListByCategorySubId', async (ctx) => {
  try {
    let categorySubId = ctx.request.body.categorySubId // 小类别
    // let categorySubId = '2c9f6c946016ea9b016016f79c8e0000'
    let page = ctx.request.body.page
    let num = 10 // 每页显示数量
    let start = (page - 1) * num
    const Goods = mongoose.model('Goods')
    let result = await Goods.find({SUB_ID: categorySubId}).skip(start).limit(num).exec()
    ctx.body = {code: 200, message: result}
  } catch (err) {
    ctx.body = {code: 500, message: err}
  }
})

module.exports = router
