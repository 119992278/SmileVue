<template>
    <div>
      <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png" multiple>
               <van-icon name="photograph" />
      </van-uploader>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
let serverUrl = '/api/' // 本地调试时
// let serverUrl = 'http://f.apiplus.cn/'  //打包部署上线时
export default {
  data () {
    return {}
  },
  created () {
  },
  mounted () {
    // this.getToken()
    this.getNodeToken()
  },
  methods: {
    getNodeToken () {
      axios({
        url: url.nodeAjax,
        method: 'post',
        data: {
          appid: 'wx1b66680fa61dcd99',
          secret: '2cb9546935896cfab9e34e18eccea094',
          product_id: '48373',
          mac: 'D3374C13F5E8'
        }
      }).then(response => {
        // alert(JSON.stringify(response))
      }).catch(error => {
        console.log(error)
      })
    },
    getToken () {
      axios({
        url: serverUrl + 'cgi-bin/token?grant_type=client_credential&appid=wx1b66680fa61dcd99&secret=2cb9546935896cfab9e34e18eccea094',
        method: 'post'
      }).then(response => {
        alert(JSON.stringify(response))
      }).catch(error => {
        console.log(error)
      })
    },
    onRead (file) {
      console.log(file.content)
      axios({
        url: url.upload,
        method: 'post',
        data: {
          base64Data: file.content
        }
      }).then(response => {}).catch(error => {
        console.log(error)
      })
    },
    afterRead (file) {
      console.log('afterRead')
      console.log(file)
    }
  }
}
</script>

<style scoped>
</style>
