<template>
    <div class="outer" :class="showPoster?'fix':''">
      <!-- 返回按钮 -->
      <img src="data:image/png;base64,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" alt="back" class="backBtn" @click="backTo">
      <!-- 吸顶栏 -->
      <div v-show="isShow" class="stickyLine">{{ filmitem.film.name }}</div>
      <!-- 获取海报 -->
        <div class="posterArea" :style="{ 'background-image': 'url('+ filmitem.film.poster +')' }"></div>
        <div class="infoArea">
          <div class="title">
            <span>{{ filmitem.film.name }}</span>
            <span class="dimension">{{ filmitem.film.filmType.name }}</span>
            <div class="grade">
              <span>{{ filmitem.film.grade || '0.0'}}</span> 分
            </div>
          </div>
          <!-- 添加空格 -->
          <div>{{ filmitem.film.category | categoryFilter}}</div>
          <!-- 利用过滤器 dataFilter 获取年月日 -->
          <div>{{ filmitem.film.premiereAt | dataFilter}} 上映</div>
          <div>{{ filmitem.film.nation }} | {{ filmitem.film.runtime }}分钟</div>
          <div :class="isMore?'synoActive':'syno'">{{ filmitem.film.synopsis }}</div>
          <!-- 下拉按钮 -->
          <div class="arrowBtn" @click="changeMore">
            <img :class="isMore?'arrUp':'arrDown'" src="@/../public/img/arrow.svg" alt="arrow">
          </div>
        </div>

        <!-- 演员 -->
        <div class="actorArea">
          <div class="actorText">演职人员</div>
          <pic-swiper :numInLine="viewportWidth / 100" class="whiteBack" swiperName="actor">
            <swiper-item v-for="item in filmitem.film.actors" :key="item.name">
              <div class="actorInfoBox">
                <div class="imgBox">
                  <img :src="item.avatarAddress" alt="actor">
                </div>
                <div class="name">{{ item.name }}</div>
                <div class="role">{{ item.role }}</div>
              </div>
            </swiper-item>
          </pic-swiper>

        </div>
        <div class="photoArea">
          <div class="photoText">剧照</div>
          <pic-swiper swiperName="photo" :numInLine="viewportWidth / 180"  class="whiteBack" >
            <swiper-item v-for="(item, index) in filmitem.film.photos" :key="item">
              <div class="photoBox">
                <img :src="item" alt="photo" @click="showPic(index)">
              </div>
            </swiper-item>
          </pic-swiper>
        </div>
        <pic-show v-if="showPoster" @childevent="closePic" :index="curPic" :photoList="filmitem.film.photos">
        </pic-show>
        <div class="buyTicketLine">选座购票
        </div>
    </div>
</template>

<script>
import picSwiper from '@/components/freeSwiper.vue'
import swiperItem from '@/components/swiperItem.vue'
import picShow from '@/components/PicShow.vue'
import axios from 'axios'
export default {
  data () {
    return {
      filmId: -1,
      filmitem: {},
      viewportWidth: 0,
      isShow: false,
      isMore: false,
      showPoster: false,
      curPic: 0
    }
  },
  methods: {
    backTo () {
      if (window.history.length <= 1) {
        this.$router.push({
          path: '/films'
        })
      } else {
        this.$router.go(-1)
      }
    },
    showPic (index) {
      this.showPoster = true
      this.curPic = index
      console.log(this.curPic)
    },
    closePic () {
      this.showPoster = false
    },
    // 下拉事件
    changeMore () {
      this.isMore = !this.isMore
    },

    // 窗口滚动监听
    handleWindowScroll () {
      if (window.pageYOffset > 100) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  // 获取轮播组件
  components: {
    picSwiper,
    swiperItem,
    picShow
  },

  // 过滤器
  filters: {
    dataFilter (value) {
      // 利用时间戳获取年月日
      const data = new Date(value * 1000)
      // console.log(data.getFullYear(), data.getMonth() + 1, data.getDate())
      const month = data.getMonth() + 1
      return data.getFullYear() + '-' + month + '-' + data.getDate()
    },

    categoryFilter (value) {
      return value.split('|').join(' | ')
    }
  },
  mounted () {
    // 添加屏幕滚动监视器
    window.addEventListener('scroll', this.handleWindowScroll)
  },
  created () {
    // 获取视口宽度
    this.viewportWidth = window.innerWidth || document.documentElement.clientWidth
    // console.log(this.viewportWidth)

    this.filmId = this.$route.params.filmid
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.filmId}&k=74975`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16855398796191680688488449","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      this.filmitem = res.data.data
      console.log(this.filmitem)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
    $fontGrayColor:#797D82;
    $orangeColor:#ff5f16;
    $backgroundColor:#F4F4F4;

    .outer{
      background-color: $backgroundColor;
      overflow: hidden;
      .infoArea,.actorArea,.photoArea,.whiteBack{
        background-color: white;
      }
      // 返回按钮
      .backBtn{
        position: fixed;
        width: 30px;
        height: 30px;

        top: 5px;
        left: 5px;
        z-index: 10;
      }
      // 底部购票按钮
      .buyTicketLine{
        background-color: #ff5f16;
        width: 100%;
        height: 50px;

        color: white;

        // 固定在底部
        position: fixed;
        bottom: 0;

        // 居中
        text-align: center;
        line-height: 50px;
        font-size: 16px;

        // 层级最高
        z-index: 2
      }
      // 吸顶栏
      .stickyLine{
        position: fixed;
        top: 0;
        left: 0;
        height: 44px;
        background-color: white;
        width: 100%;

        font-size: 17px;
        text-align: center;
        line-height: 44px;

        z-index: 3;
      }

      // 海报区域
      .posterArea{
        // background-color: aqua;
        height: 55vw;
        // background-image: url('https://pic.maizuo.com/usr/movie/119576cdfadde4fc917523c95b2b1800.jpg')
        background-size: 100% auto;
        background-position: center;

        background-repeat: no-repeat;
      }

      // 信息区域
      .infoArea{
        // background-color: aquamarine;
        // height: 190px;
        font-size: 13px;

        padding: 15px;
        color: $fontGrayColor;

        div{
          margin-top: 5px;
        }
        .title{
          font-size: 18px;
          color: black;

          display: flex;
          flex-direction: row;
          align-items: baseline;

          .dimension{

            font-size: 10px;
            margin-left: 5px;

            height: 14px;
            line-height: 14px;
            padding: 0 2px;
            background-color: #d2d6dc;
            border-radius: 2px;
            color: #fff;
          }

          // 评分
            .grade{
              margin-left: auto;
              font-size: 10px;
              color: $orangeColor;
              span{
                font-style: italic;
                font-size: 18px;
              }

            }
        }
        .syno{
          margin-top: 15px;
          height: 36px;
          overflow: hidden;
        }

        .synoActive{
          margin-top: 15px;
        }

        // 下拉按钮区域
        .arrowBtn{
          text-align: center;
          width: 60px;
          height: 20px;

          margin: 0 auto;
          .arrUp{
            height: 6px;
            transform: scaleY(-1);
          }
          .arrDown{
            height: 6px;
          }
        }
      }
      // 演员区域
      .actorArea{
        overflow: hidden;
        margin-top: 10px;
        padding: 15px;
        // background-color: red;
        height: 195px;
        .actorText{
          font-size: 18px;
        }
        .actorInfoBox{
          // margin-right: 10px;
          height: 170px;
          width: 85px;
          // color: white;

          // background-color: black;
          overflow: hidden;
          .name{
            text-align: center;
            font-size: 12px;
            height: 24px;
            line-height: 24px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .role{
            text-align: center;
            color: $fontGrayColor;
            font-size: 10px;
          }
          .imgBox{
            margin-top: 15px;
            height: 100px;
            // background-color: #ff5f16;

            overflow: hidden;
            img{
              width: 100%;
              margin-top: -15px;
            }
          }
        }

      }
      .photoArea{
        overflow: hidden;
        margin-top: 10px;
        // background-color: cadetblue;
        height: 180px;
        padding: 15px;
        .photoText{
          font-size: 18px;
          margin-bottom: 10px;
        }
        .photoBox{
          background-color: white;
          width: 150px;
          height: 100px;

          display: flex;
          flex-direction: column;
          justify-content: center;

          overflow: hidden;
          img{
            width: 100%;
          }
        }
      }

      .innerPhoto{
        width: 100%;
      }
    }

    .fix{
      height: 100vh;
    }
</style>
