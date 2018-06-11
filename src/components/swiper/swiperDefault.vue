<template>
  <div>
   <swiper class="swiper" :options="swiperOption">
        <swiper-slide class="text">
            <div class="centent">
               一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章一大堆文章.........
            </div>
        </swiper-slide>
      </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      slide: [1, 2, 3, 4, 5, 6],
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        mousewheel: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  components: {swiper, swiperSlide}
}
</script>

<style scoped>
 .swiper{
      height: 300px;
      overflow: hidden;
  }
  .text{
      font-size: 18px !important;
      text-align: left;
      padding:30px;
      height: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;

  }
</style>
