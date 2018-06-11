<template>
    <div>
        <!--search bar layout-->
        <div class="search-bar">
            <van-row gutter="5">
                <van-col span="3"><img :src="locationIcon" width="80%" class="location-icon" /></van-col>
                <van-col span="16">
                  <input type="text" class="search-input"/>
                </van-col>
                <van-col span="5"><van-button size="mini">查找</van-button></van-col>
            </van-row>
        </div>
        <!--swipwer area-->
        <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                    <img :src="banner.image" width="100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="type-bar">
          <div  v-for="(cate,index) in category" :key="index" v-lazy="cate.image">
            <img v-lazy="cate.image" width="90%" />
            <span>{{cate.mallCategoryName}}</span>
          </div>
        </div>
        <!--AD banner area-->
        <div class="ad-banner">
            <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
        </div>

        <!--Recommend goods area-->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <!--swiper-->
                <swiperDefault></swiperDefault>
            </div>
        </div>
        <!--floor one area-->
        <floorComponent :floorData="this.floor1"></floorComponent>
         <!-- <floorComponent :floorData="this.floor1" :floorTitle="this.floorName.floor1"></floorComponent> -->
         <!--Hot Area-->
        <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
            </van-col>
        </van-row>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import swiperDefault from '@/components/swiper/swiperDefault'
import floorComponent from '@/components/component/floorComponent'
import goodsInfo from '../component/goodsInfoComponent'
import {toMoney} from '@/filter/moneyFilter.js'
export default {
  data () {
    return {
      hotGoods: [], // 热卖商品
      locationIcon: require('@/assets/images/icon-location.png'),
      category: [],
      adBanner: {},
      bannerPicArray: [],
      floor1: []
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  components: {
    swiperDefault, floorComponent, goodsInfo
  },
  created () {
    axios({
      url: url.getShoppingMallInfo,
      method: 'get'
    }).then(response => {
      this.category = response.data.data.category
      this.adBanner = response.data.data.advertesPicture
      this.bannerPicArray = response.data.data.slides
      this.recommendGoods = response.data.data.recommend
      this.floorName = response.data.data.floorName
      this.floor1 = response.data.data.floor1 // 楼层1数据
      this.hotGoods = response.data.data.hotGoods
    })
  }
}
</script>

<style scoped>
  .search-bar{
      height: 2.2rem;
      background-color: #e5017d;
      line-height:2.2rem;
  }
  .search-input{
      width:100%;
      height: 1.3rem;
      border-top:0px;
      border-left:0px;
      border-right:0px;
      border-bottom: 1px solid 1px !important ;
      background-color: #e5017d;
      color:#fff;
  }
  .location-icon{
      padding-top: .2rem;
      padding-left: .3rem;
  }
  .swiper-area{
        width:100%;
        clear:both;
  }
   .type-bar{
      background-color: #fff;
      margin:0 .3rem .3rem .3rem;
      border-radius: .3rem;
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
  }
  .type-bar div{
      padding: .3rem;
      font-size: 12px;
      text-align: center;
  }
   .recommend-area{
       background-color: #fff;
       margin-top: .3rem;
  }
  .recommend-title{
      border-bottom:1px solid #eee;
      font-size:14px;
      padding:.2rem;
      color:#e5017d;
  }
  .recommend-body{
       border-bottom: 1px solid #eee;
   }

  .recommend-item{
      width:99%;
      border-right: 1px solid #eee;
      font-size: 12px;
      text-align: center;
  }
  .floor-anomaly{
      display: flex;
      flex-direction:row;
      background-color: #fff;
      border-bottom:1px solid #ddd;
  }
  .floor-anomaly div{
     width:10rem;

     box-sizing: border-box;
     -webkit-box-sizing: border-box;
  }
  .floor-one{
      border-right:1px solid #ddd;

  }
  .floor-two{
      border-bottom:1px solid #ddd;
  }
  .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }
</style>
