<template>
    <div class="outer">
        <select-card></select-card>

        <!-- 地区选择 -->
        <area-card :area="areaList" @child-click="getCurArea"></area-card>
        <!-- 影院信息 -->
        <div class="cinemasListBox">
          <ul>
            <li v-for="item in curCinemas" :key="item.cinemaId" @click="cinemaClick(item.cinemaId)">
              <cinema-item :cinema="item"></cinema-item>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
import selectCard from '@/components/SelectCard.vue'
import cinemaItem from '@/components/CinemaInfoItem.vue'
import areaCard from '@/components/areaSelectCard.vue'
// import axios from 'axios'
import BetterScroll from 'better-scroll'
export default {
  components: {
    selectCard,
    cinemaItem,
    areaCard
  },
  data () {
    return {
      areaList: [],
      curArea: '全城'
    }
  },
  // 筛选地区影院（计算属性）
  computed: {
    curCinemas () {
      if (this.curArea === '全城') {
        return this.$store.state.cinemaList
      } else {
        const cinemas = this.$store.state.cinemaList.filter(item => {
          return item.districtName === this.curArea
        })
        return cinemas
      }
    }
  },
  methods: {
    getCurArea (data) {
      this.curArea = data
      // console.log(this.curArea)
    },
    cinemaClick (id) {
      this.$router.push({
        name: 'CinemaDetail',
        params: {
          cinemaid: id
        }
      })
      // console.log(id)
    }
  },
  mounted () {
    this.$store.dispatch('getCinemaData').then(() => {
      // 获取影院数据
      this.areaList = getArea(this.$store.state.cinemaList)

      const bs = new BetterScroll('.cinemasListBox', {
        scrollbar: {
          fade: true
        },
        mouseWheel: true,
        click: true
      })
      console.log(bs)
    }).catch(() => {
      console.log('something wrong')
    })

    // axios({
    //   url: `https://m.maizuo.com/gateway?cityId=${this.$store.state.cityId}&ticketF`,
    //   headers: {
    //     'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.2.1","e":"16855398796191680688488449","bc":${this.$store.state.cityId}}`,
    //     'X-Host': 'mall.film-ticket.cinema.list'
    //   }
    // }).then(res => {
    //   this.$store.state.cinemaList = res.data.data.cinemas
    //   this.areaList = getArea(this.$store.state.cinemaList)
    //   // console.log(this.areaList)

    //   // better-scroll初始化
    //   this.$nextTick(() => {
    //
    // }).catch(err => {
    //   console.log(err)
    // })
  }
}

function getArea (List) {
  const areaList = []
  List.forEach(item => {
    if (!areaList.includes(item.districtName)) {
      areaList.push(item.districtName)
    }
  })
  return areaList
}
</script>

<style lang="scss" scoped>
  .outer{
    overflow: hidden;
    .cinemasListBox{
      margin-top: 96px;
      margin-bottom: 70px;

      height: calc(100vh - 166px);
      overflow: hidden;
      position: relative;

      li{
        cursor: pointer;
      }
    }
  }
</style>
