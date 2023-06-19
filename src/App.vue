<template>
  <div>
    <!-- <h1>11</h1> -->
    <!-- 路由容器 -->
    <router-view></router-view>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      cities: []
    }
  },
  methods: {
  },
  mounted () {
    this.$store.dispatch('getCityData')
  }
}
</script>

<!-- 起手式 -->
<style lang="scss">
    *{
     margin: 0;
     padding: 0
   }

   ul{
    list-style: none;
   }
</style>
