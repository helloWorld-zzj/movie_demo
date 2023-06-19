<template>
    <div class="outerBox">
        <div class="movieCard">
            <!-- 声明式导航注册 -->
            <router-link to="/films/nowPlaying" custom v-slot="{navigate,isActive}">
            <div @click="navigate">
                <span :class="isActive?'activeCard':''">正在热映</span>
            </div>
            </router-link>

            <router-link to="/films/comingSoon" custom v-slot="{navigate,isActive}">
            <div @click="navigate" >
                <span :class="isActive?'activeCard':''">即将上映</span>
            </div>
            </router-link>
        </div>
        <div class="bottomLine">
            <router-link  to="/films/nowPlaying" custom v-slot="{navigate,isActive}">
                <div @click="navigate" :class="isActive?'active':''"></div>
            </router-link>
            <router-link  to="/films/comingSoon" custom v-slot="{navigate,isActive}">
                <div @click="navigate" :class="isActive?'active':''"></div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      leftFlag: true
    }
  },
  created () {
    if (this.$route.path === '/films/nowPlaying') {
      this.leftFlag = true
    } else {
      this.leftFlag = false
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  $active-color:#FF5F16;
  $line-color:#EDEDED;
  .activeCard{
    color: $active-color;
    // border-bottom: 2px solid $active-color;
  }
  .outerBox{
    border-bottom: 1px solid $line-color;
    position: fixed;
    z-index: 2;
  }
 .bottomLine{
    height: 2px;
    display: flex;
    flex-direction: row;

    justify-content: space-around;
    div{
        width: 64px;
        background-color: white;
        border-radius: 1px;

        height: 2px;
    }
    .active{
        background-color: #FF5F16;
    }
 }

 .movieCard{
    display: flex;
    flex-direction: row;
    // justify-content: space-evenly;
    align-items: center;

    width: 100%;
    height: 5rem;
    max-height: 50px;

    // border-bottom: 1px solid black;
    div{
        // background-color: aquamarine;
        flex-grow: 1;

        text-align: center;
         span{
            cursor: pointer;
            font-size: 16px;

            text-align: center;
            // display: flex;
            // align-items: center;

            // background-color: antiquewhite;
         }
    }
  }
</style>
