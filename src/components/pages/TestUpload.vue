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
export default {
  data () {
    return {}
  },
  created () {
  },
  mounted () {
  },
  methods: {
    onRead (file) {
      console.log(file.content)
      axios({
        url: url.upload,
        // url: 'http://localhost:3333/api/upload',
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
