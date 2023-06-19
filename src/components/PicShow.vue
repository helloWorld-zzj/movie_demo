<template>
    <div class="overlay">
        <div class="backLine">
            <img class="delimg" src="@/../public/img/quxiao_white.svg" alt="back" @click="quit">
            <span>{{ index + 1}}/5</span>

            <div class="swiper mySwiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in photoList" :key="item">
                  <div class="imgBox">
                    <img :src="item" alt="photo">
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  mounted () {
    const swiper = new Swiper('.mySwiper', {
    })
    console.log(swiper)
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    photoList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    quit () {
      this.$emit('childevent')
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay{
    touch-action: none;
    width: 100vw;
    height: 100vh;
    background-color: black;
    position: absolute;
    top: 0;
    z-index: 1000;

    overflow: hidden;
    .backLine{
        width: 100%;
        margin-top: 15px;
        color: white;
        font-size: 18px;

        text-align: center;
        .delimg{
            width: 22px;
            position: fixed;
            left: 15px;
        }
        span{
            display: block;
        }
    }

    .mySwiper{
      .swiper-slide{
        .imgBox{
          width: 100%;
          // background-color: antiquewhite;
          overflow: hidden;
          font-size: 0;
          img{
            width: 100%;
          }
        }
      }
    }
}
</style>
