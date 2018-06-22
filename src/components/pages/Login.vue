<template>
    <div>
       <van-nav-bar title="用户登录"
        left-text="返回"
        right-text="注册"
        left-arrow
        @click-left="goBack"
        @click-right="goRegister"/>

        <div class="register-panel">
        <van-field
            v-model="username"
            label="用户名"
            icon="clear"
            placeholder="请输入用户名"
            required
            :error-message="usernameErrorMsg"
            @click-icon="username = ''"
        />

        <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
            :error-message="passwordErrorMsg"
        />
        <div class="register-button">
           <van-button type="primary" @click="loginAction" :loading="openLoading" size="large" text='马上登录'></van-button>
        </div>
       </div>

    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      username: 'chanjoey',
      password: '123456',
      openLoading: false, // 是否开启用户的Loading
      usernameErrorMsg: '', // 当用户名出现错误的时候
      passwordErrorMsg: '' // 当密码出现错误的时候
    }
  },
  created () {
    if (localStorage.userInfo) {
      // Toast.success('您已经登录')
      // this.$router.push('/')
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goRegister () {
      this.$router.push('/register')
    },
    checkForm () {
      let isOk = true
      if (this.username.length < 5) {
        this.usernameErrorMsg = '用户名不能小于5位'
        isOk = false
      } else {
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位'
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOk
    },
    loginAction () {
      this.checkForm() && this.axiosLoginUser()
    },
    axiosLoginUser () {
      axios({
        url: url.loginUser,
        method: 'post',
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(response => {
          Toast.clear()
          if (response.data.code === 200 && response.data.userInfo) {
            this.$store.dispatch('UserLogin', response.data.token)
            Toast.success('登录成功')
            setTimeout(() => {
              this.$router.push('/')
            }, 2000)
          } else {
            Toast.fail('登录失败')
            this.openLoading = false
          }
        })
        .catch(error => {
          console.log(error)
          Toast.fail('登录失败')
          this.openLoading = false
        })
    }
  }
}
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>
