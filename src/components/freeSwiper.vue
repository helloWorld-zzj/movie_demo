<template>
    <div class="outer">
        <div :class="'swiper ' + swiperName ">
            <div class="swiper-wrapper">
                <!-- 插槽接收轮播内容 -->
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

export default {
  props: {
    numInLine: {
      type: Number,
      default: 3
    },
    swiperName: {
      type: String,
      default: 'mySwiper'
    }
  },
  mounted () {
    const swiper = new Swiper(`.${this.swiperName}`, {
      slidesPerView: this.numInLine,
      freeMode: true,
      pagination: {
        clickable: true
      }
    })

    console.log(swiper)
  }
}
</script>
