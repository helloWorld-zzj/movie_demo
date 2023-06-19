<template>
    <div class="outer" :class="isShowDes?'fitHeight':''">
        <div class="arrowLine" v-if="!isShowDes">
          <img src="@/../public/img/arrow.svg" alt="back" @click="backToCinema">
        </div>
        <div class="arrowLine" v-else>
          <img src="@/../public/img/delete.svg" alt="back" @click="backToDetail">
        </div>
        <div class="cinemaName">{{ cinemaInfo.name }}</div>
        <div v-show="isFixed" class="cinemaName sticky">{{ cinemaInfo.name }}</div>

        <!-- 标签描述的遮罩层 -->
        <div class="innerdes" :class="isShowDes?'activeDes':''">
          <!-- 描述列表 -->
          <ul>
            <li v-for="item in cinemaInfo.services" :key="item.name">
              <span class="name">{{ item.name }}</span>
              <span class="text">{{ item.description }}</span>
            </li>
          </ul>
        </div>

        <div class="desLine">
          <ul @click="showDescr">
            <li v-for="item in cinemaInfo.services" :key="item.name">{{ item.name }}</li>
            <li class="arrow"><img src="@/../public/img/arrow_orange.svg" alt="arrow"></li>
          </ul>
        </div>
        <div class="locateLine">
          <img src="@/../public/img/weizhi.svg" alt="locate">
          <span>{{ cinemaInfo.address }}</span>
          <img src="@/../public/img/dianhua.svg" alt="phone">
        </div>
        <div class="swiperLine">
          <div class="picBox">
            <poster-swiper swiperName="post" :key="filmsInfo.length" @getIndex="handleChange">
              <swiper-item v-for="item in filmsInfo" :key="item.filmId" class="imgBox">
                  <img :src="item.poster" alt="poster">
              </swiper-item>
            </poster-swiper>
          </div>
          <div class="select">
            <img src="@/../public/img/sanjiao.svg" alt="arrow">
          </div>
          <div class="bg-img" :style="{'background-image': 'url('+ filmsInfo[curFilmIndex].poster+ ')'}"></div>
        </div>

        <div class="filmNameLine" :class="filmIsFixed?'filmSticky':''">
          <div class="text">
            <div class="title">
              <span class="name">{{ filmsInfo[curFilmIndex].name }}</span>
              <div class="grade"><span>{{ filmsInfo[curFilmIndex].grade || 0.0}}</span>分</div>
            </div>
            <div class="describe">{{ filmsInfo[curFilmIndex].category }} {{ filmsInfo[curFilmIndex].runtime }}分钟 {{ filmsInfo[curFilmIndex].director }}</div>
          </div>
          <img src="@/../public/img/arrow.svg" alt="arrow" @click="jumpToFilm">
          <!-- 显示日期的一栏，通过电影列表和索引渲染 放在filmName中方便一起吸顶-->
          <div class="dateLine">
            <div class="boxItem" v-for="item in filmsInfo[curFilmIndex].showDate.slice(0, 3)" :key="item" @click="selectDate(item)" :class="curDate === item?'active':''">
              <!-- 加一个时间戳过滤器显示日期 -->
              <div class="text">{{ item|dateFilter }}</div>
              <div class="border"></div>
            </div>
          </div>
        </div>
        <!-- 占位盒子 -->
        <div v-show="filmIsFixed"></div>
        <!-- <div>11</div> -->
        <router-view></router-view>
    </div>
</template>

<script>
import axios from 'axios'
import posterSwiper from '@/components/3Dswiper.vue'
import swiperItem from '@/components/swiperItem.vue'
export default {
  components: {
    posterSwiper,
    swiperItem
  },
  filters: {
    dateFilter (value) {
      const date = new Date(value * 1000)
      const month = date.getMonth() + 1
      // console.log()
      return month + '月' + date.getDate() + '日'
    }
  },
  data () {
    return {
      cinemaid: -1,
      cinemaInfo: {},
      filmsInfo: [],
      isFixed: false,
      filmIsFixed: false,
      width: 1000,
      curFilmIndex: 0,
      rem: 10,
      curDate: 0,
      isShowDes: false
    }
  },
  methods: {
    // 展示标签的描述
    showDescr () {
      // console.log(this.cinemaInfo.services)
      this.isShowDes = true
    },
    // 返回 关闭标签描述
    backToDetail () {
      this.isShowDes = false
    },
    // 选择日期
    selectDate (data) {
      this.curDate = data
      // 加一个if条件避免路由重复
      if (this.$route.path !== `/cinemas/${this.cinemaid}/film/${this.filmsInfo[this.curFilmIndex].filmId}/${this.curDate}`) {
        this.$router.push({
          path: `/cinemas/${this.cinemaid}/film/${this.filmsInfo[this.curFilmIndex].filmId}/${this.curDate}`
        })
        this.$store.dispatch('getSchedule', this.$route.params)
      }
    },
    // 每次切换电影海报时回调的函数 handleChange
    handleChange (value) {
      if (this.curFilmIndex !== value) {
        this.curFilmIndex = value
        // console.log(this.filmsInfo[this.curFilmIndex].filmId)
        this.$router.push({
          path: `/cinemas/${this.cinemaid}/film/${this.filmsInfo[this.curFilmIndex].filmId}`
        })
      }

      // 如果直接url跳转则转到第一页
      if (this.$route.name !== 'FilmShow') {
        this.$router.push({
          path: `/cinemas/${this.cinemaid}/film/${this.filmsInfo[0].filmId}`
        })
      }
      // 匹配到每一页第一个日期
      this.curDate = this.filmsInfo[this.curFilmIndex].showDate[0]
      // 跳转到新路由
      this.$router.push({
        path: `/cinemas/${this.cinemaid}/film/${this.filmsInfo[this.curFilmIndex].filmId}/${this.curDate}`
      })
      this.$store.dispatch('getSchedule', this.$route.params)
    },
    handleWindowScroll () {
      if (window.pageYOffset > 44) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
      // 电影信息的固定
      if (window.pageYOffset > 160 + 16 * this.rem) {
        this.filmIsFixed = true
      } else {
        this.filmIsFixed = false
      }
    },
    backToCinema () {
      this.$router.push({
        path: '/cinemas'
      })
    },
    jumpToFilm () {
      this.$router.push({
        path: `/detail/${this.filmsInfo[this.curFilmIndex].filmId}`
      })
    }
  },
  created () {
    this.width = window.innerWidth || document.documentElement.clientWidth
    this.rem = document.documentElement.clientWidth / 375 * 10
  },
  mounted () {
    this.cinemaid = this.$route.params.cinemaid
    // 获取影院信息
    axios({
      url: `https://m.maizuo.com/gateway/?cinemaId=${this.cinemaid}&k=9892322`,
      headers: {
        'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.2.1","e":"16855398796191680688488449","bc":"${this.$store.state.cityId}"}`,
        'X-Host': 'mall.film-ticket.cinema.info'
      }
    }).then(res => {
      // 影院信息
      this.cinemaInfo = res.data.data.cinema
    }).catch(err => {
      console.log(err)
    })

    // 获取电影信息
    axios({
      url: `https://m.maizuo.com/gateway/?cinemaId=${this.cinemaid}&k=3073964`,
      headers: {
        'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.2.1","e":"16855398796191680688488449","bc":"${this.$store.state.cityId}"}`,
        'X-Host': 'mall.film-ticket.film.cinema-show-film'
      }
    }).then(res => {
      // 影院信息
      this.filmsInfo = res.data.data.films
    }).catch(err => {
      console.log(err)
    })

    // 加入滚动监听
    window.addEventListener('scroll', this.handleWindowScroll)
  }
}
</script>

<style lang="scss" scoped>
$fontOrangeColor:#FF5F16;
$orangeColor: #ffb232;
$blackColor: #191A1B;
$fontGrayColor: #797D82;

.fitHeight{
  height: 100vh;
  overflow: hidden;
}
.outer{
   // 动画效果
    animation-name: emerge;
    animation-duration: 1s;
    color: $blackColor;
    // height: 2000px;
    @keyframes emerge {
      0%{
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
    }
    @keyframes dropDown {
      0%{
        transform: translateY(-100%);
      }
      100%{
        transform: translateY(0);
      }
    }
    // 标签描述遮罩层
    .innerdes{
      height: calc(100vh - 88px);
      // background-color: #FF5F16;
      background-color: white;
      display: none;
      font-size: 12px;

      ul{
        // transition: transform 0.3s ease-out; /* 添加过渡效果 */
        margin-left: 10px;
        overflow: hidden;
        li{
          margin-top: 15px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-start;
          .name{
            color: $orangeColor;
            width: 60px;
            height: 16px;
            border: 1px solid $orangeColor;
            border-radius: 2px;

            text-align: center;
            line-height: 16px;
          }
          .text {
            margin-left: 15px;
            width: calc(100% - 100px);
            color: $fontGrayColor;
          }
        }
      }
    }
    .activeDes{
      display: block;
      // transform: translateY(0%); /* 向下展示 */
      // 动画效果
      animation-name: dropDown;
      animation-duration: 1s;
    }
    .arrowLine{
        width: 30px;
        height: 44px;
        // background-color: red;
        position: fixed;
        z-index: 160;
        top: 0px;
        img{
            margin-left: 5px;
            margin-top: 15px;
            width: 18px;
            transform: rotate(90deg);
            cursor: pointer;
        }
    }

    .cinemaName{
        margin-top: 44px;
        font-size: 18px;
        text-align: center;
        line-height: 44px;
    }

    .sticky{
        background-color: white;
        position: fixed;
        top: -44px;

        width: 100%;
        z-index: 70;
    }

    .desLine{
      height: 30px;
      font-size: 12px;
      color: $orangeColor;
      // line-height: 30px;
      ul{
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        li{
          border: 1px solid $orangeColor;
          padding: 0 5px;
          border-radius: 2px;
        }
        li + li{
          margin-left: 5px;
        }

        .arrow{
          border: none;
          img{
            width: 12px;
            transform: rotate(180deg);
            position: relative;
            top:2px;
          }
        }
      }
    }

    .locateLine{
      position: relative;
      z-index: 60;
      width: 90%;
      margin: 0 auto;
      height: 50px;

      display: flex;
      align-items: center;
      justify-content: space-evenly;
      span{
        display: block;
        height: 30px;
        width: 80%;
        // background-color: #ffb232;
        line-height: 30px;

        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      img{
        width: 24px;
      }
    }
    .swiperLine{
      height: 16rem;
      // background-color: rebeccapurple;
      width: 100%;
      overflow: hidden;
      // border: 1px solid yellow;
      // background-repeat: no-repeat;
      // background-size: cover;
      // background-position: center;
      .bg-img{
        height: 16rem;
        width: 100%;
        position: absolute;
        top: 168px;
        z-index: -20;
        clip-path: inset(0px 0px 0px 0px);
        filter: blur(0.5rem);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
      .picBox{
        overflow: hidden;
        // margin-top: 1rem;
        position: relative;
        top: 1rem;
        margin: 0 auto;
        width: 32rem;
        height: 14rem;
      //  background-color: #191A1B;
        .imgBox{
          width: 9rem;
          height: 13rem;
          overflow: hidden;

          display: flex;
          flex-direction: row;
          align-items: center;
          img{
            display: block;
            width: 100%;
          }
        }
        }
      .select{
        display: flex;
        flex-direction: row;
        justify-content: center;
        img{
          transform: rotate(180deg);
          height: 1rem;
          position: relative;
          top: 1.2rem;
        }
      }
    }
    .filmNameLine{
      height: 130px;
      // background-color: #ffb232;
      overflow: hidden;
      .text{
        margin: 0 auto;
        margin-top: 10px;
        width: 80%;
        height: 60px;
        // background-color: palegoldenrod;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        .title{
          display: flex;
          flex-direction: row;
          justify-content: center;
          .name{
            font-size: 16px;
            max-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
          }
          .grade{
            margin-left: 5px;
            color: $orangeColor;
            font-size: 12px;
            span{
              font-size: 16px;
              font-style: italic;
            }
          }
        }

        .describe{
          font-size: 14px;
          color: $fontGrayColor;
          width: 100%;
          text-align: center;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

      }

      img{
        width: 12px;
        float: right;
        transform: rotate(-90deg);

        position: relative;
        top: -34px;
        right: 5px;
      }
      .dateLine{
        height: 50px;
        display: flex;
        flex-direction: row;
        .boxItem{
          height: 50px;
          // background-color: #797D82;
          width: 100px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .text{
            overflow: hidden;
            margin: 15px auto;
            width: 74px;
            height: 30px;
            font-size: 14px;
            color: $blackColor;

            text-align: center;
            line-height: 20px;
          }
          .border{
            height: 0px;
            margin: 0 auto;
            width: 74px;
            border-radius: 1px;
          }
        }

        .active{
          .text{
            color: $fontOrangeColor;
          }
          .border{
            border: 1.3px solid $fontOrangeColor;
          }
        }
      }
    }
    .filmSticky{
      width: 100%;
      position: fixed;
      top: 44px;
      background-color: white;
    }
    // 占位盒子
    .filmNameLine + div {
      height: 130px;
    }

    // 显示日期
}
</style>
