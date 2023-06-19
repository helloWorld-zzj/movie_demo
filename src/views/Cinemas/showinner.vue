<template>
    <div class="outer">
        <!-- <h1>{{ getScheduleInfo }}</h1> -->
        <div class="item" v-for="item in getScheduleInfo.schedules" :key="item.showAt">
        <div class="showTime">
            <div class="start">{{ item.showAt | getDate }}</div>
            <div class="end">{{ item.endAt | getDate }}散场</div>
        </div>
        <div class="room">
            <div class="cate">{{ item.filmLanguage }} | {{ item.imagery }}</div>
            <div class="num">{{ item.hallName }}</div>
        </div>
        <div class="price">
            <img src="@/../public/img/rmb-orange.svg" alt="rmb">
            <span>{{ item.minSalePrice / 100}}</span>起
        </div>
        <div class="buy">购票</div>
        </div>
    </div>
</template>

<script>
export default {
  filters: {
    // 时间戳过滤器
    getDate (value) {
      const date = new Date(value * 1000)
      const hours = date.getHours() < 10 ? '0' + date.getHours() : '' + date.getHours()
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes()
      //   console.log(hours + minutes)
      return hours + ':' + minutes
    }
  },
  computed: {
    // 获取相匹配的信息
    getScheduleInfo () {
      const scheduleList = this.$store.state.scheduleList
      const result = scheduleList.find(obj => obj.cinemaid === this.$route.params.cinemaid && obj.filmid === this.$route.params.filmid && obj.date === this.$route.params.date)
      //   console.log(result)
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
$gradeColor:#ffb232;
$fontGrayColor:#797D82;
$orangeColor:#ff5f16;
$lineGrayColor:#EDEDED;
$blackColor:#191A1B;
.item{
    height: 74px;
    border-bottom: 1px solid $lineGrayColor;
    display: flex;
    flex-direction: row;
    align-items: center;
    div{
        height: 50px;
    }
    .showTime{
        width: 84px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        div{
            height: 25px;
            margin-left: 10px;
            line-height: 25px;
        }
        .start{
            font-size: 16px;
            color: $blackColor;
        }
        .end{
            font-size: 14px;
            color: $fontGrayColor;
        }
    }
    .room{
        width: calc(100% - 225px);
        // background-color: #797D82;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        div{
            height: 25px;
            line-height: 25px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .cate{
            font-size: 16px;
            color: $blackColor;
        }
        .num{
            font-size: 14px;
            color: $fontGrayColor;
        }
    }
    .price{
        font-size: 12px;
        width: 76px;
        color: $orangeColor;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        img{
            height: 16px;
            position: relative;
            top: -1px;
            z-index: -1;
        }
        span{
            display: block;
            font-size: 16px;
        }
    }
    .buy{
        margin-left: 5px;
        width: 50px;
        height: 25px;
        font-size: 12px;
        text-align: center;
        line-height: 25px;
        color: $orangeColor;
        border: 1px solid $orangeColor;
        border-radius: 2px;
    }
}
</style>
