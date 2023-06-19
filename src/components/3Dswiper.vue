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
    // numInLine: {
    //   type: Number,
    //   default: 3
    // },
    swiperName: {
      type: String,
      default: 'mySwiper'
    }
  },
  mounted () {
    const that = this
    const swiper = new Swiper(`.${this.swiperName}`, {
      on: {
        transitionEnd: function () { // 监听每次轮播切换结束事件
          const index = this.activeIndex // 获取当前显示图片的索引
          // console.log('当前图片的索引是：' + index)
          that.$emit('getIndex', index)
        }
      },
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }
    })

    console.log(swiper)
  }
}
</script>
