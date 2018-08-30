const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()
let requestPromise = require('request-promise') // 实现异步https请求
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
router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./database/json/category_sub.json', 'utf8', (err, data) => {
    if (err) {
      return console.error(err)
    }
    data = JSON.parse(data)
    let saveCount = 0
    const Category = mongoose.model('CategorySub')
    data.RECORDS.map((value, index) => {
      console.log(value)
      let newCategory = new Category(value)
      newCategory.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败：' + error)
      })
    })
  })
  ctx.body = '开始导入数据'
})

// 上传图片测试
router.post('/upload', async (ctx) => {
  try {
    let base64Data = ctx.request.body.base64Data.split('base64,')[1]
    let path = 'public/upload/' + Date.now() + '.png'
    let result = await fs.writeFile(path, base64Data, 'base64', function (result) {
      console.log('result')
      console.log(result)
    })
    ctx.body = {
      code: 500,
      path: path,
      message: result
    }
  } catch (ex) {
    ctx.body = {
      code: 500,
      message: ex
    }
  }
})

router.post('/nodeAjax1', async (ctx) => {
  let request = require('request')
  let options = {
    method: 'POST',
    url: 'https://new.fashioncomm.com/account/login',
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json;charset=UTF-8',
      'accept': 'application/json',
      'content-type': 'application/json'
    },
    qs: {
      accountId: '13560409747',
      appName: 'FashioncommFit',
      password: '123456',
      clientType: 'web',
      versionNo: '1.1',
      seq: '1530757427345'
    }
  }
  let result1 = await requestPromise(options)
  ctx.body = {
    code: 500,
    message: (JSON.parse(result1))
  }
})

// 异步请求.
router.post('/nodeAjax2', async (ctx) => {
  let appid = ctx.request.body.appid
  let secret = ctx.request.body.secret
  let productId = ctx.request.body.product_id
  let mac = ctx.request.body.mac
  let href = 'https://api.weixin.qq.com'
  let result1 = await requestPromise(href + '/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret)
  console.log('result1=' + JSON.stringify(JSON.parse(result1)))
  let token = (JSON.parse(result1)).access_token
  let result2 = await requestPromise(href + '/device/getqrcode?access_token=' + token + '&product_id=' + productId)
  console.log('result2=' + JSON.stringify(JSON.parse(result2)))
  let deviceid = (JSON.parse(result2)).deviceid
  let options = {
    method: 'POST',
    url: href + '/device/authorize_device?access_token=' + token,
    qs: {
      'device_num': '1',
      'device_list': [
        {
          'id': 'dev1',
          'mac': '123456789ABC',
          'connect_protocol': '3',
          'auth_key': '',
          'close_strategy': '1',
          'conn_strategy': '1',
          'crypt_method': '0',
          'auth_ver': '1',
          'manu_mac_pos': '-1',
          'ser_mac_pos': '-2',
          'ble_simple_protocol': '0'
        }
      ],
      'op_type': '0',
      'product_id': '12222'
    }
  }
  let result3 = await requestPromise(options)
  ctx.body = {
    code: 500,
    token: token,
    deviceid: deviceid,
    result1: (JSON.parse(result1)),
    result2: (JSON.parse(result2)),
    result3: (JSON.parse(result3))
  }
})

router.post('/nodeAjax1', async (ctx) => {
  let request = require('request')
  let options = {
    method: 'POST',
    uri: 'https://api.weixin.qq.com/device/authorize_device?access_token=11_xU6OSKlC7-939dskZCJjdDZ7ucTap_FzcC6ZHzzQtrR1xRrkxSyO7dwPByBbC3t7JUUc3aTr1DZQaCg9D-XUrTfQBDOwEzj60OJ3sqk14x1hCRDEkyzCr7FyACW1i_eHWyQ5Z24KIQdTA3iJIFRjAHAPMY',
    form: {
      'device_num': '1',
      'device_list': [
        {
          'id': 'FCW01X10142101300633',
          'mac': 'D3374C13F5E8',
          'connect_protocol': '3',
          'auth_key': '',
          'close_strategy': '1',
          'conn_strategy': '1',
          'crypt_method': '0',
          'auth_ver': '0',
          'manu_mac_pos': '-1',
          'ser_mac_pos': '-2',
          'ble_simple_protocol': '1'
        }
      ],
      'op_type': '0',
      'product_id': '48373'
    }
  }
  let result3 = await requestPromise(options)
  ctx.body = {
    code: 500,
    result3: (JSON.parse(result3))
  }
})

router.post('/nodeAjax', async (ctx) => {
  let request = require('request')
  let headers = {
    // 'Content-Type': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  let options = {
    url: 'https://api.weixin.qq.com/device/authorize_device?access_token=11_aMi69lCNzqalANon1Sux5pWjbyNnzzJNl-eW-DqlqZyeUv4Sd9EV11B94L8nfBvrPdjAq4OACB2tCp2zvdi4wL5I6WQofE_7XD42jPdxlN2m5KOx3_MtpM88Bdk_IlU3aDw9ogGiU3O8G4TLZSBjAFAVOX',
    method: 'POST',
    headers: headers,
    form: {
      'device_num': '1',
      'device_list': [
        {
          'id': 'FCW01X10142101300633',
          'mac': 'D3374C13F5E8',
          'connect_protocol': '3',
          'auth_key': '',
          'close_strategy': '1',
          'conn_strategy': '1',
          'crypt_method': '0',
          'auth_ver': '0',
          'manu_mac_pos': '-1',
          'ser_mac_pos': '-2',
          'ble_simple_protocol': '1'
        }
      ],
      'op_type': '0',
      'product_id': '48373'
    }
  }
  let result3 = await requestPromise(options)
  ctx.body = {
    code: 500,
    result3: JSON.parse(result3)
  }
})

module.exports = router
