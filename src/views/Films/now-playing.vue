<template>
    <div class="outer">
         <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
             <van-cell v-for="item in movieInfoList" :key="item.filmId">
                <film-info-item :filminfo="item"></film-info-item>
             </van-cell>
         </van-list>
    </div>

</template>

<script>
import axios from 'axios'
import filmInfoItem from '@/components/FilmInfoItem.vue'
export default {
  components: {
    filmInfoItem
  },
  data () {
    return {
      total: -1,
      movieInfoList: [],
      loading: false,
      finished: false,
      count: 1,
      timeId: null
    }
  },

  methods: {
    onLoad () {
      // 节流处理，设定1s
      if (this.timeId !== null) {
        return
      }
      this.timeId = setTimeout(() => {
        // 请求数据
        if (this.movieInfoList.length === this.total) {
          this.finished = true
          return
        }
        console.log('到底了')
        this.count++

        axios({
          url: `https://m.maizuo.com/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.count}&pageSize=10&type=1&k=5463465`,
          headers: {
            'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.2.1","e":"16855398796191680688488449","bc":${this.$store.state.cityId}}`,
            'X-Host': 'mall.film-ticket.film.list'
          }
        }).then(res => {
          this.movieInfoList = [...this.movieInfoList, ...res.data.data.films]
        }).catch(err => {
          console.log(err)
        })

        this.timeId = null
        this.loading = false
      }, 1000)

      // console.log(this.movieInfoList.length)
      // console.log(this.total)
    }
  },
  created () {
    axios({
      url: `https://m.maizuo.com/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=5463465`,
      headers: {
        'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.2.1","e":"16855398796191680688488449","bc":"${this.$store.state.cityId}"}`,
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res.data)
      this.movieInfoList = res.data.data.films
      this.total = res.data.data.total
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
  .outer{
    padding-top: 50px;
    padding-bottom: 70px;
  }
  .van-list{
    .van-cell{
      padding: 0;
    }
  }
</style>
