<template>
    <div>
        <ul>
      <!-- <li v-for="item in navCardList" :key="item.name"> -->
        <!-- <a :href="item.path">{{ item.name }}</a> -->
        <!-- <router-link :to="item.path">{{ item.name }}</router-link> 本质上还是a标签-->

        <!-- 注册了一个navigate事件，当navigate触发，对应的isActive会变成true
          可以根据isActive来动态定义类匹配样式
        -->
        <!-- <router-link :to="item.path" custom v-slot="{navigate,isActive}">
          <div @click="navigate" :class="isActive?'activeCard':''">
            <img src="../public/img/center.png" :alt="item.img">
            <span>{{ item.name}}</span></div>
        </router-link>
      </li> -->

      <li>
        <router-link to="/films" custom v-slot="{navigate,isActive}">
          <div @click="navigate" :class="isActive?'activeCard':''">
            <img v-if="isActive" src="../../public/img/movie_active.png" alt="movie">
            <img v-else src="../../public/img/movie.png" alt="center">
            <span>电影</span></div>
        </router-link>
      </li>

      <li>
        <router-link to="/cinemas" custom v-slot="{navigate,isActive}">
          <div @click="navigate" :class="isActive?'activeCard':''">
            <img v-if="isActive" src="../../public/img/cinema_active.png" alt="cinema">
            <img v-else src="../../public/img/cinema.png" alt="center">
            <span>影院</span></div>
        </router-link>
      </li>

      <li>
        <router-link to="/center" custom v-slot="{navigate,isActive}">
          <div @click="navigate" :class="isActive?'activeCard':''">
            <img v-if="isActive" src="../../public/img/center_active.png" alt="center">
            <img v-else src="../../public/img/center.png" alt="center">

            <span>我的</span></div>
        </router-link>
      </li>
    </ul>
    </div>
</template>

<style lang="scss" scoped>
  $active-color:#FF5F16;
  ul{
    position: fixed;
    bottom: 0;
    z-index: 2;
    // background-color: antiquewhite;

    width: 100%;
    height: 6rem;
    max-height: 70px;

    display: flex;
    flex-direction: row;

    font-size: 2rem;
    .activeCard{
      color: $active-color;
    }
    li{
      cursor: pointer;
      flex-grow: 1;

      // 选项卡区域
      div{
         display: flex;
         flex-direction: column;
         justify-content: space-evenly;
         align-items: center;

         height: 6rem;
         max-height: 70px;

         background-color: white;

        //  图片大小设置
        img{
          height: 3rem;
          max-height: 40px;
        }
        span{
          font-size: 14px;
          // max-font-size: 20px;
          // font-weight: 700;
        }
      }
    }
  }
</style>
