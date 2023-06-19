<template>
    <div class="outer">
        <h2>即将上映</h2>
      <ul>
        <!-- 编程式导航，通过点击事件跳转 -->
        <li v-for="item in movieIdList" :key="item.stid" @click="jumpToDetail(item.movieId)">{{ item.movieId }}</li>
      </ul>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      movieIdList: []
    }
  },

  mounted () {
    axios.get('/myajax/api/mmdb/movie/v3/list/hot.json?ct=%E5%8D%97%E6%98%8C&ci=83&channelId=4').then((res) => {
      // 获取电影名单
      this.movieIdList = res.data.data.stids
      console.log(this.movieIdList)
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    jumpToDetail (id) {
      // 编程式导航
      // location.href = '#/detail'
      // this.$router.push(`/detail/${id}`)
      // this.$router 等价于 main.js中的router

      // 根据名称push 传入一个对象
      this.$router.push({
        name: 'FilmDetail',
        params: {
          filmid: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .outer{
    padding-top: 50px;
  }
  ul>li{
    cursor: pointer;
  }
</style>
