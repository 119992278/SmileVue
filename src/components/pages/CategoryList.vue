<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="类别列表" />
        </div>

        <div>
          <van-row>
              <van-col span="6">
                  <div id="leftNav">
                       <ul>
                           <li @click="clickCategory(index,item.ID)" :class="{categoryActice:categoryIndex==index}" v-for="(item , index) in category" :key="index">
                               {{item.MALL_CATEGORY_NAME}}
                           </li>
                       </ul>
                  </div>

              </van-col>
              <van-col span="18">
                  <div class="tabCategorySub">
                      <van-tabs v-model="active" @click="onClickCategorySub">
                          <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
                          </van-tab>
                      </van-tabs>
                  </div>

                <div id="list-div">
                    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                       <van-list
                          v-model="loading"
                          :finished="finished"
                          @load="onLoad"
                          >
                          <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
                              <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImg" /></div>
                              <div class="list-item-text">
                                  <div>{{item.NAME}}</div>
                                  <div class="">￥{{item.ORI_PRICE}}</div>
                              </div>
                          </div>
                      </van-list>
                    </van-pull-refresh>
                </div>
              </van-col>
          </van-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant'
import url from '@/serviceAPI.config.js'
export default {
  data () {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [], // 小类类别
      active: 0, // 激活标签的值
      loading: false,
      finished: false, // 上拉加载是否有数据
      list: [], // 商品数据
      isRefresh: false, // 下拉刷新
      page: 1, // 商品列表的页数
      goodList: [], // 商品信息
      categorySubId: '', // 商品子分类ID
      errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"' // 错误图片显示路径
    }
  },
  created () {
    this.getCategory()
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
    document.getElementById('list-div').style.height = winHeight - 90 + 'px'
  },
  methods: {
    getCategory () { // 获取左侧大类IDs
      axios({
        url: url.LOCALURL + 'goods/getCategoryList',
        method: 'get'
      })
        .then(response => {
          // console.log(response)
          if (response.data.code === 200 && response.data.message) {
            this.category = response.data.message
            this.getCategorySubByCategoryId(this.category[0].ID)
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCategorySubByCategoryId (categoryId) { // 根据大类ID读取小类类别列表
      axios({
        url: url.LOCALURL + 'goods/getCategorySubList',
        method: 'post',
        data: {categoryId: categoryId}
      })
        .then(response => {
          if (response.data.code === 200 && response.data.message) {
            this.categorySub = response.data.message
            this.active = 0
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getGoodList () { // /得到小类商品信息
      axios({
        url: url.LOCALURL + 'goods/getGoodsListByCategorySubId',
        method: 'post',
        data: { categorySubId: this.categorySubId, page: this.page }
      })
        .then(response => {
          if (response.data.code === 200 && response.data.message.length) {
            this.page++
            // this.goodList = this.goodList.concat(response.data.message)
            this.goodList = response.data.message
          }
          this.finished = true
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    clickCategory (index, categoryId) { // 点击大类的方法
      this.categoryIndex = index
      this.page = 1
      this.finished = false
      this.goodList = []
      this.getCategorySubByCategoryId(categoryId)
    },
    onClickCategorySub (index, title) { // 点击子类获取商品信息
      this.categorySubId = this.categorySub[index].ID
      this.goodList = []
      this.finished = false
      this.page = 1
      this.onLoad()
    },
    onLoad () { // 上拉加载方法
      console.log('onLoad')
      setTimeout(() => {
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
        this.getGoodList()
      }, 1000)
    },
    onRefresh () { // 下拉刷新方法
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        this.goodList = []
        this.page = 1
        this.onLoad()
      }, 500)
    },
    goGoodsInfo (id) {
      this.$router.push({name: 'Goods', params: {goodsId: id}})
    }
  }
}
</script>

<style scoped>
    #leftNav{
        background-color: aliceblue;
    }
    #leftNav ul li {
        line-height: 2rem;
        border-bottom: 1px solid #E4E7ED;
        padding:3px;
        font-size:0.8rem;
        text-align: center;
    }
    .categoryActice{
        background-color: #fff;
    }
    .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }

</style>
