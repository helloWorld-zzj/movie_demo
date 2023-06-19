<template>
    <div class="outer">
        <select-card></select-card>
        <div class="headerLine">
          <div class="loginLine">
            <div class="icon">
            <img src="@/../public/img/customicon.png" alt="icon">
          </div>
            <div class="text">立即登录</div>
          </div>
        </div>
        <div class="moneyLine">
          <div class="leftBox">
            <div class="num">0张</div>
            <div class="text">卖座券</div>
          </div>
          <div class="rightBox">
            <div class="num">
              <img src="@/../public/img/rmb.svg" alt="rmb">0
            </div>
            <div class="text">余额</div>
          </div>
        </div>
        <div class="funcLine">
          <div class="order">
            <img src="@/../public/img/order.png" alt="order" class="icon">
            <span>电影订单</span>
            <img src="@/../public/img/arrow-gray.svg" alt="arrow" class="arrow">
          </div>
          <div class="packet">
            <img src="@/../public/img/packet.png" alt="packet" class="icon">
            <span>组合红包</span>
            <img src="@/../public/img/arrow-gray.svg" alt="arrow" class="arrow">
          </div>
          <div class="helper">
            <img src="@/../public/img/help.png" alt="helper" class="icon">
            <span>帮助与客服</span>
            <img src="@/../public/img/arrow-gray.svg" alt="arrow" class="arrow">
          </div>
          <div class="setting">
            <img src="@/../public/img/setting.png" alt="setting" class="icon">
            <span>设置</span>
            <img src="@/../public/img/arrow-gray.svg" alt="arrow" class="arrow">
          </div>
        </div>
    </div>
</template>

<script>
import selectCard from '@/components/SelectCard.vue'
export default {
  components: {
    selectCard
  }
}

</script>

<style lang="scss" scoped>
  $fontGrayColor:#797D82;
  $backgroundColor:#F4F4F4;
  $lineGrayColor:#EFEFEF;
  .outer{
    margin-bottom: 70px;
    // 顶部用户头像区
    background-color: $backgroundColor;
    min-height: calc(100vh - 70px);
    .headerLine{
        width: 100%;
        height: 170px;

        background-image: url(https://assets.maizuo.com/h5/v5/public/app/img/bg.a5bdd690.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;

        overflow: hidden;
        .loginLine{
          // background-color: antiquewhite;
          height: 150px;
          margin-top: 20px;

          display: flex;
          flex-direction: row;

          align-items: center;
          // 头像区
          .icon{
            margin-left: 30px;
            width: 63px;
            height: 63px;
            // background-color: red;

            border-radius: 50%;
            border: 2px solid white;
            overflow: hidden;
            img{
              width: 100%;
            }
          }

          // 文字区
          .text{
            margin-left: 20px;
            font-size: 16px;
            height: 30px;
            line-height: 30px;

            color: white;

          }
        }
    }
    .moneyLine{
          background-color: white;
          height: 80px;
          // background-color: aqua;

          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
          .leftBox,.rightBox{
            // background-color: red;
            width: 40%;
            height: 60px;

            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
          }
          .text{
            font-size: 13px;
            color: $fontGrayColor;
            text-align: center;
          }
          .num{
            font-size: 18px;
            text-align: center;
            height: 22px;

            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            line-height: 22px;
            img{
              height: 22px;
              position: relative;
              top: -2px;
            }
          }
    }

    .funcLine{
      // background-color: white;
      margin-top: 10px;
      background-color: white;
      // height: 200px;

      div{

        height: 50px;
        font-size: 16px;

        margin: 0 10px;
        display: flex;
        flex-direction: row;
        align-items: center;

        border-bottom: 1px solid $lineGrayColor;
        .icon{
          width: 20px;
        }
        span{
          flex-grow: 1;
          padding: 0 10px;
        }
        .arrow{
          width: 16px;
          transform: rotate(90deg);
        }
      }
    }
  }
</style>
