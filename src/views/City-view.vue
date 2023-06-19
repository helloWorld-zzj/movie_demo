<template>
    <div class="outer">
        <div class="stickyHeader">
            <van-nav-bar :title="'当前城市-' + $store.state.cityName">
                <template #left>
                    <img src="@/../public/img/delete.svg" alt="del" @click="backToFilm">
                </template>
            </van-nav-bar>
            <van-search  placeholder="输入城市名或拼音"  class="searchLine"/>
        </div>

        <div class="hotCitiesBox">
            <div class="text">热门城市</div>
            <div class="cities">
                <div class="item" v-for="item in hotCities" :key="item.cityId" @click="cityClick(item.name)">{{ item.name }}</div>
            </div>
        </div>
        <div class="cityList">
            <van-index-bar :index-list="lettersList">
              <template v-for="item in cityList">
                <van-index-anchor :index="item.type" :key="item.type">{{ item.type }}</van-index-anchor>
                <van-cell v-for="data in item.list" :key="data" :title="data"  @click="cityClick(data)"/>
              </template>
            </van-index-bar>

        </div>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
  // setup () {
  //   const lettersList = []
  //   this.cityList.forEach(item => {
  //     lettersList.push(item.type)
  //   })
  //   return {
  //     lettersList
  //   }
  // },
  props: {
    cityid: {
      type: Number,
      default: 110100
    }
  },
  data () {
    return {
      cityname: '',
      hotCities: [],
      cityList: [
        // {type,list}
      ],
      lettersList: []
    }
  },
  methods: {
    backToFilm () {
      // console.log(1)
      this.$router.push({
        path: '/films/nowPlaying'
      })
    },
    // 变更城市
    cityClick (id) {
      this.$store.commit('changeCity', id)
      this.$router.push({
        path: '/cinemas'
      })
    }
  },

  mounted () {
    this.$store.dispatch('getCityData').then(() => {
      // 筛选出热门城市
      this.hotCities = this.$store.state.cityList.filter(item => {
        return item.isHot === 1
      })

      // 城市列表根据首字母分类
      const letters = []
      for (let i = 97; i <= 122; i++) {
        letters.push(String.fromCharCode(i))
      }
      // console.log(letters)
      letters.forEach(item => {
        const temList = []
        this.$store.state.cityList.forEach(city => {
          if (city.pinyin.slice(0, 1).toUpperCase() === item.toUpperCase()) {
            temList.push(city.name)
          }
        })
        // console.log(temList)
        if (temList.length > 0) {
          // console.log(1)
          this.cityList.push(
            {
              type: item.toUpperCase(),
              list: temList
            }
          )
        }
      })

      // 获取索引字母列表（去除掉空的）
      const lettersList = []
      this.cityList.forEach(item => {
        lettersList.push(item.type)
      })
      this.lettersList = lettersList
    }).catch(() => {
      console.log('出错了')
    })

    // 获取城市列表
    // bus.$on('citiesList', data => {
    //   // console.log(data)
    //   this.cityname = data.cities.find(item => item.cityId === this.cityid).name
    //   // console.log(this.cityname)
    //   // 筛选出热门城市
    //   this.hotCities = data.cities.filter(item => {
    //     return item.isHot === 1
    //   })

    //   // 城市列表根据首字母分类
    //   const letters = []
    //   for (let i = 97; i <= 122; i++) {
    //     letters.push(String.fromCharCode(i))
    //   }
    //   // console.log(letters)
    //   letters.forEach(item => {
    //     const temList = []
    //     data.cities.forEach(city => {
    //       if (city.pinyin.slice(0, 1).toUpperCase() === item.toUpperCase()) {
    //         temList.push(city.name)
    //       }
    //     })
    //     // console.log(temList)
    //     if (temList.length > 0) {
    //       // console.log(1)
    //       this.cityList.push(
    //         {
    //           type: item.toUpperCase(),
    //           list: temList
    //         }
    //       )
    //     }
    //   })

    //   // 获取索引字母列表（去除掉空的）
    //   const lettersList = []
    //   this.cityList.forEach(item => {
    //     lettersList.push(item.type)
    //   })
    //   this.lettersList = lettersList
    // })
  }
}

</script>

<style lang="scss" scoped>
$backgroundGray:#F4F4F4;
$fontGrayColor:#797D82;
.outer{
    overflow: hidden;
    .stickyHeader{
        position: fixed;

        width: 100%;
        height: 96px;
        // background-color: red;
        z-index: 10;
        img{
            height: 19px;
        }
        .searchLine{
            position: relative;
            top: -1px;
        }
    }
    .cityList{
      margin-top: 10px;
    }
    // 热门城市信息
    .hotCitiesBox{
        width: 100%;
        // height: 120px;
        // background-color: red;
        margin-top: 100px;

        .text{
            font-size: 13px;
            color: $fontGrayColor;
            padding-left: 15px;
        }
        .cities{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;

            flex-wrap: wrap;
            // width: 100%;
            .item{
                width: 28%;
                height: 25px;
                background-color: $backgroundGray;
                margin-top: 10px;
                margin-left: 4%;

                font-size: 14px;
                text-align: center;
                line-height: 25px;
            }
        }

    }
}
</style>
