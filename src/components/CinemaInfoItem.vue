<template>
    <div class="outer">
        <div class="leftBox">
            <div class="name">{{ cinema.name }}</div>
            <div class="location">{{ cinema.address }}</div>
        </div>
        <div class="rightBox">
            <div class="price">
                <img src="@/../public/img/rmb-orange.svg" alt="rmb">
                {{ cinema.lowPrice / 100 }}起
            </div>
            <div class="distance">距离未知</div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    cinema: {
      type: Object,
      defalut: {}
    }
  }
}
</script>

<style lang="scss" scoped>
$orangeColor:#ff5f16;
.outer{
    overflow: hidden;
    $lineGrayColor:#EDEDED;
    $fontGrayColor:#797D82;

    height: 76px;
    // background-color: antiquewhite;
    border: 1px solid $lineGrayColor;

    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0 15px;
    // 右边区域
    .rightBox{
        // 固定宽度
        width: 80px;
        min-width: 80px;
        height: 60px;
        // background-color: red;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        .price{
            color: $orangeColor;
           font-size: 16px;
            img{
                width: 16px;

                position: relative;
                top: 2px;
                left: 4px;
            }
        }
        .distance{
                font-size: 12px;
                color: $fontGrayColor;
            }
    }

    .leftBox{
        overflow: hidden;
        white-space: nowrap;

        flex-grow: 1;
        height: 60px;
        // background-color: aqua;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .name{
            font-size: 16px;
        }
        .location{
            width: 100%;
            font-size: 12px;
            color: $fontGrayColor;

        }

        .location,.name{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

}
</style>
