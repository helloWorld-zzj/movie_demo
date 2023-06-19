<template>
    <div>
        <div class="searchLine">
            <div class="inputLine">
                <img src="@/../public/img/31sousuo.svg" alt="search">
                <input type="text" name="search" placeholder="输入影城名称" v-model="mes">
                <img src="@/../public/img/quxiao.svg" alt="del" v-if="mes" @click="delMes">
            </div>
            <span @click="backToCinemas">取消</span>
            <!-- <h1>{{ mes }}</h1> -->
        </div>

        <!-- 为搜索时显示离你最近 -->
        <div class="nearest" :class="mes?'':'active'">
            <div class="text">离你最近</div>
            <div class="cinemas">
                <div class="box" v-for="item in this.$store.state.nearestCinemasList.slice(0,5)" :key="item.name" @click="jumpToCinema(item.cinemaId)">{{ item.name }}</div>
            </div>
        </div>
        <!-- 搜索时显示搜索结果 -->
        <div class="result">
            <div class="cinemasListBox">
                <ul>
                    <li v-for="item in searchResult" :key="item.cinemaId" @click="jumpToCinema(item.cinemaId)">
                        <cinema-item :cinema="item"></cinema-item>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import cinemaItem from '@/components/CinemaInfoItem.vue'
import BetterScroll from 'better-scroll'
export default {
  components: {
    cinemaItem
  },
  data () {
    return {
      mes: ''
    }
  },
  computed: {
    searchResult () {
      console.log(this.$store.state.cinemaList)
      const list = this.$store.state.cinemaList.filter(item => {
        return item.name.includes(this.mes) || item.address.includes(this.mes)
      })
      return list
    }
  },
  methods: {
    backToCinemas () {
      this.$router.push({
        path: '/cinemas'
      })
    },
    delMes () {
      this.mes = ''
    },
    jumpToCinema (id) {
      this.$router.push({
        name: 'CinemaDetail',
        params: {
          cinemaid: id
        }
      })
    }
  },
  created () {
    // console.log(1)
    this.$store.dispatch('getNearest')
    this.$store.dispatch('getCinemaData').then(() => {
    //   // 获取影院数据
    //   this.areaList = getArea(this.$store.state.cinemaList)

      const bs = new BetterScroll('.cinemasListBox', {
        scrollbar: {
          fade: true
        },
        mouseWheel: true,
        click: true
      })
      console.log(bs)
    })
  }
}
</script>

<style lang="scss" scoped>
$fontOrangeColor:#FF5F16;
$orangeColor: #ffb232;
$blackColor: #191A1B;
$fontGrayColor: #BDC0C5;
$backGrayColor: #f4f4f4;
$lineGrayColor:#EDEDED;

div{
    color: $blackColor;
    .searchLine{
        border-bottom: 1px solid $lineGrayColor;
        overflow: hidden;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .inputLine{
            width: calc(100% - 80px);
            height: 30px;
            margin: 0 15px;
            background-color: $backGrayColor;

            display: flex;
            flex-direction: row;
            align-content: center;

            border-radius: 2px;
            img{
                width: 20px;
                margin: 0 10px;
            }
            input{
                width: calc(100% - 80px);
                font-size: 14px;
                background-color: $backGrayColor;
                border: none;
                height: 30px;
                color: $blackColor;

            }
            input::placeholder {
                font-size: 12px;
                color: $fontGrayColor;
            }
        }
        span{
            width: 50px;
            height: 50px;
            font-size: 14px;

            line-height: 50px;
            text-align: center;

            position: relative;
            left: -10px;
        }
    }

    .nearest{
        width: 100%;
        display: none;
        position: fixed;
        background-color: white;
        z-index: 600;
        height: calc(100vh - 60px);
        .text{
            width: 100px;
            font-size: 12px;
            color: $fontGrayColor;
            margin: 10px;
        }

        .cinemas{
            padding-right: 10px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .box{
                margin-top: 10px;
                margin-left: 10px;
                height: 30px;
                font-size: 12px;
                background-color: $backGrayColor;
                line-height: 30px;
                text-align: center;

                padding: 0 10px;
                border-radius: 2px;
            }
        }
    }
    .cinemasListBox{
      height: calc(100vh - 59px);
      overflow: hidden;
      position: relative;
    }
    .active{
        display: block;
    }
}
</style>
